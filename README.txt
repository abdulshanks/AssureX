ASSUREX CLAIM ENGINE
Team setup guide — 26 September 2026

WHAT ASSUREX DOES
AssureX helps assess product warranty claims. A customer enters claim
details and can scan a receipt. The backend checks warranty facts and
uses a trained Python model to recommend Valid Claim, Invalid Claim,
or Manual Review. A Google Teachable Machine (GTM) image model can
also score a generated claim card. Members can log in and review
claims that need a human decision.

This is a competition prototype. Its training data and warranty rules
are synthetic; model scores are not proof of real-world accuracy.

PROJECT FOLDERS
backend/     Flask API, SQLite code, OCR, policies, and GTM model
frontend/    React and Vite website
output/      Generated datasets and trained Python model
01_generate_dataset.py       Generates synthetic claims and cards
02_train_python_model.py     Trains the Python claim model
CLAIM_FIELDS.md              Claim field descriptions

BEFORE RUNNING
Install Python, Node.js, and Tesseract OCR. The SQLite database and
backend secret key are local files and are not included in GitHub.

BACKEND SETUP
1. Open a terminal in the main AssureX folder.
2. Install the Python packages used by the backend. Check the imports
   in backend/app.py and the other backend files if an import is missing.
3. Run:
       python backend/app.py
4. The Flask API should start at http://127.0.0.1:5000
5. Check http://127.0.0.1:5000/api/policies

FRONTEND SETUP
Open a second terminal and run:
    cd frontend
    npm install
    npm run dev

Open the Local URL printed by Vite, usually http://localhost:5173
On Windows PowerShell, use npm.cmd instead of npm if script execution
is blocked.

CURRENT PAGES
Home, Member Login, Dashboard, New Claim, Claim Result,
Claim History, Review Dashboard, and Reports.

CURRENT BACKEND FEATURES
- Claim analysis using the trained Python model and warranty rules
- SQLite claim storage and duplicate invoice detection
- Member login and manual review workflow
- Receipt image/PDF OCR with fields requiring user confirmation
- Basic (12 months), Standard (24 months), Extended (36 months) policies
- GTM model integration for claim card image scores

IMPORTANT API ROUTES
GET  /api/policies
POST /api/claims/analyze
POST /api/documents/scan

See backend/app.py for the exact login, claim history, review, and GTM
routes and their request formats. Do not guess route names in React.

WORK STILL TO COMPLETE
- Connect every React page to the corresponding backend route
- Finish and test the receipt-to-claim user flow
- Compare the Python and GTM models on 30 unseen claims
- Complete reports, end-to-end testing, and competition documentation

TEAM WORKFLOW
Before starting work: git pull
After changes: git add ., git commit -m "Describe changes", git push
Tell teammates which files you are editing to avoid conflicting changes.
Never commit passwords, backend/.secret_key, the SQLite database,
node_modules, or real customer receipts.
