
from flask import Flask, request, redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename
import os
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_groq import ChatGroq
from langchain.chains import create_history_aware_retriever
from langchain_core.chat_history import BaseChatMessageHistory
from gtts import gTTS
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from PyPDF2 import PdfReader
from flask import send_from_directory
from flask_cors import CORS
import pyttsx3
from pydub import AudioSegment
import speech_recognition as sr
import logging
logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)
# Configurations
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['VECTORSTORE'] = './vector_index' # Store vectorstore here
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['VECTORSTORE'], exist_ok=True)
# Initialize embeddings and model
embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-base-en-v1.5")
# Load FAISS vectorstore dynamically
def load_vectorstore():
    vectorstore_path = app.config['VECTORSTORE']
    if os.path.exists(os.path.join(vectorstore_path, "index.faiss")):
        try:
            return FAISS.load_local(vectorstore_path, embeddings, allow_dangerous_deserialization=True)
        except Exception as e:
            print(f"Error loading FAISS index: {e}")
    print("No FAISS index found. Initializing empty vectorstore.")

    # Ensure a valid FAISS index with at least one dummy vector
    dummy_text = ["dummy"]
    dummy_vectorstore = FAISS.from_texts(dummy_text, embeddings)
    dummy_vectorstore.save_local(vectorstore_path)
    return dummy_vectorstore

app.config['VECTORSTORE'] = load_vectorstore()
model = ChatGroq(groq_api_key="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", model="llama-3.3-70b-versatile", temperature=0.5)

ALLOWED_EXTENSIONS = {'pdf'}

# Load or initialize FAISS vector store
try:
    app.config['VECTORSTORE'] = FAISS.load_local("./vector_index", embeddings,allow_dangerous_deserialization=True)
except Exception as e:
    print(f"Error loading vectorstore: {e}")

chat_history = []
store = {}

# Prompt template
retriever_prompt = (
    "Given a chat history and the latest user question which might reference context in the chat history, "
    "formulate a standalone question which can be understood without the chat history. "
    "Do NOT answer the question, just reformulate it if needed and otherwise return it as is."
)
BOT_TEMPLATE = """
Role: You are an AI Career Coach.
Task: Given the candidate's resume, provide a comprehensive summary that includes the following key aspects:
- Career Objective
- Skills and Expertise
- Professional Experience
- Educational Background
- Notable Achievements
Instructions:
Provide a concise summary of the resume, focusing on the candidate's skills, experience, and career trajectory.
Ensure the information is structured and easy to read.
Requirements:
{resume}
"""


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Helper function to retrieve session history
def get_session_history(session_id: str, max_history_length=5) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    else:
        # Limit history to the last `max_history_length` messages
        store[session_id].messages = store[session_id].messages[-max_history_length:]
    return store[session_id]


# Define routes
@app.route('/')
def index():
    return "Serving running"
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

@app.route('/upload', methods=['POST'])
def upload_file():
    print("Upload endpoint hit.")  # Debug point 1
    if 'file' not in request.files:
        print("No file in request.")  # Debug point 2
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '': 
        print("Empty filename.")  # Debug point 3
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(file.filename):
        print("File type not allowed.")  # Debug point 4
        return jsonify({"error": "Invalid file type"}), 400
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))

    print(f"Saving file to {file_path}")  # Debug point 5

    file.save(file_path)

    # Process uploaded file
    resume_text = extract_text_from_pdf(file_path)
    if not resume_text:
        print("Failed to extract text from PDF.")  # Debug point 6
        return jsonify({"error": "Failed to extract text from PDF"}), 500

    if resume_text:
        splitted_text = split_text(resume_text)
        try:

            if not os.path.exists("./vector_index"):
               os.makedirs("./vector_index")
            vectorstore = FAISS.from_texts(splitted_text, embeddings)
            vectorstore.save_local("./vector_index")
            app.config['VECTORSTORE'] = vectorstore
            print("Resume uploaded and processed successfully.")  # Debug point 7
            #pdf_url = url_for( filename=f'uploads/{secure_filename(file.filename)}')
            pdf_url = url_for('uploaded_file', filename=secure_filename(file.filename), _external=True)
            print(f"PDF URL: {pdf_url}")
            return jsonify({
                "message": "Resume uploaded successfully!",
                "pdf_url": pdf_url
            }), 200
             
        except Exception as e:
            print(f"Error processing resume: {e}")  # Debug point 8
            return jsonify({"error": f"Error processing resume: {e}"}), 500
       # return jsonify({"error": f"Error processing resume: {e}"}), 500
   # return render_template('ask.html',  pdf_url=pdf_url)

