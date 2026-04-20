# LungDetect AI — Lung Cancer Detection System

LungDetect AI is a full-stack web application that leverages deep learning to assist in the early detection of lung cancer from medical imaging. The system classifies lung CT scan or X-ray images into three categories — **Benign**, **Malignant**, or **Normal** — and provides confidence scores, per-class probabilities, and contextual medical guidance based on the result.

The project was developed as an academic capstone at **Dr. D. Y. Patil Institute of Technology**, Computer Engineering Department, combining expertise in machine learning, full-stack development, and data science to build a clinically relevant diagnostic support tool.

> **Important:** LungDetect AI is a decision-support tool intended to assist healthcare professionals. It is not a substitute for professional medical diagnosis. All results must be reviewed by a qualified clinician before any medical decisions are made.

---

## Why Early Detection Matters

Lung cancer is one of the leading causes of cancer-related deaths worldwide. The primary reason for its high mortality rate is late-stage diagnosis — by the time symptoms appear, the disease has often progressed significantly. Studies show that patients diagnosed at an early stage have a survival rate more than **three times higher** than those diagnosed at a late stage.

Traditional radiological review is time-consuming, subject to human fatigue, and requires highly specialized expertise. AI-assisted detection can serve as a reliable second opinion, flagging suspicious regions in seconds and helping prioritize cases that need urgent attention. LungDetect AI was built with this clinical motivation at its core.

---

## Project Structure

```
├── backend/
│   ├── main.py                  # FastAPI application — serves the prediction API
│   ├── confusion_matrix.py      # Standalone script to evaluate model on a test set
│   ├── requirements.txt         # Python package dependencies
│   ├── LungCancerDetection.ipynb # Jupyter notebook — full training pipeline
│   ├── model/
│   │   └── lung_cancer_model.h5 # Trained Keras CNN model (saved weights + architecture)
│   └── data/
│       └── LungCancerDataset/
│           ├── Bengin cases/    # 120 benign CT scan images
│           ├── Malignant cases/ # 561 malignant CT scan images
│           └── Normal cases/    # Normal lung CT scan images
└── frontend/
    ├── src/
    │   ├── pages/               # All application pages (Dashboard, Landing, Research, etc.)
    │   ├── components/          # Shared UI components (Navbar, Footer)
    │   └── context/             # React context for authentication state
    ├── package.json
    └── vite.config.ts
```

---

## The Machine Learning Model

### Overview

The core of LungDetect AI is a **Convolutional Neural Network (CNN)** trained end-to-end on labeled lung imaging data. CNNs are the gold standard for image classification tasks because they learn hierarchical spatial features directly from pixel data — from low-level edges and textures in early layers to high-level semantic patterns like nodule shapes and tissue irregularities in deeper layers.

The model is built with **TensorFlow 2.18 / Keras 3.8** and saved in the HDF5 format (`lung_cancer_model.h5`), which bundles both the architecture and the trained weights into a single portable file. At inference time, the model is loaded once when the server starts and reused for every prediction request.

### Architecture

The network follows a classic encoder-style CNN design with progressively deeper feature maps:

```
Input (256×256×3)
  │
  ├─ Conv2D(32 filters, 3×3, ReLU)   ← detects basic edges, textures
  ├─ MaxPooling2D(2×2)
  │
  ├─ Conv2D(64 filters, 3×3, ReLU)   ← detects shapes, gradients
  ├─ MaxPooling2D(2×2)
  │
  ├─ Conv2D(128 filters, 3×3, ReLU)  ← detects complex patterns, nodule features
  ├─ MaxPooling2D(2×2)
  │
  ├─ Flatten
  ├─ Dense(128, ReLU)                 ← high-level feature combination
  ├─ Dropout(0.5)                     ← regularization to prevent overfitting
  └─ Dense(3, Softmax)                ← output: probability for each of 3 classes
```

Each convolutional block extracts increasingly abstract features from the image. The `MaxPooling` layers reduce spatial dimensions, making the network more computationally efficient and providing a degree of translation invariance — meaning the model can recognize a nodule regardless of where it appears in the image. The `Dropout(0.5)` layer randomly disables 50% of neurons during training, which forces the network to learn redundant representations and significantly reduces overfitting on the relatively small dataset.

The final `Dense(3, Softmax)` layer outputs a probability distribution across the three classes. The class with the highest probability is the prediction.

