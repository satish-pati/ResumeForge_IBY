/*import "./template1.css";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [{ role: "", date: "", description: "" }],
    education: [{ degree: "", date: "", institution: "" }],
    skills: { technical: [], soft: [] },
    projects: [],
    Technologies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, field, idx, subField) => {
    const newArray = [...formData[field]];
    newArray[idx][subField] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, [field]: values });
  };

  const handleSkillsChange = (e, type) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, skills: { ...formData.skills, [type]: values } });
  };

  const handleAddNestedField = (field) => {
    const newArray = [...formData[field]];
    newArray.push(field === "experience" ? { role: "", date: "", description: "" } : { degree: "", date: "", institution: "" });
    setFormData({ ...formData, [field]: newArray });
  };

  const handleProjectAdd = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, ""]
    }));
  };

  const handleProjectChange = (e, idx) => {
    const newProjects = [...formData.projects];
    newProjects[idx] = e.target.value;
    setFormData({ ...formData, projects: newProjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <label>
        Portfolio:
        <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} />
      </label>
      <label>
        LinkedIn:
        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
      </label>
      <label>
        GitHub:
        <input type="text" name="github" value={formData.github} onChange={handleChange} />
      </label>
      <label>
        Summary:
        <textarea name="summary" value={formData.summary} onChange={handleChange}></textarea>
      </label>

      <fieldset>
        <legend>Experience</legend>
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="nested-field">
            <label>
              Role:
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleNestedChange(e, "experience", idx, "role")}
              />
            </label>
            <label>
              Date:
              <input
                type="text"
                value={exp.date}
                onChange={(e) => handleNestedChange(e, "experience", idx, "date")}
              />
            </label>
            <label>
              Description:
              <textarea
                value={exp.description}
                onChange={(e) => handleNestedChange(e, "experience", idx, "description")}
              ></textarea>
            </label>
          </div>
        ))}
        <button type="button" onClick={() => handleAddNestedField("experience")}>Add Experience</button>
      </fieldset>

      <fieldset>
        <legend>Education</legend>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="nested-field">
            <label>
              Degree:
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleNestedChange(e, "education", idx, "degree")}
              />
            </label>
            <label>
              Date:
              <input
                type="text"
                value={edu.date}
                onChange={(e) => handleNestedChange(e, "education", idx, "date")}
              />
            </label>
            <label>
              Institution:
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleNestedChange(e, "education", idx, "institution")}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={() => handleAddNestedField("education")}>Add Education</button>
      </fieldset>

      <fieldset>
        <legend>Skills</legend>
        <label>
          Technical Skills (comma-separated):
          <input
            type="text"
            value={formData.skills.technical.join(", ")}
            onChange={(e) => handleSkillsChange(e, "technical")}
          />
        </label>
        <label>
          Soft Skills (comma-separated):
          <input
            type="text"
            value={formData.skills.soft.join(", ")}
            onChange={(e) => handleSkillsChange(e, "soft")}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Projects</legend>
        {formData.projects.map((project, idx) => (
          <div key={idx} className="nested-field">
            <label>
              Project:
              <input
                type="text"
                value={project}
                onChange={(e) => handleProjectChange(e, idx)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleProjectAdd}>Add Project</button>
      </fieldset>

      <label>
        Technologies:
        <input type="text" name="Technologies" value={formData.Technologies} onChange={handleChange} />
      </label>

      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default UserForm;
*/
import React, { useState } from "react";
import { useEffect } from "react";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [{ role: "", date: "", description: "" }],
    education: [{ degree: "", date: "", institution: "" }],
    skills: { technical: [], soft: [] },
    projects: [],
    technologies: "",
  });
  useEffect(() => {
    if (formData.projects.length === 0) {
      handleAddNestedField("projects", { title: "", date: "", description: "", link: "", technologies: "" });
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, field, idx, subField) => {
    const newArray = [...formData[field]];
    newArray[idx][subField] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, [field]: values });
  };

  const handleAddNestedField = (field, template) => {
    setFormData({ ...formData, [field]: [...formData[field], template] });
  };
  const handleSkillsChange = (e, type) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, skills: { ...formData.skills, [type]: values } });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-900 flex min-h-screen">
      <div className="w-[50%] p-7 bg-gray-900 border-r overflow-y-auto h-full">
      <h1
          className="text-3xl font-bold mb-4 text-white"
          style={{
            background: "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Personal Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "portfolio", "github", "linkedin"].map((field) => (
            <label key={field} className="block text-white font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-1 border rounded bg-gray-700 text-white autofill:bg-gray-700"
                autoComplete="off"              />
            </label>
          ))}
           <label className="block text-white font-semibold mt-4">Summary
          <textarea name="summary" value={formData.summary} onChange={handleChange} className="w-full p-2 border rounded bg-gray-700 text-white" rows="3"></textarea>
        </label>
          <h3 className="text-white font-semibold">Education</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="space-y-3">
              {["degree", "date", "institution"].map((subField) => (
                <input
                  key={subField}
                  type="text"
                  placeholder={subField.charAt(0).toUpperCase() + subField.slice(1)}
                  value={edu[subField]}
                  onChange={(e) => handleNestedChange(e, "education", idx, subField)}
                  className="w-full p-1 border rounded bg-gray-700 text-white"
                />
              ))}
            </div>
          ))}
          <button type="button" onClick={() => handleAddNestedField("education", { degree: "", date: "", institution: "" })} className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">
            Add Education
          </button>
          
        </form>
      </div>
      <div className="w-[50%] p-8 overflow-y-auto text-white">
      <h1
          className="text-3xl font-bold mb-3 text-white"
          style={{
            background: "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Skills & Experience
        </h1>
        <h3 className="text-white font-semibold">Experience</h3>
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="space-y-3">
            {["role", "date", "description"].map((subField) => (
              <input
                key={subField}
                type="text"
                placeholder={subField.charAt(0).toUpperCase() + subField.slice(1)}
                value={exp[subField]}
                onChange={(e) => handleNestedChange(e, "experience", idx, subField)}
                className="w-full p-1 border rounded bg-gray-700 text-white"
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={() => handleAddNestedField("experience", { role: "", date: "", description: "" })} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Add Experience
        </button>
        {["technical", "soft"].map((type) => (
          <label key={type} className="block text-white font-semibold mt-4">
            {type.charAt(0).toUpperCase() + type.slice(1)} Skills
            <input type="text" placeholder="Comma-separated" onChange={(e) => handleSkillsChange(e, type)} className="w-full p-3 border rounded bg-gray-700 text-white" />
          </label>
        ))}
       <h3 className="mt-4 text-white font-semibold">Projects</h3>

{/* Ensure at least one project exists on component mount */}

{formData.projects.map((proj, idx) => (
  <div key={idx} className="space-y-3">
    <input
      type="text"
      placeholder="Project Title"
      value={proj.title}
      onChange={(e) => handleNestedChange(e, "projects", idx, "title")}
      className="w-full p-1 border rounded bg-gray-700 text-white"
    />
    <input
      type="text"
      placeholder="Project Date"
      value={proj.date}
      onChange={(e) => handleNestedChange(e, "projects", idx, "date")}
      className="w-full p-1 border rounded bg-gray-700 text-white"
    />
    <textarea
      placeholder="Description"
      value={proj.description}
      onChange={(e) => handleNestedChange(e, "projects", idx, "description")}
      className="w-full p-2 border rounded bg-gray-700 text-white"
      rows="2"
    />
    <input
      type="text"
      placeholder="Project Link"
      value={proj.link}
      onChange={(e) => handleNestedChange(e, "projects", idx, "link")}
      className="w-full p-1 border rounded bg-gray-700 text-white"
    />
    <label className="block text-white font-semibold mt-2">Technologies
      <input
        type="text"
        placeholder="Technologies"
        value={proj.technologies}
        onChange={(e) => handleNestedChange(e, "projects", idx, "technologies")}
        className="mt-1 w-full p-3 border rounded bg-gray-700 text-white"
      />
    </label>
  </div>
))}

{/* Add Project Button */}
<button
  type="button"
  onClick={() => handleAddNestedField("projects", { title: "", date: "", description: "", link: "", technologies: "" })}
  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
>
  Add Project
</button>

       

<button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg,  rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default UserForm;
