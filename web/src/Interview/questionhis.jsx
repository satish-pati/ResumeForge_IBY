import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../login/usercontext";
import { useNavigate } from "react-router-dom";
{/*import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../login/usercontext";

const QuestionsHistory = () => {
  const userId = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/interview-questions/${userId}`);
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!history.length) return <p>No history found!</p>;

  return (
    <div>
      <h2>Generated Questions History</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Resume Name</th>
            <th>Job Role</th>
            <th>Job Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.resumeName}</td>
              <td>{item.jobRole}</td>
              <td>{item.jobDescription}</td>
              <td>
                <Link to={`/questions/${item._id}`}>
                  <button>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsHistory;*/}
// HistoryPage.jsx
 // Import useNavigate
const QuestionsHistory = () => {
    const [history, setHistory] = useState([]);
   const { userId } = useUser();
   const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    // Fetch all analysis results for the user
    const fetchhis = async () => {
    axios
      .get(`https://backend-1-61k2.onrender.com/api/interview-questions/${userId}`)
      .then((response) => {
        setHistory(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching analysis results:", error));
    }
    fetchhis();

  }, []);

  return (
    <div className="bg-gray-800 min-h-screen p-6 text-white">
    <header className="bg-white/10 dark:bg-gray-700 shadow-md py-6">
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
              InterviewQuestions History
            </h1>
            <p className="text-white mt-2">
                Track and manage your past InterviewQuestions.
            </p>
        </div>
    </header>

    <h1 className="mb-5 text-3xl font-bold text-center mt-4">Cover Letter History</h1>

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
          {history.map((result) => (
            <tr key={result._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.resumeName || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.jobRole}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.jobDescription}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => navigate('/questions/:id', { state: { result } })} // Navigate to AnalysisDetailPage
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

export default QuestionsHistory;