@app.route('/ask', methods=['POST'])
def ask_query():
    data = request.get_json()
    query = data.get('query', '')
    if not query:
        return jsonify({"error": "Query is empty"}), 400
    try:
        result = perform_qa(query)
        return jsonify({"response": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text.strip()
    except Exception as e:
        return f"Error extracting text: {e}"


def split_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    return splitter.split_text(text)


def perform_qa(query):
    
        # Combine documents and query to create context
    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return "Error: No resumes have been processed yet. Please upload a resume first."
    try:
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        docs = retriever.get_relevant_documents(query)

        if not docs:
            return "No relevant information found in the uploaded resumes."
        context = "\n".join(doc.page_content for doc in docs)
        contextualize_q_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", retriever_prompt+"\nContext:\n{context}"),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}"),
            ]
        )
        TEMPLATE = """
You are a highly intelligent and professional AI assistant that specializes in analyzing resumes and providing insightful, context-aware answers to user queries.
Your responsibilities include:
- Extracting relevant information from resumes.
- Providing career guidance and recommendations.
- Responding clearly, concisely, and professionally to user questions.
If the resume context does not contain sufficient information to answer the query, respond politely and suggest alternative ways to proceed.
"""

        history_aware_retriever = create_history_aware_retriever(model, retriever, contextualize_q_prompt)
        qa_prompt = ChatPromptTemplate.from_messages([
            ("system", TEMPLATE+ "\nContext:\n{context}"),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human",  "{input}"),
        ])

        # Initialize the chat model
        question_answer_chain = create_stuff_documents_chain(model, qa_prompt)
        chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
        chain_with_memory = RunnableWithMessageHistory(
            chain,
            get_session_history,  # Pass the modified function
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer",
        )
        result = chain_with_memory.invoke({"input": query,"context": context}, config={
        "configurable": {"session_id": "satish"}
    })
        return result["answer"]
    except Exception as e:
        return f"Error performing QA: {e}"
ATS_TEMPLATE  = """
Role: You are an AI Career Assistant.
Task: Analyze the provided resume stored in the vector index against the given job descriptiona and the job role. Compute the following dynamically based on the analysis:Avoid mentioning technical implementation details.
1. **Overall ATS Score**: Calculate an overall alignment score (out of 100) based on keyword matching, readability, ATS compatibility, and formatting alignment.
2. **Key Metrics**: Provide a detailed breakdown of scores for readability, keyword match percentage, and ATS compatibility.
3. **Matched and Missing Keywords**: Identify keywords, skills, and technologies from the resume that align with the job description and highlight any gaps.
4. **Format & Structure Analysis**: Evaluate the resume's structure, length, and formatting, identifying areas for improvement.
5. **Impact Analysis**: Highlight strong action-oriented phrases, identify weak or generic phrases, and suggest impactful replacements.
6. **Skills Gap Analysis**: Compare the skills currently in the resume against the required skills in the job description and suggest any missing or valuable skills to add.
7. **Actionable Recommendations**: Provide practical suggestions for enhancing the resume, including technical skills, phrasing, formatting, and alignment with the job description.
### Analysis Output Format:
####1.ATS Score:
    **Overall Score**: Dynamically computed based on the overall alignment between the resume and job description.
#### 2. **Key Metrics**:
    **Overall Match**: Calculated percentage of how well the resume aligns with the job description.
    **Readability Score**: Computed score based on sentence clarity, grammar, and flow.
    **ATS Compatibility Score**: Calculated score based on formatting, section structure, and compliance with ATS parsing.
#### 3. **Keyword Analysis**:
   - **Matched Keywords**:Dynamically identified keywords that exist in both the resume and job description.
   - **Missing Keywords**:Keywords from the job description not found in the resume.
#### 4. **Format & Structure Analysis**:
   Structure: Feedback on section organization, use of headings, and logical flow of content.
   Length: Assessment of whether the resume is concise, appropriate, or overly lengthy.
   Formatting Issues: Highlight specific areas needing improvement, such as inconsistent fonts, spacing, or unclear headings.
#### 5. **Impact Analysis**:
   - **Impactful Phrases**:
     Action verbs or strong results-oriented phrases identified in the resume.If multiple Phrases are present ,separte them with dollar symbol'$'.
   - **Weak Phrases**:
     Generic, vague, or overused phrases with specific recommendations for replacements.If multiple Phrases are present separte them with  dollar symbol'$'.
#### 6. **Skills Gap Analysis**:
   - **Present Skills**: Skills currently listed in the resume.
   - **Suggested Skills**: Skills and technologies from the job description or industry trends that are missing and recommended to include.
#### 7. **Actionable Recommendations**:
   - Keyword Optimization: Add missing keywords to improve alignment, e.g., {examples based on missing keywords}.
   - Technical Enhancements: Incorporate specific tools, frameworks, or technologies from the job description or industry best practices.
   - Soft Skills & Phrasing: Replace weak phrases with more impactful alternatives and add role-specific soft skills.
   - Format Improvements : Provide specific suggestions to improve visual clarity, use of bullet points, section alignment, or headers.
   - Summary Section: Add or refine a summary to emphasize key achievements, technologies, and alignment with the job role.
   - Project/Experience Details: Add measurable results or achievements to demonstrate impact, e.g., percentage improvements, revenue growth, or cost reductions.
#### 8. **Industry-Specific Feedback**:
   - Provide customized insights based on the job description and industry standards, focusing on technologies, certifications, methodologies, or soft skills critical to the role.
---
### **Implementation Notes**:
1. **Dynamic Computation**:
   - Use the vector index to retrieve the resume's content and compare it with the job description for keyword matches, missing skills, and alignment.
   - Calculate scores for readability, keyword matching, and ATS compatibility dynamically.
2. **Keyword Matching**:
   - Tokenize and preprocess the resume and job description for accurate keyword extraction.
   - Compute a similarity score using cosine similarity or another metric on vector embeddings.
3. **Key Metrics Calculation**:
   - **Readability Score**: Use text analysis tools like Flesch-Kincaid or GPT-based evaluation.
   - **ATS Compatibility**: Check formatting aspects such as headers, bullet points, length, and use of standard sections.
   - **Overall Match**: Compute as a weighted average of keyword match percentage, readability score, and ATS compatibility.
4. **Actionable Insights**:
   - Focus on delivering **specific, role-aligned, and quantifiable** recommendations for improving the resume.
5. **Positive Tone**:
   - Ensure feedback is constructive, highlighting strengths while offering practical solutions for weaknesses.
6.- Focus solely on resume analysis and actionable feedback.
- Do not include implementation details or computation methods in output
---
### Example Output (Generated Dynamically)
#### .1 ATS Score:
   **Overall Score**: 78%
#### 2. **Key Metrics**:
   **Overall Match**: 72%
   **Readability Score**: 80%
  **ATS Compatibility Score**: 85%
#### 3. **Keyword Analysis**:
   Matched Keywords:Python, Java, Machine Learning, SQL, REST APIs
   Missing Keywords:Docker, Kubernetes, CI/CD, Agile Methodologies
#### 4. **Format & Structure Analysis**:
     Structure: Clear sections but lacks a professional summary.
     Length   : Appropriate for 1-page length.
     Formatting Issues: Inconsistent use of bullet points and spacing.
#### 5. **Impact Analysis**:
   - **Impactful Phrases**:Developed RESTful APIs to streamline data processing, reducing time by 40%.$Led a team of 10 engineers to complete a critical project three weeks ahead of schedule.$Optimized database queries, resulting in a 25% performance improvement across key workflows."
   - **Weak Phrases**:Good at teamwork → Suggest → Collaborated with cross-functional teams to achieve project goals.$Hardworking → Suggest → Demonstrated consistent dedication by exceeding quarterly targets by 15%.$Responsible for reports → Suggest → Prepared detailed financial reports that informed strategic decision-making.
#### 6. **Skills Gap Analysis**:
   - **Present Skills**: Python, Java, SQL, REST APIs
   - **Suggested Skills**: Docker, Kubernetes, CI/CD, Agile
#### 7. Actionable Recommendations:
   - Add missing keywords like Docker and Kubernetes.
   - Improve phrasing of achievements with measurable outcomes.
   - Add a summary section to highlight key strengths.
   - Format bullet points consistently for better readability.
   -Specific recommendations to improve the resume.
#### 8. **Industry-Specific Feedback**:
   - Emphasize experience with Agile methodologies for roles in software development teams.
   - Highlight certifications like AWS or Azure for cloud-related roles.
Resume:
{resume}
Job Description:
{job_description}
Job Role: 
{job_role}
"""

