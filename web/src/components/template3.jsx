import React from "react";
import "./template3.css";

const Template3 = ({ data }) => 
(
    <div className="template3-container">
<header className="bg-blue-950 p-8 text-white print:bg-blue-950 print:text-white">
<div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm">
                <div className="flex items-center gap-2">
                  <span>{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{data.location}</span>
                </div>
                <div className="links ml-40">
    <a href={data.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a> •  <a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> •  <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>
  </div>
              </div>
            </div>
          </header>


      <section className="summary">
        <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200"> Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      <section className="experience">
        <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">Experience</h2>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="experience-item">
            <h3>{exp.role}</h3>
            <p>{exp.date}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="education">
        <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">Education</h2>
        {data.education.map((edu, idx) => (
          <div key={idx} className="education-item">
            <h3>{edu.degree}</h3>
            <p>{edu.date}</p>
            <p>{edu.institution}</p>
          </div>
        ))}
      </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b border-slate-200">
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Technical Skills</h3>
                  <p className="text-gray-700">{data.skills.technical}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Soft Skills</h3>
                  <p className="text-gray-700">{data.skills.soft}</p>
                </div>
 
              </div>
            </section>


      
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
  );

export default Template3;
