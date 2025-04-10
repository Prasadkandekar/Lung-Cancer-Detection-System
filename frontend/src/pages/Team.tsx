import React from 'react';
import { Github, Linkedin, Mail, BookOpen, Database, Code, BrainCircuit } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Prasad Kandekar",
      role: "ML Engineer & Full-Stack Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQF4f1Ycvf10ow/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727335313125?e=1749686400&v=beta&t=A_eDTc1W6aFcc9ocZRnXDDCNLEfdtjnyf-wYaQt2A4w",
      bio: "Led the development of the machine learning model, implemented both frontend and backend systems, and conducted extensive research on lung cancer detection algorithms.",
      contributions: [
        { icon: <BrainCircuit className="h-5 w-5 text-blue-400" />, text: "Machine Learning Model Development" },
        { icon: <Code className="h-5 w-5 text-blue-400" />, text: "Frontend & Backend Implementation" },
        { icon: <BookOpen className="h-5 w-5 text-blue-400" />, text: "Research & Algorithm Design" }
      ],
      links: {
        github: "https://github.com/prasadkandekar",
        linkedin: "https://linkedin.com/in/prasadkandekar",
        email: "prasad.kandekar@example.com"
      }
    },
    {
      name: "Aniket Adhav",
      role: "Machine Learning Researcher",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFTwVBpl3hshQ/profile-displayphoto-shrink_800_800/B4EZUu67SHGYAg-/0/1740248955157?e=1749686400&v=beta&t=hLc5q1WLSsn5UMXNNU9gcymhtALn2oelscKmdR6mhts",
      bio: "Specialized in machine learning research and model development, focusing on optimization of neural networks for medical imaging analysis and improving detection accuracy.",
      contributions: [
        { icon: <BrainCircuit className="h-5 w-5 text-blue-400" />, text: "ML Model Architecture Design" },
        { icon: <BookOpen className="h-5 w-5 text-blue-400" />, text: "Research on Image Classification" },
        { icon: <Code className="h-5 w-5 text-blue-400" />, text: "Model Training & Validation" }
      ],
      links: {
        github: "https://github.com/aniketadhav",
        linkedin: "https://linkedin.com/in/aniketadhav",
        email: "aniket.adhav@example.com"
      }
    },
    {
      name: "Divyesh Puranik",
      role: "Data Scientist",
      image: "https://media.licdn.com/dms/image/v2/D4E35AQG_TBxjuBLYTA/profile-framedphoto-shrink_800_800/B4EZWAxAndHMAg-/0/1741622086394?e=1744754400&v=beta&t=HHAu3q8NQkMWLJNLMzHo5VUO2m_Lx9L6-Xqe6ZWiot4",
      bio: "Focused on dataset collection, preparation, and analysis, ensuring high-quality data for model training. Contributed to data preprocessing and feature engineering.",
      contributions: [
        { icon: <Database className="h-5 w-5 text-blue-400" />, text: "Dataset Collection & Curation" },
        { icon: <Code className="h-5 w-5 text-blue-400" />, text: "Data Preprocessing Pipelines" },
        { icon: <BookOpen className="h-5 w-5 text-blue-400" />, text: "Statistical Analysis" }
      ],
      links: {
        github: "https://github.com/divyeshpuranik",
        linkedin: "https://linkedin.com/in/divyeshpuranik",
        email: "divyesh.puranik@example.com"
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Team Section Header */}
      <section className="mb-12 bg-gray-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Meet Our Team</h1>
        <p className="text-gray-300 text-lg">
          LungDetect AI was developed by a talented team combining expertise in machine learning, 
          software development, and data science. Each member brought unique skills to create this 
          powerful tool for lung cancer detection.
        </p>
      </section>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative">
              <img 
                src={member.image} 
                alt={`${member.name} - ${member.role}`}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                <p className="text-blue-400 font-medium">{member.role}</p>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-4">{member.bio}</p>
              
              <h3 className="text-white font-semibold mb-2">Key Contributions:</h3>
              <ul className="space-y-2 mb-6">
                {member.contributions.map((contribution, cIndex) => (
                  <li key={cIndex} className="flex items-center text-gray-300">
                    <span className="mr-2">{contribution.icon}</span>
                    {contribution.text}
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-gray-700 flex justify-center space-x-6">
                <a href={member.links.github} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Github className="h-6 w-6" />
                </a>
                <a href={member.links.linkedin} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href={`mailto:${member.links.email}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Background */}
      <section className="mt-12 bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Project Background</h2>
        <div className="bg-gray-700 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            LungDetect AI was developed as a collaborative project to address the critical need for early 
            lung cancer detection. By combining our expertise in machine learning, software development, 
            and data science, we created a tool that assists medical professionals in analyzing chest 
            X-rays and CT scans.
          </p>
          <p className="text-gray-300">
            Our team worked together to research the latest advancements in medical image analysis, 
            collect and process relevant datasets, and develop an accurate machine learning model. 
            The result is a user-friendly interface that provides valuable insights while maintaining 
            high standards of accuracy and reliability.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Team;