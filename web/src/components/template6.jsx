import React from "react";
import "./template6.css";

const Template6 = ({ data }) => {
  return (
    <div className="resume-template">
      {/* Header Section */}
      <header className="resume-header"  style={{ backgroundColor: "#1a3e81" }}>
        <div className="header-left">
          <h1>{data.name || "Your Name"}</h1>
          <p className="contact">
            {data.email || "youremail@example.com"} • {data.phone || "1234567890"} • {data.location || "Your Location"}
          </p>
        </div>
        <div className="header-right">
          <a href={data.linkedin || "#"} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={data.github || "#"} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={data.portfolio || "#"} target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="section">
        <h2>Executive Summary</h2>
        <p>{data.summary || "Your brief summary goes here."}</p>
      </section>

      {/* Professional Experience */}
      <section className="section">
        <h2>Professional Experience</h2>
        {data.experience?.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.company || "Company Name"}</h3>
            <p className="job-title">{exp.role || "Job Title"}</p>
            <p>{exp.description || "Brief description of your role and achievements."}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="section">
        <h2>Education</h2>
        {data.education?.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.institution || "Institution Name"}</h3>
            <p className="degree">{edu.degree || "Degree Name"}</p>
            <p>{edu.details || "Details about your education."}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="section">
        <h2>Skills & Expertise</h2>
        <div className="skills">
          <div className="skills-category">
            <h3>Technical Skills</h3>
            <p>{data.technicalSkills || "List your technical skills."}</p>
          </div>
          <div className="skills-category">
            <h3>Soft Skills</h3>
            <p>{data.softSkills || "List your soft skills."}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template6;
