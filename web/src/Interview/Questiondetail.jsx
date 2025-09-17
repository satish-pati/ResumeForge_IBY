import React from "react";
import { useLocation } from "react-router-dom";

const ViewQuestions = () => {
  const location = useLocation();
  const { result } = location.state || {}; // Access the data passed through state

  if (!result) {
    return <p>No data found! Please go back and select a valid item.</p>;
  }
  
  const formatQuestions = (questions) => {
    if (!questions) return null;
    return (
      <ul className="text-white">
        {questions.map((q, index) => (

          <li
            key={index}
            style={{ marginBottom: "20px" }} // Separate each question-answer pair
          >
            <span
              className={index % 2 !== 0 ? "text-lg font-light" : "text-lg font-bold"}
              style={{ display: "block", marginBottom: "10px" }} // Bold and larger text for questions
            >
              {q.replace(/\*/g, "").trim()}
            </span>
            {index % 2 !== 0 && <hr style={{ border: "1px solid #fff", margin: "10px 0" }} />}

          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-gray-900 flex min-h-screen">
      {/* Left Section */}
      <div
        className="w-[45%] p-6 bg-gray-900 border-r h-full overflow-y-auto fixed"
        style={{ height: "100vh" }}
      >
        <h1
          className="text-3xl font-bold mb-4 text-white"
          style={{
            background:
              "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Generate Questions
        </h1>
        <hr className="bg-gray-600 mt-0.5"></hr>
        <label className="block mb-2 font-semibold text-white">
          Job Role
          <input
            type="text"
            value={result.jobRole}
            className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white  block w-full p-2 border rounded mt-2"
          />
        </label>
        
        <textarea
          rows="6"
          placeholder="Enter the job description here..."
          value={result.jobDescription}
          className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white bo w-full p-2 border rounded mb-4 bg-gray-700"
        />
       
      </div>
      {/* Right Section */}
      <div
        className="w-[55%] flex-1 p-6 overflow-y-auto text-white"
        style={{ marginLeft: "45%" }}
      >
        <div>
          <div mb-1>
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                background:
                  "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Interview Questions
            </h3>
          </div>
          <hr className="bg-gray-600"></hr>
          {result.questions && (
            <div className="text-white" style={{ marginTop: "20px" }}>
              <h3>Generated Interview Questions:</h3>
              {formatQuestions(result.questions)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuestions;
