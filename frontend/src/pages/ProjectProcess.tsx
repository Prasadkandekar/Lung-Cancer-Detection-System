import React, { useState } from 'react';
import LoadDataImg from '../assets/screenshots/load_data.png';
import BuildModelImg from '../assets/screenshots/model_build.png';
import TrainModelImg from '../assets/screenshots/model_train.png';  

import ModelSummaryImg from '../assets/screenshots/model_summary.png';

const ProjectProcess = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    {
      id: 0,
      title: "Data Loading & Preprocessing",
      description: "We start by loading CT scan images and preparing the dataset for training. This includes normalization, augmentation, and splitting the data.",
      image: LoadDataImg,
      code: "# Load and preprocess data\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\n\n# Load dataset\ndf = pd.read_csv('lung_cancer_data.csv')\nX = np.array([load_ct_scan(file) for file in df['ct_scan_path']])\ny = df['cancer_label']\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)"
    },
    {
      id: 1,
      title: "Building Deep Learning Model",
      description: "We design a convolutional neural network architecture specialized for detecting patterns in CT scans that might indicate lung cancer.",
      image: BuildModelImg,
      code: "# Build CNN model\nfrom tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Conv3D, MaxPooling3D, Flatten, Dense, Dropout\n\nmodel = Sequential([\n    Conv3D(32, kernel_size=3, activation='relu', input_shape=(128, 128, 128, 1)),\n    MaxPooling3D(pool_size=2),\n    Conv3D(64, kernel_size=3, activation='relu'),\n    MaxPooling3D(pool_size=2),\n    Conv3D(128, kernel_size=3, activation='relu'),\n    MaxPooling3D(pool_size=2),\n    Flatten(),\n    Dense(128, activation='relu'),\n    Dropout(0.5),\n    Dense(1, activation='sigmoid')\n])"
    },
    {
      id: 2,
      title: "Training Deep Learning Model",
      description: "The model is trained using our prepared dataset with appropriate hyperparameters and callbacks to prevent overfitting.",
      image: TrainModelImg,
      code: "# Train the model\nfrom tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint\n\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy', 'AUC'])\n\ncallbacks = [\n    EarlyStopping(patience=10, restore_best_weights=True),\n    ModelCheckpoint('best_model.h5', save_best_only=True)\n]\n\nhistory = model.fit(\n    X_train, y_train,\n    validation_split=0.2,\n    epochs=50,\n    batch_size=16,\n    callbacks=callbacks\n)"
    },
    {
      id: 3,
      title: "Performance Plotting & Evaluation",
      description: "We analyze the model's performance using various metrics and visualizations to validate its effectiveness in detecting lung cancer.",
      image: ModelSummaryImg,
      code: "# Evaluate and plot results\nimport matplotlib.pyplot as plt\nfrom sklearn.metrics import roc_curve, auc, confusion_matrix\n\n# Plot accuracy and loss\nplt.figure(figsize=(12, 5))\nplt.subplot(1, 2, 1)\nplt.plot(history.history['accuracy'], label='Train')\nplt.plot(history.history['val_accuracy'], label='Validation')\nplt.title('Model Accuracy')\nplt.legend()\n\nplt.subplot(1, 2, 2)\nplt.plot(history.history['loss'], label='Train')\nplt.plot(history.history['val_loss'], label='Validation')\nplt.title('Model Loss')\nplt.legend()\nplt.show()"
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Lung Cancer Detection Project
      </h1>
      
      {/* Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeSection === section.id 
                  ? "bg-gray-700 text-blue-400 shadow-lg" 
                  : "hover:bg-gray-700/50"
              }`}
            >
              {section.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Description and code */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">
                {sections[activeSection].title}
              </h2>
              <p className="mb-6 text-gray-300">
                {sections[activeSection].description}
              </p>
              
              <div className="bg-gray-950 rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-gray-300">
                  <code>{sections[activeSection].code}</code>
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Process Steps</h3>
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li 
                    key={section.id} 
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      activeSection === section.id ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700/50"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === section.id ? "bg-blue-500" : "bg-gray-700"
                    }`}>
                      {section.id + 1}
                    </div>
                    <span>{section.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right column - Screenshot */}
          <div className="flex flex-col space-y-6">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-gray-700 flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm opacity-70">lungcancerdetection.ipynb</div>
              </div>
              <div className="p-4">
                <img 
                  src={sections[activeSection].image} 
                  alt={`Screenshot of ${sections[activeSection].title}`}
                  className="w-full h-auto rounded-lg border border-gray-700 shadow-lg"
                />
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Results Preview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-blue-400">99.7%</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Sensitivity</div>
                  <div className="text-2xl font-bold text-blue-400">96.3%</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Specificity</div>
                  <div className="text-2xl font-bold text-blue-400">97.8%</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">AUC</div>
                  <div className="text-2xl font-bold text-blue-400">0.998</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProcess;