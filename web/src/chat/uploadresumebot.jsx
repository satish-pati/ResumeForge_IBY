import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadResumeBot = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://res-1-7uph.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const pdfUrl = response.data.pdf_url;
      navigate("/chatbot", { state: { pdfUrl } }); // Pass the PDF URL to the Chatbot page
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload the resume. Please try again.");
    }
  };
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <svg>
          <defs>
            <pattern
              id="background-pattern"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#background-pattern)"
            strokeWidth="0"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="bg-white/10 dark:bg-gray-700 shadow-md py-6">
        <div className="container mx-auto px-4">
          <h1
            className="text-3xl font-bold"
            style={{
              background:
                "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Career Coach
          </h1>
          <p className="text-white mt-2">
            Your personal guide to professional success
          </p>
        </div>
      </header>


      {/* Main Content */}
      <div className="mt-0 pt-0 mx-auto max-w-7xl px-6 pb-0 sm:pb-32 lg:flex lg:px-8 lg:py-40"
        style={{ marginTop: 0 }}
      >
        <div className=" mt-0 pt-0 mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 className="mt-0  pt -0 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            AI Career Coach: Your Personal Guide to Professional Success
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Unlock your career potential with our cutting-edge AI Career Coach. Get personalized advice, data-driven insights, and actionable strategies to propel your professional growth.
          </p>
          <form
            onSubmit={handleUpload} // Keep the form submission handler here
            className="mt-10 flex flex-col justify-start items-start sm:flex-row sm:items-center gap-x-6"
          >
            <input
              type="file"
              name="pdf_doc"
              id="pdf_doc"
              accept=".pdf"
              onChange={handleFileChange}
              className="drop-shadow-md bg-white/10 font-semibold leading-6 text-gray-900 border border-green-300 py-2 px-4 rounded-2xl block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-green-50 file:text-green-500
                          hover:file:bg-green-100"
            />
            <button
              type="submit"
              className="my-2 bg-blue-500 px-8 rounded-2xl py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              style={{ backgroundColor: "#29E33C" }}
            >
              Process
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-40 lg:max-w-none lg:flex-none xl:ml-32">
          <img
            src="https://res.cloudinary.com/dtsuvx8dz/image/upload/v1716357077/o1imiun4wwcpia9uucgs.gif"
            alt="App screenshot"
            className="w-[15rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
          />
        </div>

      </div>
      {/* Section */}
      <section className="mt-9 mb-10"> {/* Adjusted `mb-12` to `mb-0` */}
        <div className=" mt-19.5 pt-0 mt-0 grid grid-cols-1 md:grid-cols-3 gap-0 px-40 justify-items-center">
          {/* Card 1 */}
          <div className="w-80 h-42 rounded-lg border bg-card text-white shadow-sm">
            <div className="flex flex-col space-y-1.4 p-4">
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle w-6 h-6 text-white"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">Chat with AI</h3>
            </div>
            <div className="text-xs p-4 pt-0">
              <p className="text-white">Engage in real-time conversations with our advanced AI coach.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-80 h-42 rounded-lg border bg-card text-white shadow-sm">
            <div className="flex flex-col space-y-1.4 p-4">
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload w-6 h-6 text-white"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">Upload Resume</h3>
            </div>
            <div className="text-xs p-4 pt-0">
              <p className="text-white">Easily upload your resume and let our AI analyze it for you.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-80 h-42 rounded-lg border bg-card text-white shadow-sm">
            <div className="flex flex-col space-y-1.4 p-4">
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-6 h-6 text-white"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">Get Feedback</h3>
            </div>
            <div className="text-xs p-4 pt-0">
              <p className="text-white">Receive actionable feedback to optimize your job applications.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadResumeBot;

