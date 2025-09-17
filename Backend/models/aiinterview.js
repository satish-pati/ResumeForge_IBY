// models/InterviewAnalysis.js
const mongoose = require("mongoose");

const interviewAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model to reference
  },
  resumeName:{
 type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  results: [
    {
      question: String,
      answer: String,
      analysis: String, // Store the analysis result as a string
    },
  ],
});

const InterviewAnalysis = mongoose.model("InterviewAnalysis", interviewAnalysisSchema);

module.exports = InterviewAnalysis;
