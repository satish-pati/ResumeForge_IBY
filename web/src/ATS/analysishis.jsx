import React from 'react';
import { useLocation } from 'react-router-dom';
import AnalyzeChart from "./comp";

const AnalysisDetailPage1 = () => {
  const { state } = useLocation();
  const result = state?.result || {}; // Ensure result is always an object
  const scores = result?.scores || {}; // Ensure scores exist

  console.log("Analysis Result:", result);

  // Utility function to safely render lists
  const renderList = (title, items = []) => (
    <div>
      <h4 className="font-bold mb-2 text-lg">{title}</h4>
      {items.length > 0 ? (
        <ul className="list-disc pl-6">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No data available.</p>
      )}
    </div>
  );

  return (

    <div className="bg-gray-900 flex min-h-screen">
      <div
        className="w-[45%] p-6 bg-gray-900 border-r h-full overflow-y-auto fixed"
        style={{ height: "100vh" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-white"
        style={{
          background:
            "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        >Resume Scorer</h1>
        <hr className="bg-gray-600 mt-0.5"></hr>
        <label className="block mb-2 font-semibold text-white">
          Job Role:
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
    <div className=" w-[100%] flex-1 p-6 overflow-y-auto text-white" style={{ marginLeft: "45%" }}>
      <div>
        <h3
          className="text-2xl font-bold mb-4"
          style={{
            background: "linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Analysis Results
        </h3>
        <hr className="bg-gray-600" />

        {/* Overall Score */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-2">Overall Score</h4>
          <div className="relative h-4 bg-gray-700 rounded-full">
            <div
              className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden"
              style={{ width: `${scores["Overall Score"] || 0}%` }}
            ></div>
          </div>
          <p className="mt-2 text-white">{scores["Overall Score"] || 0} / 100</p>
        </div>

        {/* Analysis Chart */}
        <div className="mb-14 ml-0">
          <AnalyzeChart scores={scores} />
        </div>

        {/* Overall Match */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-2">Overall Match</h4>
          <div className="relative h-4 bg-gray-700 rounded">
            <div
              className="absolute top-0 h-4 bg-green-500 rounded"
              style={{
                background: "linear-gradient(90deg, rgba(225,255,64,1) 0%, rgb(35, 210, 41) 100%)",
                width: `${scores["Overall Match"] || 0}%`,
              }}
            ></div>
          </div>
          <p className="mt-2 text-gray-200">{scores["Overall Match"] || 0}%</p>
        </div>

        {/* Keyword Matches */}
        <div className="grid grid-cols-2 gap-6">
          {renderList("Matched Keywords", result.matchedKeywords)}
          {renderList("Missing Keywords", result.missingKeywords)}
        </div>

        {/* Readability Score */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-2">Readability Score</h4>
          <div className="relative h-4 bg-gray-700 rounded">
            <div
              className="absolute top-0 h-4 bg-green-500 rounded"
              style={{
                background: "linear-gradient(90deg, rgba(225,255,64,1) 0%, rgb(35, 210, 41) 100%)",
                width: `${scores["Readability Score"] || 0}%`,
              }}
            ></div>
          </div>
          <p className="mt-2 text-gray-200">{scores["Readability Score"] || 0} / 100</p>
        </div>

        {/* ATS Compatibility Score */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-2">ATS Compatibility Score</h4>
          <div className="relative h-4 bg-gray-700 rounded">
            <div
              className="absolute top-0 h-4 bg-green-500 rounded"
              style={{
                background: "linear-gradient(90deg, rgba(225,255,64,1) 0%, rgb(35, 210, 41) 100%)",
                width: `${scores["ATS Compatibility Score"] || 0}%`,
              }}
            ></div>
          </div>
          <p className="mt-2 text-gray-200">{scores["ATS Compatibility Score"] || 0} / 100</p>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {renderList("Present Skills", result.presentSkills)}
          {renderList("Recommended Skills", result.recommendedSkills)}
        </div>

        {/* Phrases */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {renderList("Impactful Phrases", result.impactfulPhrases)}
          {renderList("Weak Phrases", result.weakPhrases)}
        </div>

        {/* Recommendations */}
        <div className="mt-8">{renderList("Recommendations", result.recom)}</div>

        {/* Industry-Specific Feedback */}
        <div className="mt-8">{renderList("Industry-Specific Feedback", result.ifb)}</div>
      </div>
    </div>
    </div>
  );
};

export default AnalysisDetailPage1;
