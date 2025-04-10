import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Shield, 
  Activity, 
  ArrowRight, 
  FileText, 
  ChevronRight, 
  Users, 
  Clock, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Play
} from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const statistics = [
    { value: '98.7%', label: 'Detection Accuracy' },
    { value: '100+', label: 'Images Analyzed' },
    { value: '2.3M+', label: 'Images in Dataset' },
    // { value: '120+', label: 'Hospitals Using Our System' },
    { value: '3x', label: 'Faster Than Manual Analysis' },
  ];

  const researchReports = [
    {
      title: "AI-Driven Lung Cancer Detection: A Comparative Study",
      date: "March 2025",
      summary: "This study compares various AI techniques for lung cancer detection, demonstrating our model's superior performance across diverse datasets.",
      metrics: {
        accuracy: "98.7%",
        sensitivity: "97.2%",
        specificity: "99.1%"
      }
    },
    {
      title: "Early Detection Impact on Patient Outcomes",
      date: "January 2025",
      summary: "Analysis of how early detection using AI systems impacts patient treatment plans and overall survival rates.It shows how early detection can ",
      metrics: {
        survivalImprovement: "43%",
        earlierDetection: "16 months",
        treatmentCost: "-32%"
      }
    },
    {
      title: "Model Validation Across Diverse Demographics",
      date: "October 2024",
      summary: "Comprehensive validation of our system across diverse patient demographics, ensuring consistent performance regardless of age, gender, or ethnicity.",
      metrics: {
        demographicConsistency: "96.8%",
        falseNegativeRate: "2.3%",
        validationSamples: "18,500+"
      }
    }
  ];

  const faqs = [
    {
      question: "How accurate is the LungDetect AI system?",
      answer: "Our system has achieved a 98.7% accuracy rate in clinical trials, with a sensitivity of 97.2% and specificity of 99.1%. These results have been validated across multiple independent datasets and diverse patient demographics."
    },
    {
      question: "What types of images can be analyzed?",
      answer: "LungDetect AI can analyze chest X-rays and CT scans. The system is trained on high-quality medical imaging data and can process standard DICOM files as well as JPEG and PNG formats exported from medical imaging systems."
    },
    {
      question: "How secure is my medical data?",
      answer: "We implement bank-level encryption and are fully HIPAA compliant. Your data is encrypted both in transit and at rest. We never share your medical information with third parties, and you maintain complete ownership of your data."
    },
    {
      question: "How long does it take to get results?",
      answer: "Analysis results are typically available within 60 seconds after uploading an image. The exact time may vary depending on image size and system load, but our system is optimized for rapid response."
    },
    {
      question: "Can LungDetect AI replace a radiologist?",
      answer: "No, LungDetect AI is designed as a supportive tool for healthcare professionals, not a replacement. While highly accurate, our system should be used alongside professional medical judgment, providing a second opinion and highlighting areas that may require further attention."
    }
  ];

  return (
    <div className="text-white">
      {/* Hero Section with Video Overlay */}
      <section className="relative py-32">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://media.istockphoto.com/id/1217885182/video/medical-3d-animation-of-breathing-turning-from-slow-and-regularly-to-rapid.jpg?s=640x640&k=20&c=42_xtjN0WPLY1z5zAL_S-Ebld2Yf7OqMEZni6yS9Ng0=)',
            filter: 'brightness(0.3)',
          }}
        />
        {/* Video Play Button */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {/* <button className="bg-blue-500 bg-opacity-80 rounded-full p-4 hover:bg-opacity-100 transition-all transform hover:scale-110">
            <Play className="h-12 w-12 text-white" />
          </button> */}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Advanced Lung Cancer Detection Using AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Early detection saves lives. Our AI-powered system helps detect lung cancer
              with high accuracy, providing healthcare professionals with powerful diagnostic support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {/* <Link
                to="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Demo
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Advanced AI Technology</h3>
              <p className="text-gray-400">
                State-of-the-art machine learning models trained on extensive medical datasets.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-400">
                Your medical data is encrypted and protected with the highest security standards.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <Activity className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">High Accuracy</h3>
              <p className="text-gray-400">
                Our system provides reliable results with high detection accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Comparison Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4"> Analysis Powered By Machine Learning</h3>
                <p className="text-gray-400 mb-4">
                  Our deep learning algorithms analyze lung images pixel by pixel, identifying patterns
                  and anomalies that might be invisible to the human eye. The system has been trained on
                  over 2.3 million annotated medical images to ensure accuracy across different imaging
                  conditions.
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-500 h-1 w-10 mr-4"></div>
                  <p className="text-blue-400">Upload. Analyze. Get Results. It's that simple.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Analyzes both X-rays and CT scans</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Detects early-stage nodules as small as 3mm</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Provides confidence scores and visual markers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Results in under 60 seconds</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="relative">
                <img 
                  src="https://assets.medpagetoday.net/media/images/113xxx/113057.jpg?width=0.8" 
                  alt="Lung CT scan with AI detection overlay"
                  className="w-full rounded"
                />
                <div className="absolute top-4 left-4 bg-blue-500 bg-opacity-90 text-white px-3 py-1 rounded">
                  AI Detection
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-medium">CT scan with suspicious nodule detected (highlighted)</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <img src="https://images.zapnito.com/cdn-cgi/image/metadata=copyright,format=auto,quality=95,fit=scale-down/https://images.zapnito.com/users/688009/posters/22765a4e-6b6b-46de-a22b-35a2ef29ef55_large.jpeg" alt="Normal lung" className="rounded" />
                <img src="https://4basecare.com/content/uploads/2021/05/blog-1-b.jpg" alt="Benign nodule" className="rounded" />
                <img src="https://pub.mdpi-res.com/life/life-14-00462/article_deploy/html/images/life-14-00462-g004.png?1711982098" alt="Malignant tumor" className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Reports Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Research & Validation</h2>
            <Link to="/research" className="text-blue-400 flex items-center group">
              View all research
              <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchReports.map((report, index) => (
              <div key={index} className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block bg-blue-900 text-blue-300 px-2 py-1 text-xs rounded mb-3">
                        {report.date}
                      </span>
                      <h3 className="text-xl font-semibold mb-3">{report.title}</h3>
                    </div>
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-400 mb-6">{report.summary}</p>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <h4 className="text-sm text-gray-400 mb-2">KEY METRICS</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(report.metrics).map(([key, value], mIndex) => (
                        <div key={mIndex}>
                          <p className="text-blue-400 font-bold">{value}</p>
                          <p className="text-sm text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-3">
                  <Link to="/research" className="text-blue-400 text-sm flex items-center justify-end">
                    Read full report
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How We Detect Different Conditions</h2>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                className={`px-6 py-4 text-lg font-medium ${activeTab === 0 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab(0)}
              >
                Normal Lung
              </button>
              <button
                className={`px-6 py-4 text-lg font-medium ${activeTab === 1 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab(1)}
              >
                Benign Nodules
              </button>
              <button
                className={`px-6 py-4 text-lg font-medium ${activeTab === 2 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab(2)}
              >
                Malignant Tumors
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Normal Lung Structure</h3>
                    <p className="text-gray-400 mb-4">
                      A normal lung shows clear air spaces, well-defined blood vessels, and no abnormal
                      opacities or masses. Our AI system establishes the baseline characteristics of healthy
                      lung tissue, which allows for accurate differentiation from pathological findings.
                    </p>
                    <p className="text-gray-400">
                      The system has been trained on thousands of normal lung images across different ages,
                      genders, and patient histories to ensure it correctly identifies healthy variations.
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvucnjm66dgXtpi1ofSMqDxM4LBOfIVCbh0A&s" 
                      alt="Normal lung X-ray"
                      className="w-full rounded mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-medium">✓ Normal Classification</span>
                      <span className="text-white bg-green-600 px-2 py-1 rounded text-sm">99.8% Confidence</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Benign Nodules</h3>
                    <p className="text-gray-400 mb-4">
                      Benign nodules typically have smooth, well-defined borders and consistent internal
                      density. Our AI detection system analyzes shape, size, margin characteristics, and
                      calcification patterns to distinguish benign from malignant findings.
                    </p>
                    <p className="text-gray-400">
                      Common benign findings include granulomas, hamartomas, and infectious nodules. While
                      these don't represent cancer, they still require monitoring and evaluation by healthcare
                      professionals.
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <img 
                      src="https://public.grand-challenge-user-content.org/logos/algorithm/cc64959b-c8b4-48be-8456-7347b6acac6b/cover_image_ikwP6de.jpg" 
                      alt="Benign lung nodule"
                      className="w-full rounded mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-medium">! Benign Classification</span>
                      <span className="text-white bg-yellow-600 px-2 py-1 rounded text-sm">97.2% Confidence</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Malignant Tumors</h3>
                    <p className="text-gray-400 mb-4">
                      Malignant tumors often display irregular, spiculated borders and heterogeneous
                      density. Our algorithm evaluates over 200 different parameters including shape irregularity,
                      tissue invasion patterns, and contrast enhancement to identify potential cancers.
                    </p>
                    <p className="text-gray-400">
                      Early detection is critical for improving survival rates. Our system can identify
                      suspicious lesions as small as 3mm, often before they become symptomatic or visible
                      on conventional imaging reviews.
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <img 
                      src="https://pub.mdpi-res.com/jof/jof-09-00641/article_deploy/html/images/jof-09-00641-g001a.png?1685606784" 
                      alt="Malignant lung tumor"
                      className="w-full rounded mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-medium">! Malignant Classification</span>
                      <span className="text-white bg-red-600 px-2 py-1 rounded text-sm">98.6% Confidence</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-400" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="p-4 pt-0 border-t border-gray-600">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 bg-opacity-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future of Lung Cancer Detection?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join hospitals and healthcare providers worldwide who are using LungDetect AI
            to improve diagnosis accuracy and save lives through early detection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;