### Training Configuration

The model was trained using the following setup:

- **Optimizer:** Adam (adaptive learning rate, well-suited for medical imaging tasks)
- **Loss function:** Categorical cross-entropy (standard for multi-class classification)
- **Metrics tracked:** Accuracy, AUC (Area Under the ROC Curve)
- **Callbacks:** EarlyStopping (restores best weights, prevents overtraining) and ModelCheckpoint (saves the best model during training)
- **Epochs:** Up to 50, with early stopping
- **Batch size:** 16
- **Validation split:** 20% of training data held out for validation
- **Framework:** TensorFlow 2.18.0 with Keras 3.8.0
- **Training environment:** Anaconda on Windows (Intel CPU)

### Input Preprocessing Pipeline

Before any image is passed to the model — whether during training or inference — it goes through a consistent preprocessing pipeline:

1. **Resize to 256×256 pixels** — standardizes all images to the same spatial dimensions the model expects
2. **Convert to RGB** — ensures 3-channel input even if the source image is grayscale or RGBA
3. **Normalize pixel values to [0, 1]** — divides each pixel by 255.0, which stabilizes gradient flow during training and ensures consistent inference behavior
4. **Add batch dimension** — reshapes from `(256, 256, 3)` to `(1, 256, 256, 3)` for single-image inference

This pipeline is applied identically during training (via `image_dataset_from_directory`) and at inference time (in `main.py`), which is critical — any mismatch between training and inference preprocessing would degrade model performance.

### Output Classes

The model classifies each image into one of three categories:

| Class | Clinical Meaning | Visual Characteristics |
|---|---|---|
| `normal` | Healthy lung tissue with no abnormal findings | Clear air spaces, well-defined blood vessels, no opacities or masses |
| `benign` | Non-cancerous growth present | Smooth, well-defined borders; consistent internal density; often calcified (granulomas, hamartomas) |
| `malignant` | Cancerous tumor detected | Irregular or spiculated borders; heterogeneous density; may show tissue invasion patterns |

The distinction between benign and malignant is clinically significant. Benign nodules still require monitoring and follow-up imaging, but do not carry the same urgency as malignant findings. The model's ability to separate these three classes — rather than just binary cancer/no-cancer — makes it more useful in a real clinical workflow.

### Performance

The CNN was evaluated against a held-out test set and compared to a Random Forest baseline trained on hand-crafted radiomics features:

**CNN (Primary Model)**

| Metric | Value |
|---|---|
| Accuracy | 99.7% |
| Sensitivity (Recall) | 96.3% |
| Specificity | 97.8% |
| AUC | 0.998 |
| Model Parameters | ~3.6 million |
| Training Time | ~2.2 hours |

**Model Comparison**

| Metric | CNN | Random Forest |
|---|---|---|
| Accuracy | 99.7% | 89.5% |
| Sensitivity | 96.3% | 85.2% |
| Specificity | 97.8% | 91.3% |
| AUC | 0.998 | 0.923 |
| Training Time | ~2.2 hours | ~12 minutes |

The CNN outperforms the Random Forest across every metric. The most important gap is in **sensitivity** — the ability to correctly identify malignant cases. A false negative (missing a malignant case) is far more dangerous than a false positive in a cancer screening context. The CNN's 96.3% sensitivity vs. the Random Forest's 85.2% represents a meaningful clinical difference.

The Random Forest, while less accurate, offers interpretability and fast training — useful for understanding which features matter, but not suitable as the primary production model.

### Confusion Matrix Evaluation

The `confusion_matrix.py` script in the backend can be used to evaluate the model on a labeled test directory. It loads the model, runs predictions on all images, and plots a heatmap showing true vs. predicted labels for all three classes. This is useful for identifying which class pairs the model confuses most often.

To run it, update the empty string in `test_dataset = image_dataset_from_directory("")` with the path to your test folder, then run:

```bash
python confusion_matrix.py
```

### Dataset

The dataset is the **IQ-OTH/NCCD Lung Cancer Dataset**, organized into three class folders:

| Class | Image Count | Description |
|---|---|---|
| Benign cases | 120 | CT scans showing non-cancerous lung nodules |
| Malignant cases | 561 | CT scans showing confirmed cancerous tumors |
| Normal cases | ~55 | CT scans of healthy lung tissue |

