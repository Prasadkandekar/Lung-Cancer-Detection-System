import React from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react';

const Guides = () => {
  const projectGuides = [
    {
      name: "Dr. Atul Kathole",
      role: "Project Guide",
      image: "https://engg.dypvp.edu.in/images/Computer-faculty-photo/Atul-kathole.jpg",
      bio: "Dr. Atul Kathole provided expert guidance throughout the development of LungDetect AI. With extensive experience in medical imaging and artificial intelligence, Dr. Kathole's mentorship was instrumental in shaping the project's direction and ensuring its clinical relevance.",
      expertise: [
        { icon: <BookOpen className="h-5 w-5 text-blue-400" />, text: "Medical Imaging Analysis" },
        { icon: <Briefcase className="h-5 w-5 text-blue-400" />, text: "AI in Healthcare" },
        { icon: <GraduationCap className="h-5 w-5 text-blue-400" />, text: "Research Methodology" }
      ]
    },
    {
      name: "Prof. Shraddha Shingne",
      role: "Project Assistant",
      image: "https://engg.dypvp.edu.in/images/AI-and-DS-faculty-Photos/new-img/Shraddha%20Shingne.JPG",
      bio: "Prof. Shraddha Shingne assisted the team throughout the project lifecycle, providing valuable insights on technical implementation and research approaches. Her expertise in machine learning and data science helped the team overcome numerous challenges during development.",
      expertise: [
        { icon: <BookOpen className="h-5 w-5 text-blue-400" />, text: "Machine Learning" },
        { icon: <Briefcase className="h-5 w-5 text-blue-400" />, text: "Data Science" },
        { icon: <GraduationCap className="h-5 w-5 text-blue-400" />, text: "Software Engineering" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Guides Section Header */}
      <section className="mb-12 bg-gray-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Project Guides</h1>
        <p className="text-gray-300 text-lg">
          We had the privilege of working under the guidance of distinguished faculty members
          who provided invaluable mentorship and expertise throughout the development of LungDetect AI.
        </p>
      </section>

      {/* Guide Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projectGuides.map((guide, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={guide.image} 
                  alt={`${guide.name} - ${guide.role}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center mb-2">
                  <Award className="h-6 w-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-bold text-white">{guide.name}</h2>
                </div>
                <p className="text-blue-400 font-medium mb-4">{guide.role}</p>
                <p className="text-gray-300 mb-4">{guide.bio}</p>
                
                <h3 className="text-white font-semibold mb-2">Areas of Expertise:</h3>
                <ul className="space-y-2">
                  {guide.expertise.map((item, eIndex) => (
                    <li key={eIndex} className="flex items-center text-gray-300">
                      <span className="mr-2">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Thanks Section */}
      <section className="bg-gray-800 rounded-lg p-8">
        <div className="flex items-center mb-6">
          <Users className="h-8 w-8 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Special Thanks</h2>
        </div>
        
        {/* HOD with Image */}
        <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/4">
              <img 
                src="https://engg.dypvp.edu.in/images/AI-and-DS-faculty-Photos/new-img/Vinod%20Kimbahune.JPG" 
                alt="Dr. Vinod Kimbahune - HOD, Computer Engineering"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6 md:w-3/4">
              <div className="flex items-center mb-2">
                <Award className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Dr. Vinod Kimbahune</h3>
              </div>
              <p className="text-blue-400 font-medium mb-4">Head of Department, Computer Engineering</p>
              <p className="text-gray-300">
                We extend our heartfelt gratitude to Dr. Vinod Kimbahune for his leadership and support 
                throughout this project. His encouragement and administrative guidance made this research 
                possible, and his vision for applying cutting-edge technology to solve real-world problems 
                continues to inspire us.
              </p>
              <p className="text-gray-300 mt-3">
                Under his leadership, the department has fostered an environment of innovation and excellence
                that has been crucial to the development of projects like LungDetect AI. His commitment to 
                student growth and research advancement has been a driving force behind our work.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex items-start">
            <GraduationCap className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Computer Engineering Department</h3>
              <p className="text-blue-400 font-medium mb-2">Dr. D. Y. Patil Institute of Technology</p>
              <p className="text-gray-300">
                We are deeply grateful to the entire Computer Engineering Department at Dr. D. Y. Patil 
                Institute of Technology for providing the resources, infrastructure, and academic environment 
                that fostered our research. The department's commitment to excellence and innovation has been 
                fundamental to the success of this project.
              </p>
              <p className="text-gray-300 mt-3">
                The collaborative atmosphere, technical facilities, and constant support from faculty members 
                enabled us to overcome challenges and pursue ambitious goals in the development of LungDetect AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgement Quote */}
      <div className="mt-12 bg-blue-900 bg-opacity-30 rounded-lg p-8 border-l-4 border-blue-500">
        <blockquote className="text-gray-300 text-lg italic">
          "It was our privilege to work under these esteemed faculty members and with the support of 
          the Computer Engineering Department. Their guidance and encouragement have been invaluable 
          to our academic and professional growth, and to the success of LungDetect AI."
        </blockquote>
        <p className="text-right text-blue-400 mt-4">— The LungDetect AI Team</p>
      </div>
    </div>
  );
};

export default Guides;