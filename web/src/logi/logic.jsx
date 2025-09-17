import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const retreive = ({ userId }) => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    useEffect(() => {
      const fetchResumes = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/resumes/${userId}`);
          setResumes(response.data);
        } catch (error) {
          console.error('Error fetching resumes:', error);
        }
      };
      fetchResumes();
    }, [userId]);

return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Resume Analysis App</h1>
      {/* Render previously generated resumes */}
      <h2>Your Generated Resumes</h2>
      {resumes.length > 0 ? (
        resumes.map((resume) => (
          <div key={resume._id}>
            <h3>Template {resume.templateId}</h3>
            <button onClick={() => navigate(`/resume/${resume._id}`)}>View Resume</button>
          </div>
        ))
      ) : (
        <p>No resumes found.</p>
      )}
    </div>
  );
};

export default retreive;