All images are in JPEG format. The class imbalance (malignant cases significantly outnumber the others) reflects real-world clinical distributions where malignant cases are more thoroughly documented in research datasets. This imbalance was accounted for during training.

The notebook `LungCancerDetection.ipynb` contains the full training pipeline — data loading, preprocessing, model construction, training, and evaluation — and can be re-run to reproduce or retrain the model.

---

## Backend

The backend is a **REST API** built with **FastAPI**, a modern Python web framework known for its high performance (built on Starlette and Pydantic), automatic OpenAPI documentation generation, and native async support. It is served by **Uvicorn**, an ASGI server.

When the server starts, it immediately loads the trained Keras model into memory. This means the model is only loaded once — not on every request — keeping inference latency low.

**CORS** is configured to allow all origins (`*`), which is appropriate for development and allows the React frontend running on a different port to communicate with the API without browser security errors.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check — confirms the API is running |
| `POST` | `/predict` | Accepts an image file and returns a classification result |

### POST /predict

Accepts a `multipart/form-data` request with a single field named `file` containing a JPEG or PNG image.

**Example request (curl):**
```bash
curl -X POST http://localhost:8000/predict \
  -F "file=@chest_scan.jpg"
```

**Example response:**
```json
{
  "result": "malignant",
  "confidence": 97.43,
  "class_probabilities": {
    "benign": 1.21,
    "malignant": 97.43,
    "normal": 1.36
  }
}
```

- `result` — the predicted class label
- `confidence` — the probability of the predicted class, as a percentage
- `class_probabilities` — the full softmax output for all three classes, as percentages

If an error occurs during processing (e.g., corrupt image, unsupported format), the API returns `{"error": "<error message>"}` rather than crashing.

### Running the Backend

**Prerequisites:** Python 3.9+, pip, and the virtual environment already set up at `backend/.venv`.

```powershell
# Step 1 — navigate to the backend folder
cd backend

# Step 2 — activate the virtual environment
.\.venv\Scripts\Activate.ps1

# Step 3 — install dependencies (only needed once, or after adding new packages)
pip install -r requirements.txt

# Step 4 — start the development server
python main.py
```

The server starts at `http://localhost:8000` with hot-reload enabled (`reload=True`), so any changes to `main.py` will automatically restart the server.

- API root: `http://localhost:8000`
- Interactive Swagger UI: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

### Python Dependencies

| Package | Purpose |
|---|---|
| `fastapi` | Web framework for building the REST API |
| `uvicorn` | ASGI server to run the FastAPI application |
| `tensorflow` | Deep learning framework — loads and runs the CNN model |
| `pillow` | Image loading and preprocessing (resize, RGB conversion) |
| `numpy` | Numerical operations — array manipulation for model input/output |
| `python-multipart` | Required by FastAPI to handle file uploads via multipart forms |
| `python-dotenv` | Loads environment variables from a `.env` file |

---

## Frontend

The frontend is a **React 18** single-page application written in **TypeScript**, bundled with **Vite**, and styled with **Tailwind CSS**. It provides a clean, dark-themed medical interface with protected routes, contextual result guidance, and dedicated pages for research, team, and project documentation.

### Authentication

Authentication is handled client-side via a React Context (`AuthContext`). The `isAuthenticated` state gates access to all protected routes — unauthenticated users are redirected to `/login`. The current implementation accepts any credentials (no backend auth), which is appropriate for a demo/academic project. A real deployment would connect this to a proper auth service.

### Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page — hero section, statistics, feature highlights, how-it-works walkthrough, research previews, condition tabs (normal/benign/malignant), and FAQ |
| `/login` | Public | Email + password sign-in form |
| `/signup` | Public | Account creation form with password confirmation |
| `/dashboard` | Protected | Main prediction interface — upload image, run inference, view results |
| `/process` | Protected | Step-by-step visual walkthrough of the ML pipeline with code snippets and notebook screenshots |
| `/research` | Protected | Detailed model comparison page with metrics, confusion matrix visualization, and implementation code |
| `/guides` | Protected | Faculty guide and project assistant profiles with acknowledgements |
| `/team` | Protected | Team member profiles, roles, and individual contributions |

### Dashboard — How It Works

The Dashboard is the core feature of the application. Here's the full user flow:

