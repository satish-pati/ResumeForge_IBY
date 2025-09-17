const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.options("*", cors());
//Alternatively, restrict to your frontend origin
app.use(
  cors({
    //origin: "http://localhost:3000" || "http://10.30.19.107:3000", // Your frontend URL
    origin: '*', // Allow all origins; change this to your frontend URL for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use(bodyParser.json());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
// 1. Register User
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
});

// 2. Login User
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Loginfailed" });
  }
});
// 3. Get User Details by ID
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("username email");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user details" });
  }
});



const coverLetterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobRole: { type: String, required: true },
  jobDescription: { type: String, required: true },
  coverLetter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
app.post('/api/coverletters', async (req, res) => {
  const { userId, jobRole, jobDescription, coverLetter } = req.body;
  if (!userId || !jobRole || !jobDescription || !coverLetter) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "Invalid userId" });

    const newCoverLetter = new CoverLetter({ userId, jobRole, jobDescription, coverLetter });
    await newCoverLetter.save();
    res.status(201).json(newCoverLetter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/coverletters/:userId', async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find({ userId: req.params.userId });
    res.json(coverLetters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/coverletters/detail/:id', async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findById(req.params.id);
    if (!coverLetter) {
      return res.status(404).json({ message: "Cover Letter not found" });
    }
    res.json(coverLetter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define schema
const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: String, required: true },
  formData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now } // Correct way to define a timestamp
});

// Define model only once
const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;

// Endpoint to post a new resume
app.post('/api/resumes', async (req, res) => {
  const { userId, templateId, formData } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Validate the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "Invalid userId" });

    // Create a new resume (no need to manually specify `createdAt`)
    const resume = new Resume({ userId, templateId, formData });

    // Save to database
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Endpoint to get all resumes for a user
app.get('/api/resumes/:userId', async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Analysis Results Schema
const analysisResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to User collection
    required: true,
  },
  resumeName: { type: String, required: true },
  jobRole: { type: String, required: true },
  jobDescription: { type: String, required: true },
  scores: { type: Map, of: Number, required: true },
  overallScore: { type: Number, required: true },
  matchedKeywords: { type: [String], required: true }, // List of matched keywords
  missingKeywords: { type: [String], required: true }, // List of missing keywords
  impactfulPhrases: { type: [String], required: true }, // List of impactful phrases
  weakPhrases: { type: [String], required: true }, // List of weak phrases
  presentSkills: { type: [String], required: true }, // List of present skills
  recommendedSkills: { type: [String], required: true }, // List of recommended skills
  ifb: { type: [String], required: true }, // Industry-specific feedback
  recom:{type: [String], required: true},
  createdAt: { type: Date, default: Date.now },
});

const AnalysisResult = mongoose.model("AnalysisResult", analysisResultSchema);
// Endpoint to Store Analysis Results
app.post("/api/analysis-results", async (req, res) => {
  const {
    userId,
    resumeName,
    jobRole,
    jobDescription,
    scores,
    overallScore,
    matchedKeywords,
    missingKeywords,
    impactfulPhrases,
    weakPhrases,
    presentSkills,
    recommendedSkills,
    ifb,
    recom
  } = req.body;

  // Validate inputs


  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "Invalid userId" });

    const newAnalysisResult = new AnalysisResult({
      userId,
      resumeName,
      jobRole,
      jobDescription,
      scores,
      overallScore,
      matchedKeywords,
      missingKeywords,
      impactfulPhrases,
      weakPhrases,
      presentSkills,
      recommendedSkills,
      ifb,
      recom
    });

    await newAnalysisResult.save();
    res.status(201).json(newAnalysisResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Endpoint to Retrieve Analysis Results
app.get("/api/analysis-results/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Received userId:", userId); // Debugging step

 
  try {
    const results = await AnalysisResult.find({ userId: req.params.userId });
    res.json(results);
  } catch (error) {
    console.log("in"); // Debugging step

    res.status(500).json({ message: error.message });
  }
});
const interviewQuestionsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to User collection
    required: true,
  },
  resumeName: { type: String, required: true }, // Add this field
  jobRole: { type: String, required: true },
  jobDescription: { type: String, required: true },
  questions: [{ type: String }], // Array of generated questions
  createdAt: { type: Date, default: Date.now },
});

const InterviewQuestions = mongoose.model(
  "InterviewQuestions",
  interviewQuestionsSchema
);

// Endpoint to store generated interview questions
app.post("/api/interview-questions", async (req, res) => {
  const { userId, resumeName, jobRole, jobDescription, questions } = req.body;

  console.log("Request received with:", { userId, resumeName, jobRole, jobDescription, questions });

  if (!resumeName || !userId || !jobRole || !jobDescription || !questions) {
    console.error("Missing fields in request body");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("Invalid userId:", userId);
      return res.status(400).json({ message: "Invalid userId" });
    }

    const newQuestions = new InterviewQuestions({
      userId,
      resumeName,
      jobRole,
      jobDescription,
      questions,
    });

    await newQuestions.save();
    console.log("Data saved successfully:", newQuestions);
    res.status(201).json(newQuestions);
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: error.message });
  }
});


// Endpoint to retrieve stored interview questions by user ID
app.get("/api/interview-questions/:userId", async (req, res) => {
  try {
    const questionsList = await InterviewQuestions.find({
      userId: req.params.userId,
    });
    res.json(questionsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const interviewAnalysisRoutes = require("./routes/aiinterview"); // Adjusted path
//app.use("/api/interview-analysis", interviewAnalysisRoutes); // Use the routes
app.use(express.json()); // Middleware to parse JSON
app.use('/api/interview-analysis', interviewAnalysisRoutes); // Mount the route
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
