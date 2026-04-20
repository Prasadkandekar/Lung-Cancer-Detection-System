import React, { useState } from 'react';
import ConfusionMatrixImg from '../assets/screenshots/knn_cm.jpeg';
// import ROCCurveImg from '../assets/screenshots/roc_curve.png';
// import FeatureImportanceImg from '../assets/screenshots/feature_importance.png';
// import ModelComparisonImg from '../assets/screenshots/model_comparison.png';

const Research = () => {
  const [activeModel, setActiveModel] = useState(0);
  
  const models = [
    {
      id: 0,
      name: " CNN",
      description: "Our primary model, a Convolutional Neural Network designed specifically for volumetric CT scan analysis.",
      accuracy: 99.7,
      sensitivity: 96.3,
      specificity: 97.8,
      auc: 0.998,
      training_time: "2.2 hours",
      parameters: "3.6M",
      advantages: [
        "Excellent at capturing spatial features in 3D volumes",
        "High accuracy on test set",
        "Good generalization to unseen data"
      ],
      limitations: [
        "Computationally expensive",
        "Requires large amounts of memory",
        "Black-box nature limits interpretability"
      ]
    },
    // {
    //   id: 1,
    //   name: "ResNet50 Transfer",
    //   description: "A transfer learning approach using pretrained ResNet50 architecture on 2D slices from CT scans.",
    //   accuracy: 95.2,
    //   sensitivity: 93.1,
    //   specificity: 94.8,
    //   auc: 0.967,
    //   training_time: "2.8 hours",
    //   parameters: "25.6M",
    //   advantages: [
    //     "Leverages pretrained weights",
    //     "Faster convergence than training from scratch",
    //     "Good performance with less data"
    //   ],
    //   limitations: [
    //     "Loss of 3D spatial information",
    //     "Lower accuracy than 3D CNN",
    //     "Suboptimal for small nodule detection"
    //   ]
    // },
    {
      id: 2,
      name: "Random Forest",
      description: "Traditional machine learning approach using extracted radiomics features from the CT scans.",
      accuracy: 89.5,
      sensitivity: 85.2,
      specificity: 91.3,
      auc: 0.923,
      training_time: "12 minutes",
      parameters: "N/A (500 trees)",
      advantages: [
        "Highly interpretable results",
        "Fast training process",
        "Modest computational requirements",
        "Less prone to overfitting"
      ],
      limitations: [
        "Lower overall accuracy",
        "Requires explicit feature engineering",
        "Limited ability to capture complex patterns"
      ]
    },
    // {
    //   id: 3,
    //   name: "Ensemble Method",
    //   description: "A weighted ensemble combining predictions from the 3D CNN, ResNet, and Random Forest models.",
    //   accuracy: 98.9,
    //   sensitivity: 97.1,
    //   specificity: 98.2,
    //   auc: 0.994,
    //   training_time: "N/A (uses trained models)",
    //   parameters: "N/A (Combined)",
    //   advantages: [
    //     "Balances strengths of different approaches",
    //     "More robust predictions",
    //     "Reduces overfitting risk"
    //   ],
    //   limitations: [
    //     "Increased system complexity",
    //     "More difficult deployment pipeline",
    //     "Computationally expensive for inference"
    //   ]
    // },
  ];
  
  // Analysis sections for visualization
  const analyses = [
    {
      title: "Confusion Matrix",
      description: "Visual representation of prediction accuracy showing true positives, false positives, true negatives, and false negatives.",
      image: ConfusionMatrixImg
    },
    // {
    //   title: "ROC Curve Analysis",
    //   description: "The ROC curve plots true positive rate against false positive rate at various threshold settings.",
    //   image: ROCCurveImg
    // },
    // {
    //   title: "Feature Importance",
    //   description: "Analysis of which features and image characteristics contribute most to the prediction.",
    //   image: FeatureImportanceImg
    // },
    // {
    //   title: "Model Comparison",
    //   description: "Head-to-head performance metrics across all models tested during research.",
    //   image: ModelComparisonImg
    // }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Lung Cancer Detection Research
      </h1>
      
      {/* Model Selection */}
      <div className="flex justify-center mb-12 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id)}
              className={`px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                activeModel === model.id 
                  ? "bg-gray-700 text-blue-400 shadow-lg" 
                  : "hover:bg-gray-700/50"
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Model details */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">
                {models[activeModel].name}
              </h2>
              <p className="mb-6 text-gray-300">
                {models[activeModel].description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-blue-400">{models[activeModel].accuracy}%</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Sensitivity</div>
                  <div className="text-2xl font-bold text-blue-400">{models[activeModel].sensitivity}%</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Specificity</div>
                  <div className="text-2xl font-bold text-blue-400">{models[activeModel].specificity}%</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">AUC</div>
                  <div className="text-2xl font-bold text-blue-400">{models[activeModel].auc}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Training Time</div>
                  <div className="text-xl font-bold text-blue-400">{models[activeModel].training_time}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Parameters</div>
                  <div className="text-xl font-bold text-blue-400">{models[activeModel].parameters}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Advantages</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {models[activeModel].advantages.map((adv, index) => (
                      <li key={index}>{adv}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Limitations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {models[activeModel].limitations.map((lim, index) => (
                      <li key={index}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Model Implementation</h3>
              <div className="bg-gray-950 rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-gray-300">
                  <code>
                  {activeModel === 0 ? 
                    `# 3D CNN Model Implementation
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv3D, MaxPooling3D, Flatten, Dense, Dropout

model = Sequential([
    Conv3D(32, kernel_size=3, activation='relu', input_shape=(128, 128, 128, 1)),
    MaxPooling3D(pool_size=2),
    Conv3D(64, kernel_size=3, activation='relu'),
    MaxPooling3D(pool_size=2),
    Conv3D(128, kernel_size=3, activation='relu'),
    MaxPooling3D(pool_size=2),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy', 'AUC'])` 
                  : activeModel === 1 ? 
                    `# ResNet50 Transfer Learning Implementation
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Input

base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom layers
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(256, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=predictions)
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy', 'AUC'])` 
                  : activeModel === 2 ? 
                    `# Random Forest Implementation
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

# Extract radiomics features
from radiomics import featureextractor
extractor = featureextractor.RadiomicsFeatureExtractor()
features = np.array([extractor.execute(img, mask) for img, mask in zip(images, masks)])

# Train Random Forest
rf_model = RandomForestClassifier(
    n_estimators=500, 
    max_depth=None,
    min_samples_split=2,
    random_state=42
)
rf_model.fit(X_train, y_train)

# Evaluate
y_pred = rf_model.predict(X_test)
auc = roc_auc_score(y_test, rf_model.predict_proba(X_test)[:,1])
print(classification_report(y_test, y_pred))` 
                  : 
                    `# Ensemble Method Implementation
import numpy as np
from sklearn.ensemble import VotingClassifier

# Define prediction functions for each model
def cnn_predict(X):
    return cnn_model.predict(X)
    
def resnet_predict(X):
    return resnet_model.predict(X)
    
def rf_predict(X):
    return rf_model.predict_proba(X)[:,1]

# Weighted averaging of predictions
def ensemble_predict(X):
    cnn_preds = cnn_predict(X)
    resnet_preds = resnet_predict(X)
    rf_preds = rf_predict(X)
    
    # Weights determined through validation
    weights = [0.6, 0.3, 0.1]
    
    final_preds = (
        weights[0] * cnn_preds +
        weights[1] * resnet_preds + 
        weights[2] * rf_preds
    )
    
    return final_preds > 0.5`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          
          {/* Right column - Analysis */}
          <div className="space-y-6">
            {analyses.map((analysis, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <div className="p-4 bg-gray-700">
                  <h3 className="text-xl font-semibold text-blue-400">{analysis.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{analysis.description}</p>
                </div>
                <div className="p-4">
                  <img 
                    src={analysis.image} 
                    alt={analysis.title}
                    className="w-full h-auto rounded-lg border border-gray-700 shadow-lg"
                  />
                </div>
              </div>
            ))}
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Comparison Across All Models</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-400">Model</th>
                      <th className="px-4 py-3 text-left text-gray-400">Accuracy</th>
                      <th className="px-4 py-3 text-left text-gray-400">Sensitivity</th>
                      <th className="px-4 py-3 text-left text-gray-400">Specificity</th>
                      <th className="px-4 py-3 text-left text-gray-400">AUC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => (
                      <tr 
                        key={model.id} 
                        className={`border-t border-gray-800 ${activeModel === model.id ? "bg-gray-800" : ""}`}
                        onClick={() => setActiveModel(model.id)}
                      >
                        <td className="px-4 py-3 font-medium">{model.name}</td>
                        <td className="px-4 py-3">{model.accuracy}%</td>
                        <td className="px-4 py-3">{model.sensitivity}%</td>
                        <td className="px-4 py-3">{model.specificity}%</td>
                        <td className="px-4 py-3">{model.auc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;