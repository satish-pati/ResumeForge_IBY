import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import { useUser } from "./login/usercontext";
import Render1 from "./Render/render1";

const ResumesPage = () => {
    const [resumes, setResumes] = useState([]);
    const { userId } = useUser(); // Get the logged-in user's ID
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Navigation hook
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get(`https://backend-1p2y.onrender.com/api/resumes/${userId}`);
                setResumes(response.data);
            } catch (err) {
                setError("Failed to fetch resumes. Please try again.");
            }
        };
        if (userId) {
            fetchResumes();
        }
    }, [userId]);

    const handleResumeClick = (resume) => {
        const { templateId, formData } = resume;

        // Dynamically navigate to the appropriate resume generation page
        navigate(`/Render${templateId}`, { state: { formData } });
    };
    const { logout } = useUser(); // Access the logout function from context

    const handleLogout = () => {
        logout(); // Clear user context or session
        // Optionally clear localStorage if you stored a token
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/"); // Redirect to the login page
    };

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
            RESUME HISTORY
          </h1>
          <p className="text-white mt-2">
          Every resume you've crafted, saved in one place
          </p>
        </div>
      </header>
          <div className="flex justify-end">
           
          </div>
          <h1 className="text-3xl font-bold text-center mt-4">Resume History</h1>
    
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    
          {resumes.length === 0 ? (
            <p className="text-center mt-4">No resumes found. Create one now!</p>
          ) : (
            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 p-2">Name</th>
                    <th className="border border-gray-600 p-2">Created Date</th>
                    <th className="border border-gray-600 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resumes.map((resume) => (
                    <tr key={resume._id} className="text-center hover:bg-gray-600">
                      <td className="border border-gray-600 p-2">
                        {resume.formData.name || `Resume ${resume._id}`}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {resume.createdAt.split("T")[0]} 
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button 
                          onClick={() => handleResumeClick(resume)}
                          className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
};

export default ResumesPage;
