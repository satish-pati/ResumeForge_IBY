const express = require("express");
const router = express.Router();
const InterviewAnalysis = require("../models/aiinterview"); // Adjust the path as needed

// Endpoint to save interview analysis
router.post("/", async (req, res) => {
  const { userId, resumeName, jobRole, jobDescription,  results } = req.body;
  const newAnalysis = new InterviewAnalysis({
    userId,
    resumeName,
    jobRole,
    jobDescription,
    results,
  });
  try {
    await newAnalysis.save();
    console.log("Analysis saved successfully:", newAnalysis);
    res.status(201).json(newAnalysis);
  }catch (error){
    console.error("Error saving analysis:", error.message);
    res.status(500).json({ message: error.message });
  }
});
const mongoose = require("mongoose");
 //Endpoint to retrieve analysis by user ID
 router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Ensure userId is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    const analysisList = await InterviewAnalysis.find({ userId });
    res.json(analysisList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const analysis = await InterviewAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found." });
    }
    res.json(analysis); // Ensure all fields (resumeName, jobRole, jobDescription, results) are included
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
