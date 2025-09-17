import React from "react";
import "./template4.css";

const Template4 = ({ data }) => {
  console.log(data)
  return (
    <div className="template4-container">
              <aside className="w-full md:w-64 bg-slate-800 p-6 md:p-8 text-white">

        <h1 className="sidebar-name">{data.name}</h1>
        <div className="contact">
          <h2>Contact</h2>
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
          <p>
            <a href={data.portfolio} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </p>
          <p>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={data.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
         </p>
         <section className="mt-8">
              <h2 className="text-lg font-bold mb-3">Skills</h2>
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-2">Technical</h3>
                <ul className="space-y-1 text-slate-400 text-sm">
                  {data.skills.technical.map((skill, index) => (
                    <li key={index} className="break-words">{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-2">Soft Skills</h3>
               <ul className="space-y-1 text-slate-400 text-sm">
                  {data.skills.soft.map((skill, index) => (
                    <li key={index} className="break-words">{skill}</li>
                  ))}                </ul>
              </div>
            </section>
      </div>
      </aside>
      <div className="main-content">
        <div className="section">
          <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">Profile</h2>
          <p>{data.summary || "Summary or Profile Description"}</p>
        </div>
        <div className="section">
          <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">Experience</h2>
          {data.experience?.length ? (
            data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.role || "Role"}</h3>
                <p>{exp.date || "Date"}</p>
                <p>{exp.description || "Description"}</p>
              </div>
            ))
          ) : (
            "Experience Details"
          )}
        </div>
        <div className="section">
          <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">Education</h2>
          {data.education?.length ? (
            data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree || "Degree"}</h3>
                <p>{edu.date || "Date"}</p>
                <p>{edu.institution || "Institution"}</p>
              </div>
            ))
          ) : (
            "Education Details"
          )}
        </div>
        <section className="projects">
      <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">Projects</h2>
          {data.projects.map((project, idx) => (
            <div>
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-xs text-gray-500">{project.date}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{project.description}</p>
              <p className="text-sm mt-1"><a href={project.link} className="text-blue-600 hover:underline">Project Link</a></p>
              <p className="text-sm mt-1"><span className="font-medium">Technologies:</span> {project.technologies}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Template4;
