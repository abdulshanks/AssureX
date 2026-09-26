import secrets
from pathlib import Path
from receipt_ocr import read_receipt, suggest_fields
import pytesseract
from policies import POLICIES, get_policy
import math

from flask import Flask, jsonify, request, session, send_file, send_from_directory
from card_service import make_card
from werkzeug.security import check_password_hash

from claim_logic import analyze_claim
from database import (
    create_tables,
    find_member,
    get_claim,
    invoice_was_used,
    list_claims,
    save_gtm_result,
    save_claim,
    save_review,
)


app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024
# Keep the session-signing key stable when Flask restarts.
# Do not share this file or commit it to a public repository.
KEY_FILE = Path(__file__).resolve().parent / ".secret_key"
if not KEY_FILE.exists():
    KEY_FILE.write_text(secrets.token_hex(32), encoding="utf-8")

app.secret_key = KEY_FILE.read_text(encoding="utf-8")
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

create_tables()


@app.get("/")
def home():
    return jsonify({
        "app": "AssureX backend",
        "status": "running",
    })


@app.post("/api/claims/analyze")
def analyze():
    """Analyze and SAVE a new claim."""
    claim = request.get_json(silent=True)

    if not isinstance(claim, dict):
        return jsonify({"error": "Send a JSON claim object."}), 400

    try:
        policy_id = claim.get("policy_id")
        policy = get_policy(policy_id)

        # Copy the input before adding the server's chosen duration.
        claim = claim.copy()
        claim["warranty_months"] = policy["warranty_months"]
        duplicate = int(
            invoice_was_used(claim.get("invoice_number", ""))
        )
        
        print("DUPLICATE CHECK:", repr(claim.get("invoice_number")), duplicate)

        result = analyze_claim(
            claim,
            duplicate_indicator=duplicate,
        )
        
        result["policy_id"] = policy_id
        result["policy_name"] = policy["name"]

        claim_id = save_claim(claim, result)
        result["claim_id"] = claim_id

        return jsonify(result), 201

    except (KeyError, ValueError, TypeError) as error:
        return jsonify({
            "error": f"Invalid claim details: {error}"
        }), 400


@app.post("/api/auth/login")
def login():
    """Check a member's username and password."""
    details = request.get_json(silent=True) or {}

    if not isinstance(details, dict):
        return jsonify({"error": "Send JSON login details."}), 400

    username = details.get("username", "")
    password = details.get("password", "")
    member = find_member(username)

    if not member or not check_password_hash(
        member["password_hash"], password
    ):
        return jsonify({"error": "Incorrect login details."}), 401

    session.clear()
    session["member_id"] = member["id"]
    session["username"] = member["username"]

    return jsonify({
        "message": "Logged in",
        "username": member["username"],
    })


@app.post("/api/auth/logout")
def logout():
    session.clear()
    return jsonify({"message": "Logged out"})


@app.get("/api/claims")
def all_claims():
    """Only a logged-in member can list all claims."""
    if "member_id" not in session:
        return jsonify({"error": "Member login required."}), 401

    return jsonify(list_claims())


@app.get("/api/claims/<int:claim_id>")
def claim_details(claim_id):
    """Only a logged-in member can inspect a saved claim."""
    if "member_id" not in session:
        return jsonify({"error": "Member login required."}), 401

    claim = get_claim(claim_id)
    if claim is None:
        return jsonify({"error": "Claim not found."}), 404

    return jsonify(claim)


@app.post("/api/claims/<int:claim_id>/review")
def review_claim(claim_id):
    """Resolve a claim that the system sent to Manual Review."""
    if "member_id" not in session:
        return jsonify({"error": "Member login required."}), 401

    claim = get_claim(claim_id)
    if claim is None:
        return jsonify({"error": "Claim not found."}), 404

    if claim["analysis"]["final_recommendation"] != "Manual Review":
        return jsonify({
            "error": "Only Manual Review claims can be reviewed."
        }), 400

    if claim["review_status"] != "Pending":
        return jsonify({
            "error": "This claim has already been reviewed."
        }), 409

    details = request.get_json(silent=True)
    if not isinstance(details, dict):
        return jsonify({"error": "Send JSON review details."}), 400

    decision = details.get("decision")
    note = str(details.get("note", "")).strip()

    if decision not in ("Approved", "Rejected") or not note:
        return jsonify({
            "error": "Choose Approved or Rejected and provide a note."
        }), 400

    save_review(
        claim_id,
        session["member_id"],
        decision,
        note,
    )

    return jsonify({
        "claim_id": claim_id,
        "review_status": decision,
        "review_note": note,
        "reviewed_by": session["username"],
    })


