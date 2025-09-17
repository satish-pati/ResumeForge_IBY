import React, { useState } from "react";

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
    skills: { technical: [], ReasearchMethods: [] },
    languages: [],
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

  const handleSkillsChange = (e, type) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, skills: { ...formData.skills, [type]: values } });
  };

  const handleLanguagesChange = (e) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, languages: values });
  };

  const handleAddNestedField = (field) => {
    const newArray = [...formData[field]];
    newArray.push(
      field === "experience"
        ? { role: "", date: "", description: "" }
        : { degree: "", date: "", institution: "" }
    );
    setFormData({ ...formData, [field]: newArray });
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
        <hr className="bg-gray-600 mt-0.5" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          {["name", "email", "phone", "portfolio", "github", "linkedin"].map((field) => (
            <label key={field} className="block text-white font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-1 border rounded bg-gray-700 text-white autofill:bg-gray-700"
                autoComplete="off"              />
            </label>
          ))}

          <h3 className="text-white font-semibold">Education</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="space-y-3.5">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleNestedChange(e, "education", idx, "degree")}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="Date"
                value={edu.date}
                onChange={(e) => handleNestedChange(e, "education", idx, "date")}
                className="w-full p-1 border rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleNestedChange(e, "education", idx, "institution")}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddNestedField("education")} className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Education
          </button>
        </form>
      </div>

      {/* Right Section - Additional Inputs */}
      <div className="w-[50%] flex-1 p-8 overflow-y-auto text-white">
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
        <hr className="bg-gray-600 mt-0" />
        <h3 className="text-white font-semibold mt-0">Experience</h3>
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="space-y-3">
            <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleNestedChange(e, "experience", idx, "role")} className="w-full p-1 border rounded bg-gray-700 text-white" />
            <input type="text" placeholder="Date" value={exp.date} onChange={(e) => handleNestedChange(e, "experience", idx, "date")} className="w-full p-1 border rounded bg-gray-700 text-white" />
            <textarea placeholder="Description" value={exp.description} onChange={(e) => handleNestedChange(e, "experience", idx, "description")} className="w-full p-2 border rounded bg-gray-700 text-white" rows="2"></textarea>
          </div>
        ))}
        <button type="button" onClick={() => handleAddNestedField("experience")} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add Experience
        </button>

        <label className="block text-white font-semibold mt-2">Research Interests
          <textarea name="summary" value={formData.summary} onChange={handleChange} className="mt-1 w-full p-2 border rounded bg-gray-700 text-white" rows="3"></textarea>
        </label>

        {["technical", "ReasearchMethods"].map((type) => (
          <label key={type} className="block text-white font-semibold mt-4">
            {type.charAt(0).toUpperCase() + type.slice(1)} Skills
            <input type="text" placeholder="Comma-separated" onChange={(e) => handleSkillsChange(e, type)} className="w-full p-3 border rounded bg-gray-700 text-white" />
          </label>
        ))}
        <label className="block text-white font-semibold mt-2">Languages
          <input type="text" placeholder="Comma-separated" onChange={handleLanguagesChange} className="mt-1 w-full p-3 border rounded bg-gray-700 text-white" />
        </label>
       
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
