import React, { useState } from 'react';
import { Upload, Scan, AlertCircle, CheckCircle, FileText, CalendarClock, User, HomeIcon } from 'lucide-react';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [classProbabilities, setClassProbabilities] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setResult(null); // Clear previous results
      setConfidence(null);
      setClassProbabilities(null);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(data.result);
        setConfidence(data.confidence);
        setClassProbabilities(data.class_probabilities);
      }
    } catch (error) {
      setResult('An error occurred while detecting.');
      console.error(error);
    }

    setLoading(false);
  };

  // Function to determine background color based on result
  const getResultBgColor = () => {
    if (!result) return "bg-gray-700";
    if (result.toLowerCase().includes("normal")) return "bg-green-800";
    if (result.toLowerCase().includes("benign")) return "bg-yellow-800";
    if (result.toLowerCase().includes("malignant")) return "bg-red-800";
    return "bg-gray-700";
  };

  // Function to render the appropriate icon based on result
  const getResultIcon = () => {
    if (!result) return null;
    if (result.toLowerCase().includes("normal")) 
      return <CheckCircle className="h-8 w-8 text-green-400" />;
    if (result.toLowerCase().includes("benign")) 
      return <AlertCircle className="h-8 w-8 text-yellow-400" />;
    if (result.toLowerCase().includes("malignant")) 
      return <AlertCircle className="h-8 w-8 text-red-400" />;
    return null;
  };

  // Render guidance based on result
  const renderGuidanceSection = () => {
    if (!result) return null;

    if (result.toLowerCase().includes("normal")) {
      return (
        <div className="mt-6 bg-green-900 bg-opacity-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Normal Results - Next Steps</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CalendarClock className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-green-300 font-medium">Regular Screenings</h4>
                <p className="text-gray-300">Continue with routine screenings as recommended by your healthcare provider, typically every 1-2 years.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-green-300 font-medium">Healthy Lifestyle</h4>
                <p className="text-gray-300">Maintain a healthy lifestyle with regular exercise, balanced diet, and avoid smoking to reduce cancer risks.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-green-300 font-medium">Keep Records</h4>
                <p className="text-gray-300">Save this analysis for your medical records and future comparison.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (result.toLowerCase().includes("benign")) {
      return (
        <div className="mt-6 bg-yellow-900 bg-opacity-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Benign Finding - Next Steps</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <HomeIcon className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-300 font-medium">Consult a Specialist</h4>
                <p className="text-gray-300">Schedule an appointment with a pulmonologist to review these findings, even though they appear benign.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CalendarClock className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-300 font-medium">Follow-up Imaging</h4>
                <p className="text-gray-300">Your doctor may recommend follow-up imaging in 3-6 months to monitor for any changes in the benign growth.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-300 font-medium">Monitor Symptoms</h4>
                <p className="text-gray-300">Be vigilant about any changes in symptoms such as persistent cough, shortness of breath, or chest pain, and report them to your doctor.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-300 font-medium">Additional Testing</h4>
                <p className="text-gray-300">Your healthcare provider may recommend additional tests to confirm the benign nature of the finding.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (result.toLowerCase().includes("malignant")) {
      return (
        <div className="mt-6 bg-red-900 bg-opacity-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Malignant Finding - Urgent Next Steps</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <HomeIcon className="h-5 w-5 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-medium">Immediate Medical Attention</h4>
                <p className="text-gray-300">Contact your healthcare provider immediately to discuss these results and schedule an urgent appointment with an oncologist.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-medium">Further Diagnostic Tests</h4>
                <p className="text-gray-300">Your doctor will likely recommend a biopsy and additional imaging tests to confirm the diagnosis and determine the stage of cancer.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User className="h-5 w-5 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-medium">Treatment Planning</h4>
                <p className="text-gray-300">Be prepared to discuss treatment options with your healthcare team, which may include surgery, radiation therapy, chemotherapy, immunotherapy, or a combination.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-medium">Important Note</h4>
                <p className="text-gray-300">This AI detection is not a definitive diagnosis. Medical confirmation through proper clinical procedures is essential.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Introduction Section */}
      <section className="mb-12 bg-gray-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to LungDetect AI</h1>
        <p className="text-gray-300 text-lg mb-6">
          Our advanced lung cancer detection system uses state-of-the-art machine learning
          technology to analyze chest X-rays and CT scans.
        </p>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-3">How it works:</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Upload your chest X-ray or CT scan image</li>
            <li>Our AI model analyzes the image</li>
            <li>Receive detailed results and analysis</li>
            <li>Share results with your healthcare provider</li>
          </ol>
        </div>
      </section>

      {/* Upload and Detection Section */}
      <section className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Image Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-12 w-12 text-blue-500 mb-3" />
                <span className="text-white font-medium">
                  {selectedFile ? selectedFile.name : 'Click to upload image'}
                </span>
                <span className="text-gray-400 text-sm mt-1">
                  Supported formats: JPEG, PNG
                </span>
              </label>
            </div>
            <button
              onClick={handleDetect}
              disabled={!selectedFile || loading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-white font-medium ${
                selectedFile
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              <Scan className="h-5 w-5" />
              <span>{loading ? 'Analyzing...' : 'Detect Cancer'}</span>
            </button>
          </div>

          {/* Results */}
          <div className={`rounded-lg p-6 ${getResultBgColor()}`}>
            <div className="flex items-center mb-4">
              {getResultIcon()}
              <h3 className="text-xl font-semibold text-white ml-2">Analysis Results</h3>
            </div>
            
            {result ? (
              <div className="text-white space-y-2">
                <p>
                  <strong>Prediction:</strong> {result}
                </p>
                <p>
                  <strong>Confidence:</strong> {confidence?.toFixed(2)}%
                </p>
                <div>
                  <strong>Class Probabilities:</strong>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    {classProbabilities &&
                      Object.entries(classProbabilities).map(([label, prob]) => (
                        <li key={label}>
                          {label}: {prob.toFixed(2)}%
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">
                Upload an image and click "Detect Cancer" to see the analysis results here.
              </p>
            )}
            
            {/* Guidance Section */}
            {renderGuidanceSection()}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      {result && (
        <section className="mt-8 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Important Disclaimer</h3>
          </div>
          <p className="text-gray-300">
            LungDetect AI is designed to assist healthcare professionals and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers regarding any medical conditions or concerns. The AI analysis should be reviewed by a medical professional before making any health decisions.
          </p>
        </section>
      )}
    </div>
  );
};

export default Dashboard;