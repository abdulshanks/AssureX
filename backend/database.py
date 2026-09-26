import json
import sqlite3
from pathlib import Path


DATABASE_FILE = Path(__file__).resolve().parent / "assurex.db"


def connect():
    """Open the database and let us read rows by column name."""
    db = sqlite3.connect(DATABASE_FILE)
    db.row_factory = sqlite3.Row
    return db


def create_tables():
    """Create the tables if they do not already exist."""
    with connect() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS members (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL
            )
        """)

        db.execute("""
            CREATE TABLE IF NOT EXISTS claims (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_number TEXT,
                claim_data TEXT NOT NULL,
                analysis TEXT NOT NULL,
                review_status TEXT,
                reviewer_id INTEGER,
                review_note TEXT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reviewer_id) REFERENCES members(id)
            )
        """)


def find_member(username):
    """Find a member for login."""
    with connect() as db:
        row = db.execute(
            "SELECT * FROM members WHERE username = ?",
            (username,),
        ).fetchone()
        return dict(row) if row else None


def invoice_was_used(invoice_number):
    """Check previously submitted claims for the same invoice."""
    if not invoice_number:
        return False

    with connect() as db:
        row = db.execute(
            "SELECT id FROM claims WHERE invoice_number = ? LIMIT 1",
            (invoice_number,),
        ).fetchone()
        return row is not None


def save_claim(claim, analysis):
    """Store the submitted claim and its AI/rule results."""
    with connect() as db:
        cursor = db.execute(
            """
            INSERT INTO claims
                (invoice_number, claim_data, analysis, review_status)
            VALUES (?, ?, ?, ?)
            """,
            (
                claim.get("invoice_number", ""),
                json.dumps(claim),
                json.dumps(analysis),
                "Pending" if analysis["final_recommendation"]
                             == "Manual Review" else None,
            ),
        )
        return cursor.lastrowid


def get_claim(claim_id):
    """Get one claim and turn its stored JSON back into dictionaries."""
    with connect() as db:
        row = db.execute(
            "SELECT * FROM claims WHERE id = ?",
            (claim_id,),
        ).fetchone()

    if row is None:
        return None

    result = dict(row)
    result["claim_data"] = json.loads(result["claim_data"])
    result["analysis"] = json.loads(result["analysis"])
    return result


def list_claims():
    """Show the newest claims first."""
    with connect() as db:
        rows = db.execute(
            """
            SELECT id, invoice_number, analysis, review_status, created_at
            FROM claims
            ORDER BY id DESC
            """
        ).fetchall()

    results = []
    for row in rows:
        item = dict(row)
        analysis = json.loads(item.pop("analysis"))
        item["final_recommendation"] = analysis["final_recommendation"]
        results.append(item)

    return results


def save_review(claim_id, reviewer_id, decision, note):
    """Record what a logged-in reviewer decided."""
    with connect() as db:
        db.execute(
            """
            UPDATE claims
            SET review_status = ?,
                reviewer_id = ?,
                review_note = ?
            WHERE id = ?
            """,
            (decision, reviewer_id, note, claim_id),
        )
        
def save_gtm_result(claim_id, probabilities, model_version):
    """Add GTM results to a claim's stored analysis."""
    with connect() as db:
        row = db.execute(
            "SELECT analysis FROM claims WHERE id = ?",
            (claim_id,),
        ).fetchone()

        if row is None:
            return False

        analysis = json.loads(row["analysis"])
        analysis["gtm_probabilities"] = probabilities
        analysis["gtm_prediction"] = max(
            probabilities,
            key=probabilities.get,
        )
        analysis["gtm_model_version"] = model_version
        analysis["models_disagree"] = (
            analysis["gtm_prediction"]
            != analysis["python_prediction"]
        )

        db.execute(
            "UPDATE claims SET analysis = ? WHERE id = ?",
            (json.dumps(analysis), claim_id),
        )

        return True