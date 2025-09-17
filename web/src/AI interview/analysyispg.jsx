import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnalysisDetailPage = () => {
  const { state } = useLocation(); // Use location state
  const { id } = useParams(); // Use ID if state is unavailable
  const [analysis, setAnalysis] = useState(state?.analysis || null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!state?.analysis); // Skip loading if state exists

  useEffect(() => {
    if (!analysis) {
      const fetchAnalysisDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://backend-1-61k2.onrender.com/api/interview-analysis/${id}`);
          setAnalysis(response.data);
          setError("");
        } catch (error) {
          const errorMsg = error.response?.data?.message || "Failed to load analysis details.";
          setError(errorMsg);
          console.error("Error fetching analysis details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnalysisDetails();
    }
  }, [id, analysis]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Analysis Details</h1>
      {analysis ? (
        <div>
          <p><strong>Resume Name:</strong> {analysis.resumeName || "N/A"}</p>
          <p><strong>Job Role:</strong> {analysis.jobRole || "N/A"}</p>
          <p><strong>Job Description:</strong> {analysis.jobDescription || "N/A"}</p>
          <h3>Results:</h3>
          {analysis.results && analysis.results.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Question</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Answer</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Analysis</th>
                </tr>
              </thead>
              <tbody>
                {analysis.results.map((result, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.question}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.answer}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.analysis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results available.</p>
          )}
        </div>
      ) : (
        <p>Analysis not found.</p>
      )}
    </div>
  );
};

export default AnalysisDetailPage;