1. The user uploads a chest X-ray or CT scan image (JPEG or PNG) via a drag-and-drop style file input
2. Clicking "Detect Cancer" sends the image to `POST http://localhost:8000/predict` as a multipart form
3. While waiting, the button shows "Analyzing..." and is disabled to prevent duplicate requests
4. On response, the UI displays:
   - The predicted class (benign / malignant / normal)
   - Confidence percentage
   - A breakdown of probabilities for all three classes
   - A color-coded result panel: green for normal, yellow for benign, red for malignant
5. Below the result, a contextual guidance section appears with next-step recommendations tailored to the specific prediction:
   - **Normal** — advice on routine screenings, healthy lifestyle, and record-keeping
   - **Benign** — recommendation to consult a pulmonologist, schedule follow-up imaging, and monitor symptoms
   - **Malignant** — urgent guidance to seek immediate medical attention, prepare for biopsy and staging, and understand treatment options
6. A disclaimer section reminds the user that AI results must be reviewed by a medical professional

### Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 18.3.1 | UI framework |
| TypeScript | 5.5.3 | Type safety |
| Vite | 5.4.2 | Build tool and dev server |
| Tailwind CSS | 3.4.1 | Utility-first styling |
| React Router DOM | 6.22.3 | Client-side routing |
| Lucide React | 0.344.0 | Icon library |

### Running the Frontend

**Prerequisites:** Node.js 18+ and npm.

```bash
# Step 1 — navigate to the frontend folder
cd frontend

# Step 2 — install dependencies (only needed once)
npm install

# Step 3 — start the development server
npm run dev
```

The app runs at `http://localhost:5173` by default.

To build for production:
```bash
npm run build
```
The output goes to `frontend/dist/` and can be served by any static file host.

---

## Running the Full Stack

Both the backend and frontend need to be running simultaneously for the application to work end-to-end.

**Terminal 1 — Backend:**
```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python main.py
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser. Sign up with any email and password, navigate to the Dashboard, upload a lung image, and click "Detect Cancer".

The frontend hardcodes the backend URL as `http://localhost:8000/predict`. If you change the backend port, update the fetch call in `frontend/src/pages/Dashboard.tsx` accordingly.

---

## Project Workflow (ML Pipeline)

The full machine learning pipeline is documented in `backend/LungCancerDetection.ipynb` and visualized in the `/process` page of the frontend. The four main stages are:

**1. Data Loading & Preprocessing**
Images are loaded from the `LungCancerDataset` directory using `image_dataset_from_directory`, which automatically infers class labels from folder names. The dataset is split into training and validation sets (80/20), and images are resized and normalized.

**2. Model Architecture**
The CNN is constructed using the Keras Sequential API with convolutional blocks, pooling layers, dropout regularization, and a softmax output layer as described above.

**3. Training**
The model is compiled with the Adam optimizer and categorical cross-entropy loss, then trained with EarlyStopping and ModelCheckpoint callbacks. Training runs for up to 50 epochs, stopping early if validation loss stops improving.

**4. Evaluation & Visualization**
Training history (accuracy and loss curves) is plotted to diagnose overfitting. The confusion matrix script generates a heatmap of predictions vs. ground truth labels. Final metrics (accuracy, sensitivity, specificity, AUC) are computed on the held-out test set.

---

## Team

| Name | Role | Key Contributions |
|---|---|---|
| Prasad Kandekar | ML Engineer & Full-Stack Developer | CNN model development, FastAPI backend, React frontend, research design |
| Aniket Adhav | Machine Learning Researcher | Model architecture design, training pipeline, validation methodology |
| Divyesh Puranik | Data Scientist | Dataset collection and curation, preprocessing pipelines, statistical analysis |

### Guides & Acknowledgements

| Name | Role |
|---|---|
| Dr. Atul Kathole | Project Guide — expert guidance on medical imaging and AI methodology |
| Prof. Shraddha Shingne | Project Assistant — technical support on ML implementation and research |
| Dr. Vinod Kimbahune | Head of Department, Computer Engineering — administrative support and project oversight |

**Institution:** Dr. D. Y. Patil Institute of Technology, Computer Engineering Department, Pune

---

## Disclaimer

LungDetect AI is an academic research project. The model's predictions are based on patterns learned from a limited dataset and have not been validated in a clinical setting. This tool should **never** be used as the sole basis for a medical diagnosis or treatment decision. Always consult a qualified radiologist or oncologist for interpretation of medical imaging results.
