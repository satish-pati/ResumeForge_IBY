// HistoryPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../login/usercontext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const HistoryPage = () => {
  const [analysisResults, setAnalysisResults] = useState([]);
   const { userId } = useUser();
   console.log("userId before request:", userId);

   const navigate = useNavigate(); // Initialize useNavigate
   useEffect(() => {
    console.log("userId before request:", userId); // Debugging step
  
    if (!userId) {
      console.error("Error: userId is undefined or invalid");
      navigate("/login"); // Redirect to login if userId is missing
      return;
    }
  
    const fetchhis = async () => {
      try {
        const response = await axios.get(`https://backend-1-61k2.onrender.com/api/analysis-results/${userId}`);
        setAnalysisResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching analysis results:", error);
      }
    };
  
    fetchhis();
  }, [userId, navigate]);  // Run when userId changes
  return (
    <div className="bg-gray-800 min-h-screen p-6 text-white">
    <header className="mb-2 bg-white/10 dark:bg-gray-700 shadow-md py-6">
        <div className="container mx-auto px-4">
            <h1
                className="text-3xl font-bold"
                style={{
                    background:
                        "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                ATS analysis History
            </h1>
            <p className="text-white mt-2">
                Track and manage your past ATS Analysis.
            </p>
        </div>
    </header>

    <h1 className="mb-5 text-3xl font-bold text-center mt-4"> ATS analysis History</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Resume Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job Role</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {analysisResults.map((result) => (
            <tr key={result._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.resumeName || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.jobRole}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.jobDescription}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => navigate('/analysis-detail', { state: { result } })} // Navigate to AnalysisDetailPage
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "#FFF",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
