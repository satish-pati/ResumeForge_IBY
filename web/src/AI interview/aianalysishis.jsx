import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../login/usercontext";
const Resumeanal = () => {
 
  const [analyses, setAnalyses] = useState([]);
  const {userId }= useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userId) return;
    const fetchAnalyses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://backend-1-61k2.onrender.com/api/interview-analysis/${userId}`);
        setAnalyses(response.data);
        setError("");
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Failed to load analyses. Please try again.";
        setError(errorMsg);
        console.error("Error fetching analyses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

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
              AI Interview History
            </h1>
            <p className="text-white mt-2">
                Track and manage your past Interview analyis
            </p>
        </div>
    </header>

    <h1 className="mb-5 text-3xl font-bold text-center mt-4"> AI Interview History</h1>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Resume Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job Role</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Job Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {analyses.length > 0 ? (
            analyses.map((analysis) => (
              <tr key={analysis._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{analysis.resumeName || "N/A"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{analysis.jobRole}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{analysis.jobDescription}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Link
  to={`/analysis/${analysis._id}`}
  state={{ analysis }} // Pass analysis data here
  style={{
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007BFF",
    padding: "5px 10px",
    borderRadius: "5px",
  }}
>
  View
</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No analyses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Resumeanal;
