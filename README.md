# ELITERESUMEAI - AI-Driven Full-Stack Resume Optimizer Website

🚀 **EliteResumeAI** is a full-stack, AI-powered Website that leverages technologies in NLP, Generative AI, and Deep Learning to optimize resumes, generate tailored cover letters, and provide personalized interview preparation — all in one place.

---


## 🌟 Key Features

- **AI-Driven Resume Optimization**
  - Enhances resumes using NLP and Deep Learning techniques.
  - Provides keyword suggestions and formatting improvements tailored to job descriptions and industry standards.

- **ATS (Applicant Tracking System) Analysis**
  - Ensures resumes are parsed correctly by modern hiring software.
  - Offers actionable feedback and assigns an **ATS compatibility score**.

- **Resume Builder with Templates**
  - Allows users to build professional resumes from scratch using modern, customizable templates.
  - Template-driven interface for selecting layouts, sections, and styles.

- **Generative Cover Letter with RAG**
  - Creates personalized cover letters using Retrieval-Augmented Generation (RAG).
  - Embedding-based retrieval with transformer models and FAISS vector similarity search.

- **Mock Interview & Question Generation**
  - Simulates realistic interview sessions based on the user’s uploaded resume.
  - Generates role-specific and industry-specific questions using generative AI.

- **AI Career Coach (Interactive)**
  - Users can **upload their resume** and interact with an AI-powered coach via chatbot.
  - Ask questions like “How can I improve my resume for data science roles?” or “Is this resume good for a software engineering internship?”
  - Uses Langchain to connect uploaded content with LLM-driven feedback generation.





---

## 🛠️ Tech Stack

### 🔧 Frontend
- **React.js** – Responsive UI with intuitive navigation

### 🧠 Backend
- **Node.js + Express.js** – RESTful APIs for frontend interaction
- **Python + Flask** – AI/ML model hosting and inference

### 🧪 AI/ML & NLP
- **Hugging Face Transformers** – Used for embeddings, resume analysis, and content generation
- **Langchain** – Orchestration and chaining of LLM-based tools
- **Vector Search (FAISS Index)** – Embedding-based information retrieval for RAG systems using Facebook AI Similarity Search (FAISS) for efficient dense vector indexing and nearest-neighbor search

### 💾 Database
- **MongoDB** – Stores user data, resumes, and AI-Generated Coverletters,analysis etc 

---

## ⚙️ Installation

1. **Clone the Repository**
    ```bash
   git clone https://github.com/satish-pati/EliteResume
   cd eliteresumeai
   ```
2. **Frontend Setup**
   ```bash
   cd web
   npm install
   npm start
   ```
3. **Flask Server Setup**
   - Navigate to the home directory :
   - Create and activate a virtual environment:
   ```bash
     # For Linux/macOS
     python3 -m venv venv
     source venv/bin/activate

     # For Windows
     python -m venv venv
     venv\Scripts\activate
   ```

   - Install required dependencies:
   ```bash
     pip install -r requirements.txt
   ```

   - Run the Flask server:
   ```bash
     python app.py
   ```
5. **Backend Server(MongoDB Setup)**
   ```bash
   cd backend
   npm install
   node server.js
   ```


