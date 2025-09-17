import React, { useState } from "react";
import "./template6.css";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [{ role: "", date: "", description: "" }],
    education: [{ degree: "", date: "", institution: "" }],
    skills: { technical: [], soft: [] },
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
    </form>
  );
};

export default UserForm;
