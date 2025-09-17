import React, { createContext, useState, useContext } from "react";

// Create the Context
const InterviewContext = createContext();

// Custom Hook to use the Interview Context
export const useInterviewContext = () => useContext(InterviewContext);

// Context Provider Component
export const InterviewProvider = ({ children }) => {
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [length, setLength] = useState("normal");

  return (
    <InterviewContext.Provider
      value={{ jobRole, setJobRole, jobDescription, setJobDescription, length, setLength }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
