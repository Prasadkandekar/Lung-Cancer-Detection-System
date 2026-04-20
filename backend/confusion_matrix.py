import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image_dataset_from_directory

# Load your trained model
model = load_model('model/lung_cancer_model.h5')

# Load test dataset from a directory
test_dataset = image_dataset_from_directory(
    "",  # Replace with path to your 'test' folder
    image_size=(224, 224),  # Use your model’s input size
    batch_size=32,
    shuffle=False
)

# Get class names in the same order as directory names
class_names = test_dataset.class_names  # ['Benign', 'Malignant', 'Normal']

# Get predictions
y_pred_probs = model.predict(test_dataset)
y_pred = np.argmax(y_pred_probs, axis=1)

# Get true labels
y_true = np.concatenate([y.numpy() for x, y in test_dataset], axis=0)

# Generate confusion matrix
cm = confusion_matrix(y_true, y_pred)

# Plot confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.title('Confusion Matrix - CNN Model')
plt.show()
