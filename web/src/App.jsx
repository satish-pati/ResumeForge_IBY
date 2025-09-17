
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadResumeBot from "./chat/uploadresumebot";
import UploadResumeATS from "./ATS/uploadresumeATS";
import ChatBot from "./chat/Ask";
import Home from "./home";
import AnalyzeResume from "./ATS/Analyze";
import UploadResumeInterview from "./Interview/uploadreusmeinterview";
import InterviewQuestionGenerate from "./Interview/InterviewQuestionGenerate"
import UploadResumeAi from "./AI interview/uploadresume";
import CoverLetter from "./Coverletter/Coverletter";
import UploadResumeCL from "./Coverletter/uploadResumeCL";
import Resumegen1 from "./components/resumegen";
import Resumegen2 from "./components/resumegen2";
import Resumegen3 from "./components/resumegen3";
import Resumegen4 from "./components/resumegen4";
import Resumegen5 from "./components/resumegen5";
import Resumegen6 from "./components/resumegen6";
import AiInterview from "./AI interview/AiInterview";
import Temphome from "./components/temphome";
import Login  from "./login/login";
import Register from "./login/register";
import ResumesPage from "./Resume";
import { UserProvider } from "./login/usercontext";
import Render1 from "./Render/render1";
import Render3 from "./Render/render3";
import Render4 from "./Render/render4";
import Render5 from "./Render/render5";
import Render2 from "./Render/render2";
import Render6 from "./Render/render6";
import CoverLetterHistory from "./Coverletter/coverletterHistory";
import HistoryPage from "./ATS/atshistory";
import QuestionsHistory from "./Interview/questionhis";
import ViewQuestions from "./Interview/Questiondetail";
import Resumeanal from "./AI interview/aianalysishis";
import AnalysisDetailPage from "./AI interview/analysyispg";
import NewAiInterview from "./AI interview/newcom";
import { InterviewProvider } from "./AI interview/interviewcon";
import CoverLetterDetail from "./Coverletter/coverdet";
import AnalysisDetailPage1 from "./ATS/analysishis";
import JobSearchFeatures from "./home2";
import Profile from "./login/profile";
import Login2 from "./login/newlog";
import VantaBackground from "./login/newlog";
import App2 from "./login/newlog";
import VantaPage from "./login/newlog";
function App() {
  return (
    <UserProvider>
            <InterviewProvider>

    <Router>
      <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/uploadresumeATS" element={<UploadResumeATS />} />
      <Route path="/uploadresumebot" element={<UploadResumeBot />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/Analyze" element={<AnalyzeResume />} />
      <Route path="/uploadresumeinterview" element={< UploadResumeInterview/>} />
      <Route path="/InterviewQuestionGenerate" element={<InterviewQuestionGenerate />} />
      <Route path="/AiInterview" element={<AiInterview />} />
      <Route path="/uploadresume" element={< UploadResumeAi />} />
      <Route path="/uploadresumecl" element={<UploadResumeCL />} />
      <Route path="/Coverletter" element={<CoverLetter />} />
      <Route path="/resumegen1" element={<Resumegen1 />} />
      <Route path="/resumegen2" element={<Resumegen2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resumegen3" element={<Resumegen3 />} />
      <Route path="/resumegen4" element={<Resumegen4 />} />
      <Route path="/resumegen5" element={<Resumegen5 />} />
      <Route path="/resumegen6" element={<Resumegen6 />} />
      <Route path="/temphome" element={<Temphome/>} />
      <Route path="/res" element={<ResumesPage />} />
      <Route path="/render1" element={<Render1/>} />
      <Route path="/render2" element={<Render2/>} />
      <Route path="/render3" element={<Render3/>} />
      <Route path="/render4" element={<Render4/>} />
      <Route path="/render5" element={<Render5/>} />
      <Route path="/render6" element={<Render6/>} />
      <Route path="/coverletterhis" element={<CoverLetterHistory/>} />
      <Route path="/atshis" element={<HistoryPage/>} />
      <Route path="/history" element={<QuestionsHistory />} />
      <Route path="/questions/:id" element={<ViewQuestions />} />
      <Route path="/aihist" element={< Resumeanal/>} />
      <Route path="/aiinterviewprev" element={< NewAiInterview/>} />
      <Route path="/coverdet/:id" element={<CoverLetterDetail />} />
      <Route path="/analysis-detail" element={<AnalysisDetailPage1 />} />
      <Route path="/home2" element={<JobSearchFeatures />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<VantaPage/>} />


      </Routes>
    </Router>
    </InterviewProvider>
    </UserProvider>
  );
}



export default App;