@app.post("/api/documents/scan")
def scan_document():
    """Read a receipt and suggest fields for the user to confirm."""
    uploaded = request.files.get("file")

    if uploaded is None or not uploaded.filename:
        return jsonify({
            "error": "Upload a file using the field name 'file'."
        }), 400

    filename = uploaded.filename

    if not filename.lower().endswith(
        (".png", ".jpg", ".jpeg", ".pdf")
    ):
        return jsonify({
            "error": "Use PNG, JPG, JPEG, or PDF."
        }), 400

    try:
        text = read_receipt(uploaded.read(), filename)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except pytesseract.TesseractNotFoundError:
        return jsonify({
            "error": "Tesseract OCR is not installed or cannot be found."
        }), 500
    except RuntimeError:
        return jsonify({
            "error": "OCR took too long. Try a clearer image."
        }), 422

    return jsonify({
        "filename": filename,
        "raw_text": text,
        "suggested_fields": suggest_fields(text),
        "needs_user_confirmation": True,
    })

@app.get("/gtm")
def gtm_page():
    """Open the small GTM test page."""
    return send_from_directory(
        Path(__file__).resolve().parent,
        "gtm_test.html",
    )


@app.get("/gtm-model/<path:filename>")
def gtm_model_file(filename):
    """Serve model.json, metadata.json, and the weights file."""
    return send_from_directory(
        Path(__file__).resolve().parent / "gtm_model",
        filename,
    )


@app.get("/api/claims/<int:claim_id>/card")
def claim_card(claim_id):
    """Give GTM a card for this exact saved claim."""
    if "member_id" not in session:
        return jsonify({"error": "Member login required."}), 401

    path = make_card(claim_id)
    if path is None:
        return jsonify({"error": "Claim not found."}), 404

    return send_file(path, mimetype="image/png")

print(app.url_map)

@app.get("/api/policies")
def available_policies():
    """Give React the policy choices for its form."""
    return jsonify(POLICIES)


@app.post("/api/claims/<int:claim_id>/gtm-result")
def add_gtm_result(claim_id):
    """Attach the GTM image prediction to an existing claim."""
    if "member_id" not in session:
        return jsonify({"error": "Member login required."}), 401

    if get_claim(claim_id) is None:
        return jsonify({"error": "Claim not found."}), 404

    details = request.get_json(silent=True)
    if not isinstance(details, dict):
        return jsonify({"error": "Send JSON details."}), 400

    probabilities = details.get("probabilities")
    labels = {"Valid Claim", "Invalid Claim", "Manual Review"}

    if not isinstance(probabilities, dict) or set(probabilities) != labels:
        return jsonify({
            "error": "Send probabilities for all three claim classes."
        }), 400

    if any(
        isinstance(value, bool)
        or not isinstance(value, (int, float))
        or not math.isfinite(value)
        or not 0 <= value <= 1
        for value in probabilities.values()
    ):
        return jsonify({
            "error": "Every probability must be a number from 0 to 1."
        }), 400

    if abs(sum(probabilities.values()) - 1) > 0.02:
        return jsonify({
            "error": "The three probabilities should total about 1."
        }), 400

    model_version = details.get("model_version")
    if not isinstance(model_version, str) or not model_version.strip():
        return jsonify({"error": "Provide a model_version."}), 400

    save_gtm_result(
        claim_id,
        probabilities,
        model_version.strip(),
    )

    return jsonify(get_claim(claim_id)["analysis"])

if __name__ == "__main__":
    app.run(debug=False, port=5000)
    