# Route: Analyze resume against job description
@app.route('/analyze', methods=['POST'])
def analyze_resume():
    data = request.get_json()
    job_role = data.get('job_role', '')
    job_description = data.get('job_description', '')

    if not job_description or not job_role:
        return jsonify({"error": "Job description or role is empty"}), 400

    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return jsonify({"error": "No resumes have been processed yet. Please upload a resume first."}), 400

    try:
        # Retrieve relevant documents
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        docs = retriever.get_relevant_documents(job_description)

        # Check if docs are valid
        if not docs or any(not doc.page_content for doc in docs):
            return jsonify({"error": "No relevant content found in the uploaded resumes."}), 400

        # Generate the context
        context = "\n".join(doc.page_content for doc in docs if doc.page_content)
        job_keywords = set(job_description.lower().split())  # Basic keyword extraction
        resume_keywords = set(context.lower().split())       # Basic keyword extraction

        missing_keywords = job_keywords - resume_keywords
        examples_based_on_missing_keywords = [f"Add specific examples that demonstrate expertise in '{kw}'." for kw in missing_keywords]
        if not context.strip():
            return jsonify({"error": "Generated context is empty."}), 400
        # Dynamically replace placeholders in ATS_TEMPLATE
        ats_prompt_text = ATS_TEMPLATE.replace("{resume}", context).replace("{job_description}", job_description).replace("{job_role}", job_role)
        ats_prompt_text = ats_prompt_text.replace("{examples based on missing keywords}", "\n".join(examples_based_on_missing_keywords))
        # Debugging ATS Prompt Text
      #  logging.debug(f"ATS Prompt Text: {ats_prompt_text}")
        # Create the prompt using PromptTemplate
        from langchain.prompts import PromptTemplate
        ats_prompt = PromptTemplate(template=ats_prompt_text, input_variables=[])
        # Generate ATS Score and Recommendations
        from langchain.chains import LLMChain
        ats_chain = LLMChain(llm=model, prompt=ats_prompt)
        # Ensure job_description is passed correctly
        result = ats_chain.run({"job_description": job_description})
        impactful_phrases = []
        weak_phrases = []
        present_skills = []
        recommended_skills = []
        scores = {
            "Overall Score": None,
            "Readability Score": None,
            "ATS Compatibility Score": None,
            "Overall Match": None
        }
        # Extracting scores using string manipulation (or regex if necessary)
        for line in result.splitlines():
            if "Overall Score" in line:
                scores["Overall Score"] = int(line.split(":")[1].strip().replace("%", ""))
            elif "Readability Score" in line:
                scores["Readability Score"] = int(line.split(":")[1].strip().replace("%", ""))
            elif "ATS Compatibility Score" in line:
                scores["ATS Compatibility Score"] = int(line.split(":")[1].strip().replace("%", ""))
            elif "Overall Match" in line:
        
                scores["Overall Match"] = int(line.split(":")[1].strip().replace("%", ""))
       
            matched_keywords = [] 
            missing_keywords = []

            for line in result.splitlines():
              if "Matched Keywords" in line:
        # Extract and process matched keywords
                 keywords_list = line.split(":")[1].strip()
                 matched_keywords.extend([kw.strip() for kw in keywords_list.split(",") if kw.strip()])

              elif "Missing Keywords" in line:
        # Extract and process missing keywords
                       keywords_list = line.split(":")[1].strip()
                       missing_keywords.extend([kw.strip() for kw in keywords_list.split(",") if kw.strip()])


        '''logging.debug(result)
        logging.debug("Type of result: %s", type(result))'''
        weak_phrases=[]
        impactful_phrases=[]
        present_skills=[]
        recommended_skills=[]
       
        for line in result.splitlines():
           phrases_list1=[]
           phrases_list2=[]
           skills_list1 = []
           skills_list2 = []
           


           if "Impactful Phrases" in line:
        # Extract and process impactful phrases
             phrases_list1 = line.split(":")[1].strip()
             if phrases_list1:
                 impactful_phrases.extend([phrase.strip() for phrase in phrases_list1.split("$") if phrase.strip()])
           elif "Weak Phrases" in line:
        # Extract and process weak phrases
               phrases_list2 = line.split(":")[1].strip()
               if phrases_list2:
                   weak_phrases.extend([phrase.strip() for phrase in phrases_list2.split("$") if phrase.strip()])
           elif "Present Skills" in line:
        # Extract and process present skills
                skills_list1 = line.split(":")[1].strip()
                if skills_list1:
                    present_skills.extend([skill.strip() for skill in skills_list1.split(",") if skill.strip()])
           elif "Suggested Skills" in line:
        # Extract and process suggested skills
             skills_list2 = line.split(":")[1].strip()
             if skills_list2:
                   recommended_skills.extend([skill.strip() for skill in skills_list2.split(",") if skill.strip()])
        industry_specific_feedback = []

        acrec=[] 
        for line in result.splitlines():
                   if "Actionable Recommendations" in line:
        # Start extracting feedback after the header
                        feedback_start_index = result.splitlines().index(line) + 1
                        for feedback_line in result.splitlines()[feedback_start_index:]:
                           feedback_line = feedback_line.strip().lstrip('- ') 
                           if "Industry-Specific Feedback" in feedback_line:  # Stop when the next section starts
                               break
                           if feedback_line:  # Ensure the line is not empty
                               acrec.append(feedback_line)

