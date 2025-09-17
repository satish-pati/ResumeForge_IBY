import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
  const buttonStyles = {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "5px", // Optional for rounded buttons
    backgroundColor: "#4CAF50", // Optional for a green button background
    color: "white", // Optional for white text
    border: "none", // Removes border
    cursor: "pointer",}
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Resume Analysis App</h1>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleATSClick}
        style={buttonStyles}
      >
        ATS Analysis
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleBotClick}
        style={buttonStyles}
      >
        Chatbot
      </button>
      <button
        className="focus:outline-none focus:ring-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleIClick}
        
      >
        Interview Ques
      </button>
     

      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleAIClick}
        style={buttonStyles}
      >
        Ai Interview
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleCLClick}
        style={buttonStyles}
      >
        CL
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleRGClick}
        style={buttonStyles}
      >
        RG
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handlePClick}
        style={buttonStyles}
      >
        Prof
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleCHClick}
        style={buttonStyles}
      >
        CH
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleAhClick}
        style={buttonStyles}
      >
        Ah
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleiqClick}
        style={buttonStyles}
      >
        iq
      </button>
      <button
        className="focus:outline-none focus:ring-0"
        onClick={handleAIHClick}
        style={buttonStyles}
      >
        AIH
      </button>
    </div>
  );
};

export default Home;
