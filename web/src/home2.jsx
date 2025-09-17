import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./login/usercontext";


        
const Footer = () => {
  return (
    <footer id="about" className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-6">
        {/* First Line */}
        <div className="flex flex-col md:flex-row justify-between items-center  mb-4">
          <div className="text-center md:text-left ">
            <h1 className="text-xl font-bold">Elite Resume</h1>
            <p className="text-sm mt-2">
              Empower your career with EliteResume –smart design, strong impact
            </p>
          </div>
          <div className="ml-16 px-16">
          <a
            href="#about"
            className="text-lg font-semibold hover:text-gray-400 ml-20 px-10"
          >
            About Us
          </a>
          </div>
          <div className="text-center md:text-right md:ml-auto ">
            <a
              href="#contact"
              className="text-lg font-semibold hover:text-gray-400 mr-10"
            >
              Contact Us
            </a>
            <ul className="text-sm mt-2">
              <li>Email: EliteResume@gmail.com</li>
              <li>Phone: +91 6281395878</li>
              <li>Location: IIT Tirupati, India</li>
            </ul>
          </div>
        </div>

        {/* Second Line - Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://linkedin.com/company" aria-label="LinkedIn">
            <svg
              className="h-6 w-6 text-white hover:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.96 0-1.73-.78-1.73-1.73s.78-1.73 1.73-1.73 1.73.78 1.73 1.73-.78 1.73-1.73 1.73zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.98v5.69h-3v-10h2.88v1.37h.04c.4-.76 1.36-1.56 2.79-1.56 2.99 0 3.55 1.97 3.55 4.53v5.66z" />
            </svg>
          </a>
          <a href="https://github.com" aria-label="GitHub">
            <svg
              className="h-6 w-6 text-white hover:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.799 8.205 11.385.6.111.82-.26.82-.578 0-.287-.011-1.244-.016-2.254-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.089-.745.082-.729.082-.729 1.205.085 1.838 1.24 1.838 1.24 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.304.76-1.604-2.665-.304-5.467-1.332-5.467-5.932 0-1.31.465-2.382 1.235-3.222-.124-.303-.535-1.521.116-3.169 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.648.241 2.866.118 3.169.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.479 5.921.43.371.812 1.104.812 2.227 0 1.607-.015 2.904-.015 3.299 0 .32.217.694.824.576 4.765-1.588 8.199-6.085 8.199-11.384 0-6.63-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
  <svg
    className="h-6 w-6 text-white hover:text-pink-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.317.974.975 1.255 2.242 1.317 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.343 2.633-1.317 3.608-.975.974-2.242 1.255-3.608 1.317-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.343-3.608-1.317-.974-.975-1.255-2.242-1.317-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.343-2.633 1.317-3.608.975-.974 2.242-1.255 3.608-1.317 1.266-.058 1.646-.069 4.85-.069m0-2.163c-3.259 0-3.667.014-4.947.072-1.502.066-2.77.378-3.76 1.368-.99.99-1.302 2.258-1.368 3.76-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.066 1.502.378 2.77 1.368 3.76.99.99 2.258 1.302 3.76 1.368 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.502-.066 2.77-.378 3.76-1.368.99-.99 1.302-2.258 1.368-3.76.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.066-1.502-.378-2.77-1.368-3.76-.99-.99-2.258-1.302-3.76-1.368-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.207 0-4-1.793-4-4s1.793-4 4-4 4 1.793 4 4-1.793 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
  </svg>
</a>

<a href="https://twitter.com" aria-label="Twitter">
  <svg
    className="h-6 w-6 text-white hover:text-blue-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.043.76.127 1.122-4.09-.205-7.719-2.165-10.148-5.144-.423.727-.666 1.571-.666 2.475 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.829-.413.112-.849.171-1.296.171-.317 0-.626-.031-.928-.089.627 1.956 2.444 3.377 4.6 3.417-1.685 1.32-3.809 2.106-6.115 2.106-.397 0-.788-.023-1.175-.069 2.179 1.396 4.768 2.211 7.548 2.211 9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636.961-.694 1.797-1.562 2.457-2.549z" />
  </svg>
</a>

<a href="https://facebook.com" aria-label="Facebook">
  <svg
    className="h-6 w-6 text-white hover:text-blue-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.325 1.325 1.325h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.314h3.59l-.467 3.622h-3.123v9.294h6.127c.733 0 1.325-.592 1.325-1.325v-21.351c0-.733-.592-1.325-1.325-1.325z" />
  </svg>
</a>

        </div>

        {/* Third Line - Copyright */}
        <div className="mt-8 text-center mt-4 text-sm">
          © 2025 Elite Resume. All rights reserved.
        </div>
      </div>
    </footer>
  );
};