# Extracting industry-specific feedback using string manipulation
        for line in result.splitlines():
                   if "Industry-Specific Feedback" in line:
        # Start extracting feedback after the header
                        feedback_start_index = result.splitlines().index(line) + 1
                        for feedback_line in result.splitlines()[feedback_start_index:]:
                           feedback_line = feedback_line.strip().lstrip('- ') 
                           if feedback_line:  # Ensure the line is not empty
                # Add each feedback line to the list
                            industry_specific_feedback.append(feedback_line)  
# Log the extracted information for debugging
        logging.debug("Impactful Phrases: %s", impactful_phrases)
        logging.debug("Weak Phrases: %s", weak_phrases)
        logging.debug("Present Skills: %s", present_skills)
        logging.debug("Recommended Skills: %s", recommended_skills)
        logging.debug("Industry-Specific Feedback: %s", industry_specific_feedback)
# Combine structured data and human-readable result
        response = {
    "scores": scores,
    "analysis": result,
    "MatchedKeywords": matched_keywords,
    "MissingKeywords": missing_keywords,
    "ImpactfulPhrases": impactful_phrases,
    "WeakPhrases": weak_phrases,
    "PresentSkills": present_skills,
    "RecommendedSkills": recommended_skills,
    "IndustrySpecificFeedback":industry_specific_feedback,
    "actionrecomendation":acrec
}


       

        return jsonify(response), 200

    except Exception as e:
        logging.error(f"Error during resume analysis: {e}")
        return jsonify({"error": "An unexpected error occurred during analysis."}), 500


    
