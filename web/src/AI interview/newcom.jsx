import React, { useState, useEffect,useRef,useContext  } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../login/usercontext";
import { useInterviewContext } from "./interviewcon";
const NewAiInterview = () => {
    const navigate=useNavigate();
    const { jobRole, setJobRole, jobDescription, setJobDescription, length, setLength } =
    useInterviewContext();

    
      const handleAiclick=()=>{
        navigate("/AiInterview")
      }
      
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
            onClick={handleAiclick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
            style={{
              width: "100%",
              background:
                "linear-gradient(90deg,  rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
            }}
          >
            Generate
          </button>
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
        
          </div>
        </div>
      </div>
    );
};
export default NewAiInterview;