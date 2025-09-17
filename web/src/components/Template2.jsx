import React from 'react';

const Template2 = ({ data }) => {
  return (
    <div className="w-full p-8 bg-white flex flex-col md:flex-row">
      <div className="md:w-1/3 md:pr-8 md:border-r border-gray-300">
        <header className="mb-8 page-break-inside-avoid">
          <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
          <p className="text-sm text-gray-600">{data.email}</p>
          <p className="text-sm text-gray-600">{data.phone}</p>
          <p className="text-sm text-gray-600">{data.location}</p>
        </header>
        
        <section className="mb-8 page-break-inside-avoid">
          <h2 className="text-xl font-semibold mb-4 uppercase">Skills</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Technical</h3>
            <p className="text-sm text-gray-600 break-words">{data.skills.technical}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Soft Skills</h3>
            <p className="text-sm text-gray-600 break-words">{data.skills.soft}</p>

          </div>
         
        </section>

        <section className="page-break-inside-avoid">
          <h2 className="text-xl font-semibold mb-4 uppercase">Links</h2>
          <p className="text-sm mb-2"><a href={data.portfolio} target="_blank" className="text-blue-600 hover:underline">Portfolio</a></p>
          <p className="text-sm mb-2"><a href={data.linkedin} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a></p>
          <p className="text-sm mb-2"><a href={data.github} target="_blank" className="text-blue-600 hover:underline">GitHub</a></p>
        </section>
      </div>
      
      <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
        <section className="mb-8 page-break-inside-avoid">
          <h2 className="text-xl font-semibold mb-4 uppercase">Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 uppercase">Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-6 page-break-inside-avoid">
              <h3 className="text-lg font-medium">{exp.role}</h3>
              <p className="text-xs text-gray-500">{exp.date}</p>
              <p className="text-sm mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 uppercase">Projects</h2>
          {data.projects.map((project, idx) => (
            <div key={idx} className="mb-6 page-break-inside-avoid">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-xs text-gray-500">{project.date}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{project.description}</p>
              <p className="text-sm mt-1"><a href={project.link} className="text-blue-600 hover:underline">Project Link</a></p>
              <p className="text-sm mt-1"><span className="font-medium">Technologies:</span> {project.technologies}</p>

            </div>
          ))}
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4 uppercase">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-6 page-break-inside-avoid">
              <h3 className="text-lg font-medium">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.date}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Template2;