@app.route('/generate_techquestions', methods=['POST'])
def generate_interview_questions():
    data = request.get_json()
    job_role = data.get('job_role', '')
    job_description = data.get('job_description', '')

    if not job_description or not job_role:
        return jsonify({"error": "Job description or role is empty"}), 400
    

    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return jsonify({"error": "No resumes have been processed yet. Please upload a resume first."}), 400

    try:
        # Retrieve relevant documents
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        docs = retriever.get_relevant_documents(job_description)

        # Generate context from relevant documents
        context = "\n".join(doc.page_content for doc in docs if doc.page_content)
        if not context.strip():
            return jsonify({"error": "No relevant content found in the uploaded resumes."}), 400

        # Generate interview questions
        questions_prompt = f"""
Given the following job role and job description:
Job Role:
{job_role}
Job Description:
{job_description}
And this resume content:
{context}
Generate a comprehensive list of technical interview questions and answers, following these guidelines:
1. **Technical Questions**:
   - Focus on skills, technologies, projects, and expertise mentioned in the job description and resume.
   - Ensure questions reflect practical, real-world scenarios or problem-solving skills.
2. **Answer Structure**:
   - Provide concise, practical, and confident answers.
   - Keep answers between 3-5 lines.
   - Use clear and professional language.
3. **Sample Topics** (based on relevance to the role and resume):
   - Programming concepts, algorithms, and data structures.
   - Software design patterns, architectures, and methodologies.
   - Database design, queries, and optimization.
   - Problem-solving scenarios and debugging techniques.
   - Project management, teamwork, and communication skills.
   - Any specialized tools, frameworks, or technologies mentioned in the job description or resume.
Output the questions and answers in the following format:
Q: [Technical question here]
A: [Concise and practical answer]
Q: [Another technical question here]
A: [Another concise and practical answer]
Ensure all questions are highly relevant to the job role and showcase expertise in the domain.
"""

        from langchain.prompts import PromptTemplate
        prompt_template = PromptTemplate(template=questions_prompt, input_variables=[])
        from langchain.chains import LLMChain
        question_chain = LLMChain(llm=model, prompt=prompt_template)
        result = question_chain.run({})

        # Parse the result
        questions = [q.strip() for q in result.split("\n") if q.strip()]
        return jsonify({"questions": questions})

    except Exception as e:
        logging.error(f"Error generating interview questions: {str(e)}")
        return jsonify({"error": "Failed to generate interview questions!"}), 500
