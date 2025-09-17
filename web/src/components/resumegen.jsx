import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import Template1 from "./Template1";
import UserForm from "./Userform";
import axios from "axios";
import { useUser } from "../login/usercontext";
  // Function to trigger the print dialog
const Resumegen1 = () => {
  const [formData, setFormData] = useState(null);
  const [templateSelected, setTemplateSelected] = useState(false);
  const resumeRef = useRef();

  // Reference to the resume content
  const triggerPrint = () => {
    const buttons = document.querySelectorAll(".btn, .print-btn");
    const headings = document.querySelectorAll(".preview");
    

  // Hide the buttons before printing
  buttons.forEach((btn) => (btn.style.display = "none"));
  headings.forEach((hd) => (hd.style.display = "none"));

  // Delay to allow the browser to update the DOM before invoking print
  setTimeout(() => {
    window.print();

    // Restore the buttons after printing
    buttons.forEach((btn) => (btn.style.display = ""));
    headings.forEach((hd) => (hd.style.display = ""));

  }, 100);
    
  };
  //const mongoose = require('mongoose');
  const { userId } = useUser(); // Access the user ID from context
  // Form submission handler
 // const userIdObjectId = mongoose.Types.ObjectId(userId);

  const handleFormSubmit = async(data) => {
    console.log(userId);
    console.log("Form data submitted:", data); // Debug log
    setFormData(data);
    setTemplateSelected(true);
    await axios.post("https://backend-1p2y.onrender.com/api/resumes", { userId:userId,
      templateId: 1, // Replace with actual template ID selected by the user
      formData: data,
    });
  };
  const handleRetrieveResume = async (templateId) => {
    const response = await axios.get(`https://backend-1p2y.onrender.com/api/resumes/${templateId}`);
    setFormData(response.data.formData);
    setTemplateSelected(true);
  };
  
  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    if (!element) return;
  
    const pdf = new jsPDF("portrait", "mm", "a4");
  
    // Get the bounding box of the content
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
  
    // Calculate scale based on content size and page size
    const pdfWidth = pdf.internal.pageSize.width - 20; // 10mm margin on each side
    const pdfHeight = pdf.internal.pageSize.height - 20; // 10mm margin on top and bottom
    const scale = Math.min(pdfWidth / elementWidth, pdfHeight / elementHeight); // Calculate the scale
  
    // Use the calculated scale to render the HTML to PDF
    pdf.html(element, {
      callback: (doc) => {
        // Add clickable links after the content is rendered
        const links = element.querySelectorAll("a"); // Get all <a> elements
        console.log(links);
        links.forEach((link) => {
          const rect = link.getBoundingClientRect(); // Get position relative to the viewport
          const linkUrl = link.href; // Get the URL
          const x = (rect.left - element.offsetLeft) * scale + 10; // Adjust for margins
          const y = (rect.top - element.offsetTop) * scale + 10.5;  // Adjust for margins
          const linkWidth = rect.width * scale;
          const linkHeight = rect.height * scale;
          doc.setFontSize(14);
          doc.text(x,y,"hi");
          console.log(x,y);
          doc.link(x, y, linkWidth, linkHeight, { url: linkUrl });

        });
  
        doc.save("Resume.pdf"); // Save the PDF
      },
      margin: [10, 10, 10, 10], // Add margins around the content
      autoPaging: true, // Automatically handle page breaks
      html2canvas: {
        scale: scale, // Dynamically scale the content to fit the page
        useCORS: true, // Handle cross-origin issues
      },
    });
  };
  
  return (
    <div className='app'>
      {!templateSelected ? (
        <>
          <UserForm onSubmit={handleFormSubmit} />
        </>
      ) : (
    <div className="bg-gray-800  h-screen overflow-auto">
      
       <h1
          className="text-center text-3xl font-bold mb-4 text-white "
          style={{
            background: "-webkit-linear-gradient(90deg, rgba(97,215,101,1) 0%, rgba(225,255,64,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Preview Your Resume
        </h1>
        <p className="text-center text-white mt-0">Preview and download your resume in PDF format
          </p>
          <div className="text-right"><button
  type="submit"
  onClick={triggerPrint}
  style={{ backgroundColor: "#29E33C" }}
  className="  mr-20 mt-0 justify-center h-10 inline-flex items-center p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200 ease-in-out shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
    className="lucide lucide-download h-6 w-6"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
</button>
</div>

          <div
            ref={resumeRef}
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              maxWidth: "800px",
             margin: "auto",
            }}
          >
            <Template1 data={formData} />
          </div >
         <div className="text-center">
            <button                      type="submit"
       onClick={triggerPrint}                    style={{ backgroundColor: "#29E33C" }}  

className="  mt-8 justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200 ease-in-out shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download mr-2 h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>Download PDF</button>
                   </div>
                   </div>
      )}
    </div>
  );
};

export default Resumegen1;
