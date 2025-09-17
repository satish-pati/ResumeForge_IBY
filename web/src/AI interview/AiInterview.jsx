import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useUser } from "../login/usercontext";
import { useInterviewContext } from "./interviewcon";
import { FaMicrophone, FaVolumeUp } from "react-icons/fa";
const AiInterview = () => {
  const { userId } = useUser();
  const { state } = useLocation();
  const { jobRole, setJobRole, jobDescription, setJobDescription, length, setLength } =
    useInterviewContext();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // New state to show loading message
  // Added state for length
  const resumeData = state?.resumeData || "";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [results, setResults] = useState([]);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [analysis, setAnalysis] = useState(null); // To store the analysis results
  //const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef(null); // Reference for the "Read Aloud" audio
  const resumeName = localStorage.getItem("uploadedResumeName");
  const formatAnalysis = (text) => {
    if (!text) return "";
    // Replace Markdown-like symbols with formatted HTML
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold **text**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics *text*
      .replace(/\#\s?(.*?)\n/g, "<h4>$1</h4>") // Headings # Text
      .replace(/\-\s?(.*?)\n/g, "<li>$1</li>") // List items - Text
      .replace(/\n/g, "<br />"); // Line breaks
    return formattedText;
  };

  // Fetch questions based on job description
  const fetchQuestions = async () => {
    if (!jobDescription) {
      alert("Please provide a job description!");
      return;
    }
    try {
      const response = await axios.post("https://res-1-7uph.onrender.com/generate-questions", {
        job_role: jobRole,
        job_description: jobDescription,
      });
      console.log("Fetched Questions:", response.data.questions);
      setQuestions(response.data.questions);
      setCurrentQuestionIndex(0); // Reset to the first question
      setAnswer(""); // Clear any previous answers
      setTimer(300); // Reset the timer
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please check the server.");
    }
  };
  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component mounts
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && questions.length > 0) {
      // Auto-submit the answer if the timer ends
      submitAnswer();
    }
  }, [timer, questions]);
  // Submit the current answer

  const submitAnswer = () => {
    if (questions.length === 0) {
      alert("No questions available!");
      return;
    }
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);

  
    // Save the current answer
    const newResults = [...results, { question: questions[currentQuestionIndex], answer }];
    setResults(newResults);
  
    // Reset answer input field but don't reset UI when it's the last question
    setAnswer("");
    setTimer(300);
    stopAudio();
  
    // If it's the last question, trigger interview completion
    if (currentQuestionIndex === questions.length - 1) {
      setIsInterviewComplete(true);
      setIsLoading(true); // Show loading message
      finalizeInterview(newResults);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  useEffect(() => {
    const saveAnalysisToDatabase = async () => {
      if (isInterviewComplete && analysis) {
        const analysisData = {
          userId, // Ensure this is available in your component, e.g., from props or context
          resumeName,
          jobRole,
          jobDescription,
          results: analysis, // Saving the fetched questions as analysis
        };

        try {
          await axios.post("https://backend-1-61k2.onrender.com/api/interview-analysis", analysisData);
          console.log("Analysis saved successfully:", analysis);
          alert("Analysis saved successfully!");
        } catch (saveError) {
          console.error("Error saving analysis to database:", saveError);
          alert("Failed to save analysis to the database.");
        }
      }
    };

    saveAnalysisToDatabase();
  }, [isInterviewComplete, analysis]); // Runs when these dependencies change


  const finalizeInterview = async (finalResults) => {
    try {
      const response = await axios.post("https://res-1-7uph.onrender.com/submit-interview", {
        results: finalResults,
        job_role: jobRole,
        job_description: jobDescription,
      });
      
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Error submitting interview:", error);
    } finally {
      setIsLoading(false); // Hide loading message once analysis is received
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const readQuestionAloud = async (question) => {
    if (audioRef.current && !audioRef.current.paused) {
      stopAudio();
      return;
    }
  
    console.log("readQuestionAloud called with:", question, typeof question);
  
   
    stopAudio(); // Stop any ongoing audio
  
    try {
      const response = await axios.post("https://res-1-7uph.onrender.com/read-question", {
        question, // Ensure this is a string
      });
  
      console.log("Backend response:", response);
  
      const audioUrl = `https://res-1-7uph.onrender.com/static/response.mp3?timestamp=${new Date().getTime()}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
  
      audio.play();
    } catch (error) {
      console.error("Error reading question aloud:", error);
    }
  };
  

  const BASE_URL = "https://res-1-7uph.onrender.com";


  const [mediaRecorder, setMediaRecorder] = useState(null); // MediaRecorder instance
  const startRecording = async () => {
    stopAudio();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = async (e) => {
        const formData = new FormData();
        formData.append("audio", e.data, "recording.webm");

        try {
          const response = await axios.post(`${BASE_URL}/stop-recording`, formData);
          const spokenText = response.data.transcript || "";
          setAnswer((prev) => `${prev} ${spokenText}`.trim());
          //setTranscript(response.data.transcript);
        } catch (error) {
          console.error("Error uploading audio:", error.response?.data || error.message);
          alert("Failed to process audio.");
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop()); // Stop media stream
      setIsRecording(false);
    }
  };
  
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {isInterviewComplete ? (
        isLoading ? (
          // Show loading indicator while analysis is being processed
          <div className="w-full flex items-center justify-center text-xl font-bold text-white">
            <p>Loading analysis...</p>
          </div>
        ) : (
          // Display interview summary once analysis is ready
          <div className="w-full p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 text-white"
              style={{
                background: "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Interview Summary
            </h1>
            <hr className="bg-gray-600 mt-0.5"></hr>
            <div className="space-y-6">
              {analysis.map((item, index) => (
                <div key={index} className="border border-gray-700 p-4 rounded bg-gray-800">
                  <p><strong>Question {index + 1}:</strong> {item.question}</p>
                  <p><strong>Answer:</strong> {item.answer}</p>
                  <div dangerouslySetInnerHTML={{ __html: formatAnalysis(item.analysis) }} />
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        // Default interview progress layout
        <>
          {/* Left Section */}
          <div className="w-[30%] p-6 bg-gray-900 border-r overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 text-white"
              style={{
                background: "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              AI Interview Progress
            </h1>
            <hr className="bg-gray-600 mt-0.5"></hr>  
            <div>
              <div className="mb-4">
                <div className="mt-4 w-full bg-gray-700 h-2 rounded">
                <div className="bg-green-500 h-2 rounded" style={{  width: `${progress}%` }}></div>
                </div>
                <p className="text-sm mt-2 text-white">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
              <h3 className="text-xl mb-2">Question:</h3>
              <p className="mb-4 text-white">{questions[currentQuestionIndex]}</p>
              <div className="flex items-center justify-between w-full">

  <button className="mb-3 text-white" >
  <FaVolumeUp onClick={() => readQuestionAloud(questions[currentQuestionIndex])} />
  </button>
  <p className="mb-3 text-white text-xl font-bold">
  {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
</p>

</div>

        <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                rows="4"
                placeholder="Type your answer here..."
              ></textarea>
              <div className="flex items-center mt-4 gap-4">
                
                
                <button
          onClick={submitAnswer}
          className="text-xl font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg,  rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
          }}
        >
          Submit Answer
        </button>
              </div>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="w-[70%] flex-1 p-6 overflow-y-auto text-white">
            <h2 className="text-2xl font-bold mb-4">Audio Recorder</h2>
           
            <p>
            Record your answer to the question by clicking on the microphone icon.</p>
            <div className=" bg-gray-800 flex items-center justify-center mt-6 p-8 rounded border-gray-600 rounded">
             
            {isRecording ? ( <button className="mt-1 mr-10 bg-green-600 p-4 rounded-full"onClick={isRecording ? stopRecording : startRecording}>
        <FaMicrophone size={24} />
      </button>):( <button className="mt-1 mr-10 bg-red-600 p-4 rounded-full"onClick={isRecording ? stopRecording : startRecording}>
        <FaMicrophone size={24} />
      </button>)}
              <div className="bg-gray-800 p-4 rounded-full">
                <button onClick={isRecording ? stopRecording : startRecording} className={`w-16 h-16 rounded-full ${isRecording ? "bg-red-500" : "bg-blue-500"}`}></button>
              </div>   
            </div>
            <h1 className="mt-10 text-xl font-bold mb-4">Transcript</h1>
            <div className="mt- 6 border border-gray-700 p-4 rounded">
              <p>{answer || "Record or type your answer to see it displayed here."}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );  
  
};
export default AiInterview;