@app.route('/generate_hrquestions', methods=['POST'])
def generate_interview2_questions():
    data = request.get_json()
    job_role = data.get('job_role', '')
    job_description = data.get('job_description', '')

    if not job_description or not job_role:
        return jsonify({"error": "Job description or role is empty"}), 400
    

    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return jsonify({"error": "No resumes have been processed yet. Please upload a resume first."}), 400

    try:
        # Retrieve relevant documents
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        docs = retriever.get_relevant_documents(job_description)

        # Generate context from relevant documents
        context = "\n".join(doc.page_content for doc in docs if doc.page_content)
        if not context.strip():
            return jsonify({"error": "No relevant content found in the uploaded resumes."}), 400

        # Generate interview questions
        questions_prompt = f"""
Given the following job role and job description:  
**Job Role**: {job_role}  
**Job Description**: {job_description}  
And this resume content:  
{context}  
Generate a comprehensive list of HR interview questions and their answers. 
- Do not include any headings or section titles like "Generated Interview Questions,Introduction and Career Goals" or "Project Experience and Problem-Solving" between the questions and answers.   
- Focus only on directly providing a seamless list of question-answer pairs.  
HR Questions
Focus on:  
1. Behavioral and situational aspects tailored to the job description.  
2. Aligning with the candidate's skills, achievements, and experience as detailed in the resume.  
3. Addressing topics such as teamwork, problem-solving, leadership, adaptability, time management, and motivation.  
Answer Guidelines  
- Provide concise, professional, and thoughtful answers.  
- Ensure answers reflect the candidate's expertise, confidence, and relevance to the job role.  
- Tailor responses to highlight key strengths and achievements from the resume.  
- Emphasize alignment with the company's goals, values, and expectations.  
examples:
 Q: What inspired you to apply for this role at our company?  
   A: Answer aligned with job description and candidate experience 
 Q: Can you describe a challenging project you worked on and how you handled it?  
   A: Answer leveraging key project details from the resume
 Q: How do you stay updated with industry trends and emerging technologies?  
   A: Answer reflecting professional development efforts
 Q: Tell me about a time you had to resolve a conflict in a team. What was the outcome?  
   A: Answer highlighting teamwork and conflict-resolution skills
 Q: How do you prioritize tasks when managing multiple deadlines?  
   A: Answer demonstrating organizational and time-management skills
**Example Questions & Answers**:  
   Q: What are your long-term career goals as a software engineer?
A: My long-term career goal is to become a senior software engineer, where I can lead projects and mentor junior developers. I aim to continuously improve my skills in software development and machine learning, contributing to innovative projects that have a real impact on users.
Q: What attracted you to apply for this position at our company?
A: I was attracted by your company's commitment to innovation and quality software solutions. The projects you undertake align with my interests in machine learning and software development, and I believe my skills can contribute effectively to your team.
Q: How do you plan to continue your professional development in software engineering?
A: I plan to pursue further certifications in advanced programming languages and machine learning frameworks. Additionally, I intend to attend industry conferences and participate in hackathons to learn from peers and stay updated with the latest technologies.
Q: How do you see yourself contributing to our company culture?
A: I believe in collaboration and open communication, which I see as vital to a strong company culture. I would actively participate in team-building activities and promote a positive work environment by sharing knowledge and encouraging others.
Q: What motivates you to work in the field of software engineering?
A: I am motivated by the challenges that come with solving complex problems and the impact my work can have on people's lives. The continuous learning aspect of technology also excites me, as there's always something new to explore.
Q: Describe a time when you had to lead a team project. What was your role and the outcome?
A: In my college project on the Library Management System, I led a team of four. I coordinated tasks, ensured deadlines were met, and facilitated communication. The project was completed on time and received positive feedback for its user-friendly interface.
Q: Can you provide an example of a conflict you faced in a project and how you resolved it?
A: During the development of the Facial Biometrics Attendance System, there was a disagreement about the technology stack. I organized a meeting to discuss the pros and cons of each option, allowing everyone to voice their opinions. We ultimately reached a consensus on using the HOG algorithm.
Q: Tell me about a time you worked as part of a team to achieve a goal. What was your contribution?
A: In my internship at Indian Servers, I worked with a team to develop the Medibot conversational agent. I was responsible for implementing the natural language processing feature, and my contributions helped the bot understand and respond accurately to user queries.
Q: Describe a situation where you had to manage multiple tasks. How did you prioritize?
A: While working on my final year project and preparing for exams, I created a schedule that allocated specific time blocks for each task. I prioritized urgent deadlines first and used tools like Trello to track my progress, which helped me manage my time effectively.
Q: Give an example of a project you managed from start to finish. What challenges did you face?
A: I managed the Library Management System project, where I faced challenges with coordinating between team members. I implemented regular check-ins to keep everyone updated on progress and address issues quickly, which ultimately led to a successful project completion.
Q: Have you ever had to adapt to a significant change in a project? How did you handle it?
A: Yes, during the Medibot project, we had to switch the primary programming language mid-way due to performance issues. I quickly adapted by learning the new language through online tutorials and collaborating with my team to ensure a smooth transition.
Q: Imagine you are assigned a project with a tight deadline. How would you ensure its timely completion?
A: I would break the project into smaller tasks, assign deadlines for each, and prioritize based on complexity. Regular check-ins with the team would help monitor progress and address any roadblocks promptly. If necessary, I would be open to working extra hours to meet the deadline.
Q: You notice a team member is struggling with their tasks. How would you approach this situation?
A: I would approach the team member privately and express my concern. I would offer assistance and encourage them to share any difficulties they are facing. If needed, I would suggest discussing it with our supervisor to find a feasible solution together.
Q: How would you handle a disagreement with a colleague about the direction of a project?
A: I would suggest a meeting to discuss our differing viewpoints openly. I would listen to their perspective and present my rationale, aiming to find common ground. If no resolution is reached, I would involve a supervisor for additional input.
Q: You are overwhelmed with work and facing burnout. What steps would you take to manage your workload?
A: I would take a step back to assess my priorities and see if I can delegate any tasks. I would also communicate with my manager about my situation to explore options for spreading out deadlines. Additionally, I would ensure to take breaks to recharge.
Q: You are asked to work overtime on a project but have prior commitments. How would you handle this?
A: I would first assess my commitments and then communicate openly with my manager about my situation. I would express my willingness to help but also discuss the possibility of adjusting deadlines or redistributing tasks to accommodate my prior commitments.
Q: You discover that a colleague is not following the company's ethical guidelines. What would you do?
A: I would approach the colleague privately to discuss my observations and understand their perspective. If the issue persists, I would escalate the matter to a supervisor or HR, as it is important to uphold the company's ethical standards
"""


        from langchain.prompts import PromptTemplate
        prompt_template = PromptTemplate(template=questions_prompt, input_variables=[])
        from langchain.chains import LLMChain
        question_chain = LLMChain(llm=model, prompt=prompt_template)
        result = question_chain.run({})

        # Parse the result
        questions = [q.strip() for q in result.split("\n") if q.strip()]
        return jsonify({"questions": questions})

    except Exception as e:
        logging.error(f"Error generating interview questions: {str(e)}")
        return jsonify({"error": "Failed to generate interview questions!"}), 500

@app.route('/generate-questions', methods=['POST'])
def generate_questions():
    data = request.get_json()
    job_role=data.get(  'job_role','')
    job_description = data.get('job_description', '')

    if not job_description:
        return jsonify({"error": "Resume data is empty"}), 400

    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return jsonify({"error": "No vectorstore initialized"}), 400

    try:
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        docs = retriever.get_relevant_documents(job_description)
        context = "\n".join(doc.page_content for doc in docs if doc.page_content)

        if not context.strip():
            return jsonify({"error": "No relevant content found in the vectorstore"}), 400

        questions_prompt = f"""
       Given the following job role and job description:
Job Role:
{job_role};
Job Description:      
{job_description}
And this resume content:
{context}
Generate a five best practical, and relevant interview questions tailored to assess the candidate's qualifications and fit for the role. Avoid headings or categorization and provide only the questions directly.
        """

        from langchain.prompts import PromptTemplate
        from langchain.chains import LLMChain

        prompt_template = PromptTemplate(template=questions_prompt, input_variables=[])
        question_chain = LLMChain(llm=model, prompt=prompt_template)
        result = question_chain.run({})

        questions = [q.strip() for q in result.split("\n") if q.strip()]
        print("Generated questions:", questions)

        logging.debug(questions)
        return jsonify({"questions": questions})

    except Exception as e:
        logging.error(f"Error generating questions: {str(e)}")
        return jsonify({"error": "Failed to generate questions"}), 500


