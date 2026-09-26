ASSUREX SPYDER STARTER - 23 September 2026

This is a reproducible teaching example, not a finished competition submission.

INSTALL (Spyder's IPython Console; use the Python interpreter running Spyder):
    %pip install pandas scikit-learn pillow joblib

If your Spyder version does not support %pip, open Anaconda Prompt and run:
    conda install pandas scikit-learn pillow joblib

RUN:
1. Keep 01_generate_dataset.py and 02_train_python_model.py in the same folder.
2. Open 01_generate_dataset.py in Spyder. Press F5.
3. Inspect output/all_claims.csv and output/train.csv.
4. Inspect output/cards/train/Valid Claim/ and the other two classes.
5. Open 02_train_python_model.py and press F5.
6. Inspect console metrics and output/assurex_python_model.joblib.

ROWS AND IMAGES:
One Claim ID is one set of warranty facts and one label in the CSV.
Train: 1,050 rows, two card variants per row = 2,100 training images.
Validation: 225 rows and 225 separate cards.
Test: 225 rows and 225 separate cards.
For example AX-00001_v1.png and AX-00001_v2.png show facts from the same
AX-00001 row. Both remain in train; they are not two separate claims.
The class is stored in the CSV and used to arrange training images into
folders. The class answer is deliberately absent from the visible card.

GTM:
Create an Image Project with three classes. Upload only images in
output/cards/train/Valid Claim, .../Invalid Claim, .../Manual Review.
Train, then test using validation cards you did not upload for training.
Export the trained model and labels. Integrate actual inference in the app.

IMPORTANT LIMITS:
The sample label rules are deliberately simple. Synthetic test accuracy may
look excellent because generated scenarios follow these rules. Extend scenario
diversity, inspect errors and explain that this is not real-world validation.
You still need GTM evidence, OCR, policy files, 30 unseen comparison claims,
application integration, security, reviewer workflow and SRS documentation.