const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useUser(); // Access logout function

    const handleLogout = () => {
        logout(); // Clear user state
        localStorage.removeItem("token"); // Remove stored token
        navigate("/"); // Redirect to login page
    };

    return (
        <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
            <h1 className="text-2xl font-bold">EliteResume</h1>
            <div className="flex justify-end items-center space-x-8 ml-auto mr-6">
                <a href="/home2" className="text-lg font-semibold hover:text-gray-400">Home</a>
                <a href="#features" className="text-lg font-semibold hover:text-gray-400">Features</a>
                <a href="#about" className="text-lg font-semibold hover:text-gray-400">About Us</a>
                <a href="#about" className="text-lg font-semibold hover:text-gray-400">Contact</a>
                <a href="/profile" className="text-lg font-semibold hover:text-gray-400">Profile</a>

                <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600" title="Logout"
                    onClick={handleLogout} // Handle logout on click
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M11 3a1 1 0 011-1h4a1 1 0 011 1v14a1 1 0 01-1 1h-4a1 1 0 01-1-1V3z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

  
const JobSearchFeatures = () => {
     const navigate = useNavigate();
      const handleATSClick = () => {
        navigate("/uploadresumeATS");
      };
      const handleBotClick = () => {
        navigate("/uploadresumebot");
      };
      const handleIClick = () => {
        navigate("/uploadresumeinterview");
      };
    const handleAIClick = () => {
        navigate("/uploadresume");
      };
      const handleCLClick = () => {
        navigate("/uploadresumecl");
      };
      const handleRGClick = () => {
        navigate("/temphome");
      };
      const handlePClick = () => {
        navigate("/res");
      };
      const handleCHClick = () => {
        navigate("/coverletterhis");
      };
      const handleAhClick = () => {
        navigate("/atshis");
      };
      const handleiqClick = () => {
        navigate("/history");
      };
      const handleAIHClick = () => {
        navigate("/aihist");
      };
    return (
      <div className="text-white bg-gray-800 min-h-screen w-full px-4 py-12 sm:px-6 lg:px-8">
        <Navbar />
        
        <div className="pt-20 text-center mb-8 mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Boost Your Job Search Productivity
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Utilize AI-powered tools to enhance your job search, from resume building to interview preparation.
          </p>
        </div>
  
        {/* Feature Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
        <Footer />

      </div>
    );
  };
  
const FeatureCard = ({ feature }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br ${feature.bgColor} p-6 flex flex-col justify-between h-full`}>  
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
        <p className="text-white/80 mb-6">{feature.description}</p>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <a className="inline-flex items-center rounded-md bg-white/80 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100" href={feature.link}> 
          {feature.buttonText}
        </a>
        <a className="text-sm font-semibold text-white flex items-center" href={feature.historyLink}>
          View History
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
      
    </div>
    
  );
};

const features = [
  { 
    title: "AI Interview Assistant", 
    description: "Simulate interviews with AI, get feedback, and refine your responses to excel in job interviews.", 
    link: "/uploadresume", 
    buttonText: "Start Practicing", 
    historyLink: "/aihist", 
    bgColor: "from-purple-600 to-blue-600" 
  },
  { 
    title: "AI Cover Letter Generator", 
    description: "Generate personalized cover letters that align with job descriptions, making your application stand out.", 
    link: "/uploadresumecl", 
    buttonText: "Generate Cover Letter", 
    historyLink: "/coverletterhis", 
    bgColor: "from-green-600 to-teal-600" 
  },
  { 
    title: "Resume Scorer & Recommendations", 
    description: "Get instant AI-powered resume analysis and suggestions to optimize your job application.", 
    link: "/uploadresumeATS", 
    buttonText: "Score My Resume", 
    historyLink: "/atshis", 
    bgColor: "from-orange-600 to-red-600" 
  },
  { 
    title: "AI Career Coach", 
    description: "Receive expert career guidance based on your skills, industry trends, and job aspirations.", 
    link: "/uploadresumebot", 
    buttonText: "Get Career Advice", 
    historyLink: "/career-coach/history", 
    bgColor: "from-indigo-600 to-cyan-600" 
  },
  { 
    title: "Interview Questions Generator", 
    description: "Generate job-specific interview questions tailored to your field, experience level, and industry.", 
    link: "/uploadresumeinterview", 
    buttonText: "Generate Questions", 
    historyLink: "/history", 
    bgColor: "from-pink-600 to-purple-600" 
  },
  { 
    title: "Resume Builder", 
    description: "Create a professional resume effortlessly with AI-powered templates and customization options.", 
    link: "/temphome", 
    buttonText: "Build My Resume", 
    historyLink: "/res", 
    bgColor: "from-blue-600 to-green-600" 
  }
];

export default JobSearchFeatures;