# Route to submit answers for the interview
@app.route('/submit-interview', methods=['POST'])
def submit_interview():
    data = request.get_json()
    job_role=data.get(  'job_role','')
    results = data.get('results', [])  # List of { "question": "...", "answer": "..." }
    job_description = data.get('job_description', '')

    if not results:
        return jsonify({"error": "No answers submitted"}), 400

    # Check for vectorstore availability
    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return jsonify({"error": "No vectorstore initialized"}), 400

    try:
        # Initialize analysis results
        analysis_results = []

        # Prepare the retriever for resume content
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})

        # Iterate through each question-answer pair
        for qa in results:
            question = qa.get("question", "")
            answer = qa.get("answer", "")

            if not question or not answer:
                analysis_results.append({"error": "Question or answer missing for a pair"})
                continue

            # Retrieve relevant resume content
            docs = retriever.get_relevant_documents(question)
            resume_context = "\n".join(doc.page_content for doc in docs if doc.page_content)

            if not resume_context.strip():
                resume_context = "No relevant resume data found."

            # Construct evaluation prompt
            evaluation_prompt = f"""
            Analyze the following interview question and answer with the provided context:
            Job Role:{job_role}
            Job Description: {job_description}
            Relevant Resume Content: {resume_context}
            Question: {question}
            Answer: {answer}
            Provide an analysis with the following details and also ensure no stars or special symbols in the ouput:
            - Relevance to the question.
            - Depth and understanding of the subject.
            - Clarity and structure of the response.
            - Alignment with the job description and resume content.
            Provide scores for each category (out of 10) and a summary of feedback.
            """

            from langchain.prompts import PromptTemplate
            from langchain.chains import LLMChain

            # Create the prompt and chain
            prompt_template = PromptTemplate(template=evaluation_prompt, input_variables=[])
            evaluation_chain = LLMChain(llm=model, prompt=prompt_template)

            # Run the analysis
            analysis = evaluation_chain.run({})
            analysis_results.append({
                "question": question,
                "answer": answer,
                "resume_context": resume_context,
                "analysis": analysis
            })

        # Save results or perform further actions if needed
        logging.info("Detailed interview analysis: %s", analysis_results)
        # Return analysis
        return jsonify({"message": "Interview analysis completed successfully!", "analysis": analysis_results}), 200

    except Exception as e:
        logging.error(f"Error analyzing interview answers: {str(e)}")
        return jsonify({"error": "Failed to analyze interview answers"}), 500

@app.route('/generate_cover_letter', methods=['POST'])
def generate_cover_letter():
    data = request.get_json()
    job_role = data.get('job_role', '')
    job_description = data.get('job_description', '')
    company_name = data.get('company_name', '')
    length = data.get('length', 'normal').lower()  # Default to 'normal' if length is not provided

    if not job_role or not job_description or not company_name:
        return jsonify({"error": "All inputs (job role, job description, and company name) are required."}), 400

    # Retrieve context from uploaded resumes
    vectorstore = app.config['VECTORSTORE']
    if vectorstore is None:
        return jsonify({"error": "No resumes have been processed yet. Please upload a resume first."}), 400
    length_prompts = {
            "small": "Write a concise cover letter (maximum 150 words).",
            "normal": "Write a standard-length professional cover letter (around 300 words).",
            "large": "Write a detailed and comprehensive cover letter (around 500 words)."
        }

    try:
        # Fetch relevant resume data
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        docs = retriever.get_relevant_documents(job_description)

        # Combine relevant content from resumes
        context = "\n".join(doc.page_content for doc in docs if doc.page_content)
        if not context.strip():
            return jsonify({"error": "No relevant content found in the uploaded resumes."}), 400

        # Generate the cover letter
        cover_letter_prompt = f"""
        Generate a professional cover letter using the following details:
        Job Role: {job_role}
        Company Name: {company_name}
        Job Description: {job_description}
        Resume Context: {context}
          {length_prompts[length]}
        Ensure the tone is professional, concise, and tailored to the job role and company.
        """

        from langchain.prompts import PromptTemplate
        from langchain.chains import LLMChain

        prompt_template = PromptTemplate(template=cover_letter_prompt, input_variables=[])
        cover_letter_chain = LLMChain(llm=model, prompt=prompt_template)
        result = cover_letter_chain.run({})

        return jsonify({"cover_letter": result}), 200

    except Exception as e:
        logging.error(f"Error generating cover letter: {str(e)}")
        return jsonify({"error": "Failed to generate cover letter."}), 500

    
from pydub import AudioSegment
tts_engine = pyttsx3.init()

# Set TTS parameters
tts_engine.setProperty('rate', 150)  # Speed
tts_engine.setProperty('volume', 1)  # Volume
@app.route("/voice", methods=["POST"])
def voice():
    recognizer = sr.Recognizer()
    audio_file = request.files.get("audio", None)
    #selected_lang = request.form.get("language", default_language)


    if not audio_file:
        logging.error("No audio received")
        return jsonify({"error": "No audio received"}), 400

    try:
        # Save the audio temporarily
        audio_path = "static/temp_audio2.webm"
        audio_file.save(audio_path)

        # Convert audio to WAV using pydub
        wav_path = "static/temp_audio2.wav"
        AudioSegment.from_file(audio_path).export(wav_path, format="wav")

        # Process the WAV file with speech_recognition
        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)

        # Get chatbot response
        session_id = "default_session"
        response = perform_qa(text)
        # Convert response to speech
        # Remove asterisks from the response
        cleaned_response = response.replace("*", "")

