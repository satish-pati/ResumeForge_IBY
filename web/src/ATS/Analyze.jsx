import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../login/usercontext";
import AnalyzeChart from "./comp";

const AnalyzeResume = () => {
  const { userId } = useUser();
  const [error, setError] = useState("");
   const [length, setLength] = useState('normal');
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [scores, setScores] = useState({});
  const [overallScore, setOverallScore] = useState(0);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [impactfulPhrases, setImpactfulPhrases] = useState([]);
  const [weakPhrases, setWeakPhrases] = useState([]);
  const [presentSkills, setPresentSkills] = useState([]);
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [ifb, setIfb] = useState([]);

  const handleAnalyze = async () => {
    const resumeName = localStorage.getItem("uploadedResumeName");
  
    if (!jobDescription || !resumeName) {
      alert("Please provide a job description!");
      return;
    }
  
    try {
      const response = await axios.post("https://res-1-7uph.onrender.com/analyze", {
        job_role: jobRole,
        job_description: jobDescription,
      });
  
      const parsedData = response.data;
      // Update state with received data
      setRecommendations(parsedData.actionrecomendation);
      setScores(parsedData.scores);
      setOverallScore(parsedData.scores["Overall Score"] || 0);
      setMatchedKeywords(parsedData.MatchedKeywords);
      setMissingKeywords(parsedData.MissingKeywords);
      setImpactfulPhrases(parsedData.ImpactfulPhrases);
      setWeakPhrases(parsedData.WeakPhrases);
      setPresentSkills(parsedData.PresentSkills);
      setRecommendedSkills(parsedData.RecommendedSkills);
      setIfb(parsedData.IndustrySpecificFeedback);
  
      // Use updated values AFTER setting the state
      setTimeout(async () => {
        await axios.post("https://backend-1-61k2.onrender.com/api/analysis-results", {
          userId,
          resumeName,
          jobRole,
          jobDescription,
          scores: parsedData.scores, // Use response data instead of state
          overallScore: parsedData.scores["Overall Score"] || 0,
          matchedKeywords: parsedData.MatchedKeywords,
          missingKeywords: parsedData.MissingKeywords,
          impactfulPhrases: parsedData.ImpactfulPhrases,
          weakPhrases: parsedData.WeakPhrases,
          presentSkills: parsedData.PresentSkills,
          recommendedSkills: parsedData.RecommendedSkills,
          ifb: parsedData.IndustrySpecificFeedback,
          recom:parsedData.actionrecomendation
        });
  
        alert("Analysis data saved successfully!");
      }, 500); // Delay to ensure state updates
    } catch (error) {
      setError(error.response?.data?.error || "Failed to analyze or save data.");
      alert(error.response?.data?.error || "Failed to analyze or save data.");
    }
  };
  
  const renderList = (title, items) => (
    <div>
      <h4 className="font-bold mb-2 text-lg">{title}</h4>
      <ul className="list-disc pl-6">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-gray-900 flex min-h-screen">
      {/* Left Section */}
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
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white  block w-full p-2 border rounded mt-2"
          />
        </label>
        <textarea
          rows="6"
          placeholder="Enter the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white bo w-full p-2 border rounded mb-4 bg-gray-700"
        />
        <button
          onClick={handleAnalyze}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{width: "100%",
            background:
              "linear-gradient(90deg,  rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)" }}
        >
          Analyze
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      {/* Right Section */}
      <div
        className="w-[55%] flex-1 p-6 overflow-y-auto text-white"
        style={{ marginLeft: "45%" }}
      >
        <div >
          <div mb-1>
          <h3 className=" text-2xl font-bold mb-4 " style={{
          background:
            "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Analysis Results</h3></div>
        <hr className="bg-gray-600 "></hr>
          <div className="mb-8">
            <h4 className="font-bold text-lg mb-2">Overall Score</h4>
            <div className="relative h-4 bg-gray-700 rounded-full">
              <div
                className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden"
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
            <p className="mt-2 text-white">{overallScore} / 100</p>
          </div>
          <div className="mb-14 ml-0">
            <AnalyzeChart scores={scores} />
          </div>
          <div className="mb-8">
            <h4 className="font-bold text-lg mb-2">Overall Match</h4>
            <div className="relative h-4 bg-gray-700 rounded">
              <div
                className="absolute top-0 h-4 bg-green-500 rounded"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(225,255,64,1) 0%, rgb(35, 210, 41) 100%)",
                  width: `${scores["Overall Match"]}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-gray-200">{scores["Overall Match"]} %</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {renderList("Matched Keywords", matchedKeywords)}
            {renderList("Missing Keywords", missingKeywords)}
          </div>
          <div className="mb-8">
            <h4 className="font-bold text-lg mb-2">Readability Score</h4>
            <div className="relative h-4 bg-gray-700 rounded">
              <div
                className="absolute top-0 h-4 bg-green-500 rounded"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(225,255,64,1) 0%, rgb(35, 210, 41) 100%)",
                  width: `${scores["Readability Score"]}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-gray-200">{scores["Readability Score"]} / 100</p>
          </div>
          <div className="mb-8">
            <h4 className="font-bold text-lg mb-2">ATS Compatibility Score</h4>
            <div className="relative h-4 bg-gray-700 rounded">
              <div
                className="absolute top-0 h-4 bg-green-500 rounded"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(225,255,64,1) 0%, rgb(35, 210, 41) 100%)",
                  width: `${scores["ATS Compatibility Score"]}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-gray-200">
              {scores["ATS Compatibility Score"]} / 100
            </p>
          </div>
  
          <div className="grid grid-cols-2 gap-6 mt-6">
            {renderList("Present Skills", presentSkills)}
            {renderList("Recommended Skills", recommendedSkills)}
          </div>
  
          <div className="grid grid-cols-2 gap-6 mt-6">
            {renderList("Impactful Phrases", impactfulPhrases)}
            {renderList("Weak Phrases", weakPhrases)}
          </div>
  
          <div className="mt-8">
            {renderList("Recommendations", recommendations)}
          </div>
          <div className="mt-8">
            {renderList("Industry-SpecificFeedback", ifb)}
          </div>

        </div>
      </div>
    </div>
  );
  
  
};

export default AnalyzeResume;
