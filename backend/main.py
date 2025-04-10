from fastapi import FastAPI, File, UploadFile
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] for all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load your trained Keras model
model = tf.keras.models.load_model("model/lung_cancer_model.h5")
print("Model loaded successfully.")
model.summary()

# Class labels (update these if your class names differ)
class_names = ['benign', 'malignant', 'normal']

# Preprocessing function
def preprocess_image(image):
    image = image.resize((256, 256))            # Resize to (256, 256)
    image = image.convert("RGB")                # Ensure RGB format
    image = np.array(image).astype('float32') / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)       # Add batch dimension (1, 256, 256, 3)
    return image

# Define a home route (optional)
@app.get("/")
def home():
    return {"message": "Lung Cancer Prediction API is running!"}

# Prediction endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        processed_image = preprocess_image(image)

        prediction = model.predict(processed_image)
        predicted_index = int(np.argmax(prediction))
        predicted_label = class_names[predicted_index]
        confidence = float(np.max(prediction)) * 100

        return {
            "result": predicted_label,
            "confidence": round(confidence, 2),
            "class_probabilities": {
                class_names[i]: round(float(pred) * 100, 2)
                for i, pred in enumerate(prediction[0])
            }
        }

    except Exception as e:
        return {"error": str(e)}

# Run the app directly with `python main.py`
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
# activation of venv : .\.venv\Scripts\Activate.ps1
# Run the server : python main.py