# Convert the cleaned response to speech
        tts = gTTS(text=cleaned_response, lang="en", slow=False)
        #tts = gTTS(text=response, lang="en", slow=False)
        #tts_engine.runAndWait()
        tts.save("static/response2.mp3")
        
        return jsonify({
            "userMessage": text,  # Add the transcription
            "response": response,
            "audio": "/static/response2.mp3"
        })
    except Exception as e:
        logging.error(f"Server error: {e}")
        return jsonify({"error": f"Server error: {e}"}), 500


@app.route('/read-question', methods=['POST'])
def read_question():
    try:
        data = request.get_json()
        question = data.get('question', '')

        if not question:
            return jsonify({"error": "No question provided"}), 400

        # Generate audio using gTTS
        tts = gTTS(text=question, lang='en', slow=False)
        #temp_audio_path = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3').name
        audio_path = "static/response.mp3"
        tts.save("static/response.mp3")
        # Send audio file path
        return jsonify({"audio_path": "/static/response.mp3"})
    except Exception as e:
        logging.error(f"Error generating question audio: {str(e)}")
        return jsonify({"error": "Failed to read question"}), 500

'''
@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    recognizer = sr.Recognizer()
    audio_file = request.files.get("audio", None)
    if not audio_file:
        logging.error("No audio received")
        return jsonify({"error": "No audio received"}), 400
    try:
        # Simulated audio file for transcription (replace with actual recorded file path)
        audio_file_path =  "static/temp_audio.webm"
        audio_file.save(audio_path)
        # Transcribe audio using Whisper API
        wav_path = "static/temp_audio.wav"
        AudioSegment.from_file(audio_path).export(wav_path, format="wav")
        # Process the WAV file with speech_recognition
        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)
       
        transcript = text
        return jsonify({"transcript": transcript})
    except Exception as e:
        logging.error(f"Error stopping recording: {str(e)}")
        return jsonify({"error": "Failed to stop recording"}), 500'''
'''
@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    # Load Whisper model
    model = whisper.load_model("base")  # You can change the model to "small", "medium", or "large" based on your needs.
    audio_file = request.files.get("audio", None)
    if not audio_file:
        logging.error("No audio received")
        return jsonify({"error": "No audio received"}), 400
    try:
        # Save the uploaded audio file temporarily
        audio_path = "static/temp_audio.webm"
        audio_file.save(audio_path)
        # Convert the WebM file to WAV using pydub
        wav_path = "static/temp_audio.wav"
        AudioSegment.from_file(audio_path).export(wav_path, format="wav")
        # Use Whisper to transcribe the audio
        result = model.transcribe(wav_path)
        transcript = result.get("text", "")
        # Return the transcription
        return jsonify({"transcript": transcript})
    except Exception as e:
        logging.error(f"Error processing audio: {str(e)}")
        return jsonify({"error": "Failed to process audio"}), 500  '''

import tempfile



logging.basicConfig(level=logging.INFO)


@app.route('/start-recording', methods=['POST'])
def start_recording():
    try:
        return jsonify({"message": "Recording started... Speak now!"}), 200
    except Exception as e:
        logging.error(f"Error starting recording: {str(e)}")
        return jsonify({"error": "Failed to start recording"}), 500

'''@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    audio_file = request.files.get("audio", None)
    if not audio_file:
        logging.error("No audio received")
        return jsonify({"error": "No audio received"}), 400
    try:
        # Save and convert audio
        with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as temp_audio_file:
            audio_file.save(temp_audio_file.name)
            wav_path = temp_audio_file.name.replace(".webm", ".wav")
            AudioSegment.from_file(temp_audio_file.name).export(wav_path, format="wav")
        # Transcribe audio
        result = whisper_model.transcribe(wav_path)
        transcript = result.get("text", "")
        # Clean up temporary files
        os.remove(temp_audio_file.name)
        os.remove(wav_path)
        return jsonify({"transcript": transcript}), 200
    except Exception as e:
        logging.error(f"Error processing audio: {str(e)}")
        return jsonify({"error": "Failed to process audio"}), 500
'''
@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    recognizer = sr.Recognizer()
    audio_file = request.files.get("audio", None)
    if not audio_file:
        logging.error("No audio received")
        return jsonify({"error": "No audio received"}), 400
     
    try:
        # Save the audio temporarily
        audio_path = "static/temp_audio.webm"
        audio_file.save(audio_path)

        # Convert audio to WAV using pydub
        wav_path = "static/temp_audio.wav"
        AudioSegment.from_file(audio_path).export(wav_path, format="wav")

        # Process the WAV file with speech_recognition
        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)
        return jsonify({"transcript": text}), 200
    except Exception as e:
        logging.error(f"Server error: {e}")
        return jsonify({"error": f"Server error: {e}"}), 500

@app.route('/generate', methods=['POST'])
def generate_resume():
    user_data = request.json
    # Process and save user data
    return jsonify({"message": "Resume data received!", "data": user_data})
if __name__ == "__main__":
   app.run(debug=True)    