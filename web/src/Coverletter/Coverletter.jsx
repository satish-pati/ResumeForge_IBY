// React Component: CoverLetter.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../login/usercontext';
const CoverLetter = () => {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState("");
    const [length, setLength] = useState('normal'); // Added state for length
  const [generatedLetter, setGeneratedLetter] = useState('');
  const { userId } = useUser();

  const handleGenerate = async () => {
    try {
      const response = await axios.post('https://res-1-7uph.onrender.com/generate_cover_letter', {
        job_role: jobRole,
        job_description: jobDescription,
        company_name: companyName, length,
      });
      const coverLetter = response.data.cover_letter;
      setGeneratedLetter(response.data.cover_letter);
      // Save the cover letter in the database
    await axios.post('https://backend-1-61k2.onrender.com/api/coverletters', {
      userId: userId, // Replace with actual user ID from context
      jobRole,
      jobDescription,
      coverLetter,
    });
    } catch (error) {
      alert('Error generating cover letter: ' + (error.response?.data?.error || error.message));
    }
  };
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
          Coverletter Generator
        </h1>
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
        <label className="block mb-2 font-semibold text-white">
        Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="drop-shadow-md bg-white/10 font-semibold leading-6 text-white  block w-full p-2 border rounded mt-2"
          />
        </label>

        <label className="block mb-2 font-semibold text-white">
          Cover Letter Length:
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="drop-shadow-md  font-semibold leading-6 text-white bo w-full p-2 border rounded mb-4 bg-gray-700"
          >
            <option value="small">Small</option>
            <option value="normal">Normal</option>
            <option value="large">Lengthy</option>
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
          onClick={handleGenerate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg,  rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
          }}
        >
          Generate
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
              Generated CoverLetter
            </h3>
          </div>
          <hr className="bg-gray-600"></hr>
          {generatedLetter && (
        <div>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{generatedLetter}</pre>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
