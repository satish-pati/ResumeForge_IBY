import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../login/usercontext";

const InterviewQuestionGenerate = () => {
  const { userId } = useUser();
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState("");
  const [jobRole, setJobRole] = useState('');
  const [error, setError] = useState("");
  const [length, setLength] = useState('Technical');
  const resumeName = localStorage.getItem("uploadedResumeName"); // Retrieve the file name

  const handleGenerateQuestions = async () => {
    if (!jobDescription) {
      alert("Please provide a job description!");
      return;
    }
    var response;
    try {
      if (length == 'Technical') {
        response = await axios.post("https://res-1-7uph.onrender.com/generate_techquestions", {
          job_role: jobRole,
          job_description: jobDescription,
        });
      } else {
        response = await axios.post("https://res-1-7uph.onrender.com/generate_hrquestions", {
          job_role: jobRole,
          job_description: jobDescription,
        });

      }
      setQuestions(response.data.questions);
      const generatedQuestions = response.data.questions;
      // Save generated questions to MongoDB
      await axios.post("https://backend-1-61k2.onrender.com/api/interview-questions", {
        userId,
        resumeName,
        jobRole,
        jobDescription,
        questions: generatedQuestions,
      });
    } catch (error) {
      alert(error.response?.data?.error || "Question generation failed!");
    }
  };

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
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white  block w-full p-2 border rounded mt-2"
          />
        </label>
        <label className="block mb-2 font-semibold text-white">
          Question Type
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="drop-shadow-md  font-semibold leading-6 text-white bo w-full p-2 border rounded mb-4 bg-gray-700"
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
          </select>
        </label>

        <textarea
          rows="6"
          placeholder="Enter the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white bo w-full p-2 border rounded mb-4 bg-gray-700"
        />
        <button
          onClick={handleGenerateQuestions}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg,  rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
          }}
        >
          Generate
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
          {questions && (
            <div className="text-white" style={{ marginTop: "20px" }}>
              <h3>Generated Interview Questions:</h3>
              {formatQuestions(questions)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionGenerate;
