import React from "react";
import { useNavigate } from "react-router-dom";
const templates = [
  {
    name: "Classic Template",
    description: "A timeless layout that suits various industries and job roles.",
    src: "https://zepanalytics.blr1.cdn.digitaloceanspaces.com/assets/classic.png",
    route: "/resumegen1",
  },
  {
    name: "Modern Template",
    description: "A sleek and up-to-date design ideal for professionals who value simplicity.",
    src: "https://zepanalytics.blr1.cdn.digitaloceanspaces.com/assets/modern.png",
    route: "/resumegen2",
  },
  {
    name: "Executive Template",
    description: "An elegant and refined format designed for leadership positions.",
    src: "https://zepanalytics.blr1.cdn.digitaloceanspaces.com/assets/executive.png",
    route: "/resumegen3",
  },
  {
    name: "Creative Template",
    description: "A visually striking design crafted to showcase individuality and flair.",
    src: "https://zepanalytics.blr1.cdn.digitaloceanspaces.com/assets/creative.png",
    route: "/resumegen4",
  },
  {
    name: "Academic Template",
    description: "A structured and professional format tailored for academic and research roles.",
    src: "https://zepanalytics.blr1.cdn.digitaloceanspaces.com/assets/academic.png",
    route: "/resumegen5",
  },
  {
    name: "Corporate Template",
    description: "A polished and business-focused layout ensuring clarity and professionalism.",
    src: "https://zepanalytics.blr1.cdn.digitaloceanspaces.com/assets/corporate.png",
    route: "/resumegen6",
  },
];


const Temphome = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen py-0 text-center overflow-hidden">

      <header className="  top-0 left-0 w-full mt-0 bg-white/10 dark:bg-gray-700 shadow-md py-6">
        <div className="container mx-auto px-4">
          <h1
            className="text-left text-3xl font-bold"
            style={{
              background:
                "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Resume Builder
          </h1>
          <p className="text-left text-white mt-2">
          Your one-stop solution for crafting the perfect resume in minutes
          </p>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="mt-3 text-5xl font-bold text-white mb-4">
        Build Your Perfect Resume in Minutes        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto mb-8">
        Choose from professionally designed templates and craft a standout resume effortlessly
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <h3 className="text-3xl font-bold text-white mb-8">
          Select Your Template
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <div
              key={index}
              className="text-white rounded-lg border bg-card text-card-foreground shadow-sm group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-gray-800 dark:border-gray-700"
              onClick={() => navigate(template.route)}
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between">
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
                    className="lucide lucide-file-text h-8 w-8 text-blue-600 dark:text-blue-400"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight mt-4 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {template.description}
                </p>
              </div>
              <div className="p-6 pt-0">
                <div className="h-96 overflow-auto bg-gray-100 dark:bg-gray-700 rounded-sm border dark:border-gray-600 flex items-center justify-center group-hover:bg-gray-50 dark:group-hover:bg-gray-600 transition-colors duration-200">
                  <img
                    alt={template.name}
                    className="w-full h-full object-cover"
                    src={template.src}
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <section className="mt-5 mb-0 pb-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-40 justify-items-center">
    <div className="w-80 h-42 rounded-lg border bg-card text-white shadow-sm">
      <div className="flex flex-col space-y-1.4 p-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "#29E33C" }}
        >
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
            className="lucide lucide-file-text w-6 h-6 text-white"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold leading-none tracking-tight">Build Your Resume</h3>
      </div>
      <div className="text-xs p-4 pt-0">
        <p className="text-white">Create a professional resume quickly with our easy-to-use builder.</p>
      </div>
    </div>
{/* Card 2: Customizable Templates */}
<div className="w-80 h-42 rounded-lg border bg-card text-white shadow-sm">
  <div className="flex flex-col space-y-1.4 p-4">
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
      style={{ backgroundColor: "#29E33C" }}
    >
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
        className="lucide lucide-layout-grid w-6 h-6 text-white"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold leading-none tracking-tight">Customizable Templates</h3>
  </div>
  <div className="text-xs p-4 pt-0">
    <p className="text-white">Choose from a variety of professional templates to match your style and industry.</p>
  </div>
</div>

    {/* Card 3: Download & Share */}
    <div className="w-80 h-42 rounded-lg border bg-card text-white shadow-sm">
      <div className="flex flex-col space-y-1.4 p-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "#29E33C" }}
        >
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
            className="lucide lucide-download w-6 h-6 text-white"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold leading-none tracking-tight">Download & Share</h3>
      </div>
      <div className="text-xs p-4 pt-0">
        <p className="text-white">Easily download your resume in multiple formats and share it effortlessly.</p>
      </div>
    </div>

  </div>
</section>

    </div>
  );
};

export default Temphome;
