import React from 'react';
const Template5 = ({ data = {} }) => {
  const {
    name = "",
    email = "",
    phone = "",
    portfolio = "",
    linkedin = "",
    github = "",
    education = [],
    experience = [],
  } = data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      <header className="mb-8 pb-4 border-b-2 border-gray-800">
        <h1 className="text-4xl font-bold text-center mb-4 break-words">{name}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span className="flex items-center">
            📧 <span className="break-all">{email}</span>
          </span>
          <span className="flex items-center">
            📞 <span className="break-all">{phone}</span>
          </span>
          
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {portfolio && <a href={data.portfolio} className="text-blue-600 hover:text-blue-800">Portfolio</a>}
          {linkedin && <a href={data.linkedin} className="text-blue-600 hover:text-blue-800">LinkedIn</a>}
          {github && <a href={data.github} className="text-blue-600 hover:text-blue-800">GitHub</a>}
        </div>
      </header>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2">Research Interests</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
          {data.summary || "No research interests provided."}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2">Education</h2>
        <div className="space-y-4">
          {education.length > 0 ? (
            education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
                  <h3 className="text-lg font-semibold break-words">{edu.degree || "N/A"}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap">{edu.date || "N/A"}</span>
                </div>
                <p className="text-gray-700 italic break-words">{edu.institution || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No education details available.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2">Experience</h2>
        <div className="space-y-4">
          {experience.length > 0 ? (
            experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
                  <h3 className="text-lg font-semibold break-words">{exp.role || "N/A"}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap">{exp.date || "N/A"}</span>
                </div>
                <p className="text-gray-700 break-words">{exp.description || "No description provided."}</p>
              </div>
            ))
          ) : (
            <p>No experience details available.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Research Methods</h3>
            <p className="text-gray-700">{data.skills.ReasearchMethods || "No research methods provided."}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Technical Skills</h3>
            <p className="text-gray-700">{data.skills.technical || "No technical skills provided."}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Template5;