import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../login/usercontext';
import { useNavigate } from "react-router-dom";

const CoverLetterHistory = () => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [coverLetters, setCoverLetters] = useState([]);
    useEffect(() => {
        const fetchCoverLetters = async () => {
            try {
                const response = await axios.get(`https://backend-1-61k2.onrender.com/api/coverletters/${userId}`);
                setCoverLetters(response.data);
            } catch (error) {
                alert('Error fetching cover letters: ' + error.message);
            }
        };
        fetchCoverLetters();
    }, [userId]);

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
                        CoverLetter History
                    </h1>
                    <p className="text-white mt-2">
                        Track and manage your past cover letters.
                    </p>
                </div>
            </header>

            <h1 className="text-3xl font-bold text-center mt-4">Cover Letter History</h1>

            {coverLetters.length === 0 ? (
                <p className="text-center mt-4">No cover letters found.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-600 p-2">Job Role</th>
                                <th className="border border-gray-600 p-2">Job Description</th>
                                <th className="border border-gray-600 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coverLetters.map((letter) => (
                                <tr key={letter._id} className="text-center hover:bg-gray-600">
                                    <td className="border border-gray-600 p-2">{letter.jobRole}</td>
                                    <td className="border border-gray-600 p-2">{letter.jobDescription}</td>
                                    <td className="border border-gray-600 p-2">
                                        <button 
                                            className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => navigate(`/coverdet/${letter._id}`)}
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

export default CoverLetterHistory;
