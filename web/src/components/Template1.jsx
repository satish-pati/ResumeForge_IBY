import React from "react";
const Template1 = ({ data }) => {
  return (
    <div >
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 break-words">{data.name}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center justify-center flex-wrap gap-2">
            <span className="flex items-center">
              <span className="break-all">{data.email}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              <span className="break-all">{data.phone}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              <span className="break-words">{data.location}</span>
            </span>
          </p>
          <p className="flex items-center justify-center flex-wrap gap-2">
            {data.portfolio && (
              <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Portfolio</a>
            )}
            <span className="hidden sm:inline">•</span>
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
            )}
            <span className="hidden sm:inline">•</span>
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">GitHub</a>
            )}
          </p>
        </div>
      </header>
      
      {/* Summary Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-300">Summary</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{data.summary}</p>
      </section>
      
      {/* Experience Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-1 border-b border-gray-300">Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
                <span className="text-sm text-gray-600 whitespace-nowrap">{exp.date}</span>
              </div>
              <p className="text-gray-700 italic break-words">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-1 border-b border-gray-300">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h3 className="text-lg font-semibold break-words">{edu.degree}</h3>
                <span className="text-sm text-gray-600 whitespace-nowrap">{edu.date}</span>
              </div>
              <p className="text-gray-700 italic break-words">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-1 border-b border-gray-300">Skills</h2>
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-gray-700">Technical Skills</h3>
            <p className="text-sm text-gray-600 break-words">{data.skills.technical}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Soft Skills</h3>
            <p className="text-sm text-gray-600 break-words">{data.skills.soft}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Languages</h3>
            <p className="text-sm text-gray-600 break-words">{data.languages}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template1;
