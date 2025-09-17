import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoverLetterDetail = () => {
    const { id } = useParams();
    const [coverLetter, setCoverLetter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoverLetter = async () => {
            try {
                const response = await axios.get(`https://backend-1-61k2.onrender.com/api/coverletters/detail/${id}`);
                setCoverLetter(response.data);
            } catch (err) {
                setError('Error fetching cover letter: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };
        fetchCoverLetter();
    }, [id]);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div className="bg-gray-900 min-h-screen p-6 text-white flex flex-col items-center">
            <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center" style={{
                    background: "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Cover Letter Details
                </h1>
                <hr className="bg-gray-600 mb-4" />
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Job Role:</h2>
                    <p className="text-lg text-gray-300">{coverLetter?.jobRole}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Job Description:</h2>
                    <p className="text-lg text-gray-300">{coverLetter?.jobDescription}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Cover Letter:</h2>
                    <pre className="text-lg text-gray-300 whitespace-pre-wrap">{coverLetter?.coverLetter}</pre>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterDetail;
