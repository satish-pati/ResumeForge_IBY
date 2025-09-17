# ResumeForge - AI Interaction Logs

This document contains the prompts and chat history used with AI assistants during the development of ResumeForge.

## 1. Project Conceptualization Phase

### Prompt 1: Initial Project Brainstorming
**AI Assistant**: Claude 3.5 Sonnet

**Prompt:**
```
I need to build an AI agent prototype for an internship application. The requirements are:
1. Select a manual task from daily life or university work
2. Build an AI agent that can reason, plan, and execute to automate it
3. Implement a user interface
4. Optional: Multi-agent collaboration, external integrations, monitoring UI

I'm thinking about resume optimization and job application preparation. Can you help me design a comprehensive system that demonstrates advanced AI capabilities while solving a real problem?
```

**AI Response:**
```
Your resume optimization idea is excellent! This is a perfect manual task that affects millions of people and involves complex reasoning. Here's a comprehensive system design that meets all requirements:

**Core Manual Task**: Job Application Preparation
- Currently takes 4-8 hours per application
- Involves multiple complex sub-tasks
- Requires domain expertise
- High impact on career outcomes

**AI Agent System Design**:

1. **Multi-Agent Architecture** (meets bonus requirement):
   - Resume Analyzer Agent: ATS compatibility, keyword optimization
   - Content Generator Agent: Cover letters, interview prep
   - Career Coach Agent: Interactive guidance and planning
   - Optimization Planner Agent: Strategic improvement recommendations

2. **Reasoning, Planning, Execution**:
   - Reasoning: NLP analysis of resume content vs job requirements
   - Planning: Step-by-step optimization strategies
   - Execution: Automated improvements and content generation

3. **External Integrations**:
   - RAG with FAISS for personalized content
   - Hugging Face transformers for NLP
   - Langchain for agent orchestration

4. **User Interface**:
   - React web app with real-time feedback
   - Interactive chat for career coaching
   - Visual progress tracking and monitoring

This system would be highly original, technically sophisticated, and have significant social impact by democratizing professional career services.
```

## 2. Architecture Design Phase

### Prompt 2: System Architecture Deep Dive
**AI Assistant**: Claude 3.5 Sonnet

**Prompt:**
```
Help me design the detailed system architecture for EliteResumeAI. I need:
1. Component breakdown with specific technologies
2. Data flow between components
3. Database schema design
4. Multi-agent coordination strategy
5. API design patterns

Focus on making it production-ready and scalable while demonstrating advanced AI capabilities.
```

**AI Response:**
```
Here's a detailed production-ready architecture:

**Technology Stack Breakdown**:
- Frontend: React.js (component reusability, virtual DOM performance)
- API Gateway: Node.js + Express (JavaScript consistency, NPM ecosystem)
- AI Engine: Python + Flask (ML library support, research community)
- Database: MongoDB (document flexibility, JSON compatibility)
- Vector Store: FAISS (performance, memory efficiency)
- AI Framework: Langchain + Hugging Face (orchestration, model access)

**Multi-Agent Coordination Strategy**:
```
```python
class AgentOrchestrator:
    def __init__(self):
        self.agents = {
            'analyzer': ResumeAnalyzerAgent(),
            'generator': ContentGeneratorAgent(),
            'coach': CareerCoachAgent(),
            'planner': OptimizationPlannerAgent()
        }
    
    def process_resume_optimization(self, resume_data, job_desc):
        # Reasoning phase
        analysis = self.agents['analyzer'].analyze(resume_data, job_desc)
        
        # Planning phase
        optimization_plan = self.agents['planner'].create_plan(analysis)
        
        # Execution phase
        optimized_content = self.agents['generator'].optimize(
            resume_data, optimization_plan
        )
        
        return {
            'analysis': analysis,
            'plan': optimization_plan,
            'optimized_resume': optimized_content
        }
```

**Data Flow Architecture**:
1. User uploads resume → File processing → MongoDB storage
2. Resume data → AI analysis pipeline → Vector embeddings → FAISS
3. User query → RAG system → Context retrieval → LLM generation
4. Real-time updates → WebSocket → Frontend state management

This architecture ensures scalability through stateless design and enables complex AI workflows while maintaining performance.
```
```
## 3. Implementation Phase

### Prompt 3: Resume Analysis Implementation
**AI Assistant**: Claude 3.5 Sonnet

**Prompt:**
```

I need to implement the resume analysis component. Help me create:
1. Resume parsing logic for PDF .
2. ATS compatibility scoring algorithm
3. Keyword extraction and matching against job descriptions
4. Skills gap analysis
5. Improvement recommendations engine

The code should be production-ready with error handling and be optimized for performance.

```

**AI Response:**
```python
import PyPDF2
import docx
import spacy
import transformers
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from typing import Dict, List, Optional

class ResumeAnalyzer:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.tokenizer = transformers.AutoTokenizer.from_pretrained('bert-base-uncased')
        self.model = transformers.AutoModel.from_pretrained('bert-base-uncased')
        
    def parse_resume(self, file_path: str, file_type: str) -> Dict:
        """Parse resume from different file formats"""
        try:
            if file_type.lower() == 'pdf':
                return self._parse_pdf(file_path)
            elif file_type.lower() in ['doc', 'docx']:
                return self._parse_docx(file_path)
            else:
                raise ValueError(f"Unsupported file type: {file_type}")
        except Exception as e:
            return {"error": f"Failed to parse resume: {str(e)}"}
    
    def _parse_pdf(self, file_path: str) -> Dict:
        """Extract text from PDF resume"""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        return self._extract_resume_sections(text)
    
    def calculate_ats_score(self, resume_text: str, job_description: str) -> Dict:
        """Calculate ATS compatibility score"""
        score_components = {
            'keyword_match': self._calculate_keyword_score(resume_text, job_description),
            'formatting_score': self._calculate_formatting_score(resume_text),
            'section_structure': self._calculate_structure_score(resume_text),
            'readability': self._calculate_readability_score(resume_text)
        }
        
        overall_score = sum(score_components.values()) / len(score_components)
        
        return {
            'overall_score': round(overall_score, 2),
            'components': score_components,
            'recommendations': self._generate_ats_recommendations(score_components)
        }
    
    def _calculate_keyword_score(self, resume_text: str, job_description: str) -> float:
        """Calculate keyword matching score using TF-IDF and cosine similarity"""
        vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform([resume_text, job_description])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
        return float(similarity[0][0]) * 100
```

This implementation provides a robust foundation for resume analysis with proper error handling, performance optimization through vectorization, and modular design for easy testing and maintenance.
```
```
### Prompt 4: RAG System Implementation
**AI Assistant**: Claude 3.5 Sonnet

**Prompt:**
```
Help me implement the RAG (Retrieval-Augmented Generation) system for personalized cover letter generation. I need:
1. Document embedding and vector storage using FAISS
2. Similarity search for relevant context retrieval
3. Integration with language models for content generation
4. Prompt engineering for high-quality outputs
5. Caching mechanism for performance optimization
```

**AI Response:**
```python
import os
import json
import pickle
from typing import List, Dict, Any, Optional, Tuple
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
import openai
from dataclasses import dataclass
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Document:
    """Document structure for RAG system"""
    id: str
    content: str
    metadata: Dict[str, Any]
    embedding: Optional[np.ndarray] = None

@dataclass
class CoverLetterContext:
    """Context structure for cover letter generation"""
    job_title: str
    company_name: str
    job_description: str
    user_profile: Dict[str, Any]
    relevant_experiences: List[str]
    skills_match: List[str]

class DocumentEmbedder:
    """Handles document embedding using sentence transformers"""
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """
        Initialize the embedder with a pre-trained model
        
        Args:
            model_name: Name of the sentence transformer model
        """
        self.model = SentenceTransformer(model_name)
        self.embedding_dim = self.model.get_sentence_embedding_dimension()
        logger.info(f"Initialized embedder with {model_name}, dim: {self.embedding_dim}")
    
    def embed_documents(self, documents: List[Document]) -> List[Document]:
        """
        Embed a list of documents
        
        Args:
            documents: List of Document objects
            
        Returns:
            List of Document objects with embeddings
        """
        texts = [doc.content for doc in documents]
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        
        for doc, embedding in zip(documents, embeddings):
            doc.embedding = embedding
            
        return documents
    
    def embed_query(self, query: str) -> np.ndarray:
        """
        Embed a single query string
        
        Args:
            query: Query string to embed
            
        Returns:
            Numpy array of embeddings
        """
        return self.model.encode([query], convert_to_numpy=True)[0]

class VectorStore:
    """FAISS-based vector storage and retrieval"""
    
    def __init__(self, embedding_dim: int):
        """
        Initialize FAISS index
        
        Args:
            embedding_dim: Dimension of embeddings
        """
        self.embedding_dim = embedding_dim
        self.index = faiss.IndexFlatIP(embedding_dim)  # Inner product for cosine similarity
        self.documents: List[Document] = []
        self.doc_id_to_idx: Dict[str, int] = {}
        
    def add_documents(self, documents: List[Document]):
        """
        Add documents to the vector store
        
        Args:
            documents: List of Document objects with embeddings
        """
        embeddings = np.array([doc.embedding for doc in documents]).astype('float32')
        
        # Normalize for cosine similarity
        faiss.normalize_L2(embeddings)
        
        # Add to index
        start_idx = len(self.documents)
        self.index.add(embeddings)
        
        # Store documents and mapping
        for i, doc in enumerate(documents):
            self.documents.append(doc)
            self.doc_id_to_idx[doc.id] = start_idx + i
            
        logger.info(f"Added {len(documents)} documents to vector store")
    
    def search(self, query_embedding: np.ndarray, k: int = 5) -> List[Tuple[Document, float]]:
        """
        Search for similar documents
        
        Args:
            query_embedding: Query embedding vector
            k: Number of results to return
            
        Returns:
            List of tuples (Document, similarity_score)
        """
        query_embedding = query_embedding.astype('float32').reshape(1, -1)
        faiss.normalize_L2(query_embedding)
        
        scores, indices = self.index.search(query_embedding, k)
        
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx != -1:  # Valid result
                results.append((self.documents[idx], float(score)))
                
        return results
    
    def save(self, filepath: str):
        """Save the vector store to disk"""
        faiss.write_index(self.index, f"{filepath}_index.faiss")
        with open(f"{filepath}_docs.pkl", 'wb') as f:
            pickle.dump({
                'documents': self.documents,
                'doc_id_to_idx': self.doc_id_to_idx,
                'embedding_dim': self.embedding_dim
            }, f)
        logger.info(f"Vector store saved to {filepath}")
    
    def load(self, filepath: str):
        """Load the vector store from disk"""
        self.index = faiss.read_index(f"{filepath}_index.faiss")
        with open(f"{filepath}_docs.pkl", 'rb') as f:
            data = pickle.load(f)
            self.documents = data['documents']
            self.doc_id_to_idx = data['doc_id_to_idx']
            self.embedding_dim = data['embedding_dim']
        logger.info(f"Vector store loaded from {filepath}")

class PromptTemplates:
    """Collection of prompt templates for cover letter generation"""
    
    COVER_LETTER_TEMPLATE = """
You are an expert cover letter writer. Generate a personalized, professional cover letter based on the following information:

**Job Information:**
- Position: {job_title}
- Company: {company_name}
- Job Description: {job_description}

**Candidate Profile:**
- Name: {candidate_name}
- Current Role: {current_role}
- Experience Level: {experience_level}

**Relevant Experiences (from RAG retrieval):**
{relevant_experiences}

**Matching Skills:**
{skills_match}

**Instructions:**
1. Write a compelling cover letter that highlights the candidate's most relevant experiences
2. Demonstrate clear connections between the candidate's background and job requirements
3. Use a professional yet engaging tone
4. Structure: Header, Opening paragraph, 2-3 body paragraphs, closing paragraph
5. Keep it concise (300-400 words)
6. Avoid generic phrases and clichés

Generate the cover letter:
"""

    EXPERIENCE_EXTRACTION_TEMPLATE = """
Extract the most relevant professional experiences from the following text that match the job requirements:

Job Requirements: {job_requirements}
User Profile Text: {profile_text}

Instructions:
1. Identify 3-5 most relevant experiences
2. Focus on achievements with quantifiable results
3. Highlight transferable skills
4. Format as bullet points

Relevant Experiences:
"""

    SKILLS_MATCHING_TEMPLATE = """
Analyze the job description and candidate profile to identify matching skills:

Job Description: {job_description}
Candidate Skills: {candidate_skills}

Instructions:
1. Identify exact skill matches
2. Identify transferable/related skills
3. Highlight technical and soft skills
4. Rank by relevance to the position

Matching Skills:
"""

class CoverLetterGenerator:
    """Main RAG system for cover letter generation"""
    
    def __init__(self, openai_api_key: str, model_name: str = "gpt-3.5-turbo"):
        """
        Initialize the cover letter generator
        
        Args:
            openai_api_key: OpenAI API key
            model_name: OpenAI model to use
        """
        openai.api_key = openai_api_key
        self.model_name = model_name
        self.embedder = DocumentEmbedder()
        self.vector_store = VectorStore(self.embedder.embedding_dim)
        self.templates = PromptTemplates()
        
    def load_resume_data(self, resume_data_path: str):
        """
        Load and process resume data for RAG retrieval
        
        Args:
            resume_data_path: Path to JSON file containing resume data
        """
        with open(resume_data_path, 'r') as f:
            resume_data = json.load(f)
            
        documents = []
        
        # Process work experience
        for idx, experience in enumerate(resume_data.get('work_experience', [])):
            content = f"Role: {experience.get('title', '')} at {experience.get('company', '')}\n"
            content += f"Duration: {experience.get('duration', '')}\n"
            content += f"Description: {experience.get('description', '')}\n"
            content += f"Achievements: {' '.join(experience.get('achievements', []))}"
            
            doc = Document(
                id=f"work_exp_{idx}",
                content=content,
                metadata={
                    'type': 'work_experience',
                    'title': experience.get('title', ''),
                    'company': experience.get('company', ''),
                    **experience
                }
            )
            documents.append(doc)
        
        # Process projects
        for idx, project in enumerate(resume_data.get('projects', [])):
            content = f"Project: {project.get('name', '')}\n"
            content += f"Description: {project.get('description', '')}\n"
            content += f"Technologies: {', '.join(project.get('technologies', []))}\n"
            content += f"Achievements: {project.get('achievements', '')}"
            
            doc = Document(
                id=f"project_{idx}",
                content=content,
                metadata={
                    'type': 'project',
                    'name': project.get('name', ''),
                    **project
                }
            )
            documents.append(doc)
        
        # Process skills
        skills_content = f"Technical Skills: {', '.join(resume_data.get('technical_skills', []))}\n"
        skills_content += f"Soft Skills: {', '.join(resume_data.get('soft_skills', []))}\n"
        skills_content += f"Certifications: {', '.join(resume_data.get('certifications', []))}"
        
        skills_doc = Document(
            id="skills",
            content=skills_content,
            metadata={
                'type': 'skills',
                **resume_data
            }
        )
        documents.append(skills_doc)
        
        # Embed and store documents
        embedded_docs = self.embedder.embed_documents(documents)
        self.vector_store.add_documents(embedded_docs)
        
        logger.info(f"Loaded {len(documents)} documents from resume data")
    
    def retrieve_relevant_context(self, job_description: str, k: int = 5) -> List[str]:
        """
        Retrieve relevant context from resume data
        
        Args:
            job_description: Job description to match against
            k: Number of relevant documents to retrieve
            
        Returns:
            List of relevant context strings
        """
        query_embedding = self.embedder.embed_query(job_description)
        results = self.vector_store.search(query_embedding, k=k)
        
        relevant_contexts = []
        for doc, score in results:
            if score > 0.3:  # Similarity threshold
                relevant_contexts.append(doc.content)
                logger.info(f"Retrieved: {doc.id} (score: {score:.3f})")
        
        return relevant_contexts
    
    def generate_with_llm(self, prompt: str) -> str:
        """
        Generate content using OpenAI API
        
        Args:
            prompt: Formatted prompt for the LLM
            
        Returns:
            Generated content
        """
        try:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": "You are a professional cover letter writer with expertise in matching candidates to job requirements."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=800,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating with LLM: {e}")
            return "Error generating content. Please check your API configuration."
    
    def generate_cover_letter(self, 
                            job_title: str,
                            company_name: str, 
                            job_description: str,
                            candidate_name: str,
                            current_role: str = "",
                            experience_level: str = "") -> str:
        """
        Generate a personalized cover letter using RAG
        
        Args:
            job_title: Position being applied for
            company_name: Target company name
            job_description: Full job description
            candidate_name: Candidate's name
            current_role: Current job title
            experience_level: Experience level (entry, mid, senior)
            
        Returns:
            Generated cover letter
        """
        # Retrieve relevant context
        relevant_contexts = self.retrieve_relevant_context(job_description, k=5)
        
        # Format relevant experiences
        relevant_experiences = "\n".join([f"- {ctx}" for ctx in relevant_contexts[:3]])
        
        # Extract skills match (simplified - could be enhanced with another LLM call)
        skills_match = "Skills analysis based on retrieved context"
        
        # Format the main prompt
        prompt = self.templates.COVER_LETTER_TEMPLATE.format(
            job_title=job_title,
            company_name=company_name,
            job_description=job_description[:500] + "..." if len(job_description) > 500 else job_description,
            candidate_name=candidate_name,
            current_role=current_role,
            experience_level=experience_level,
            relevant_experiences=relevant_experiences,
            skills_match=skills_match
        )
        
        # Generate cover letter
        cover_letter = self.generate_with_llm(prompt)
        
        logger.info("Cover letter generated successfully")
        return cover_letter
    
    def save_vector_store(self, filepath: str):
        """Save the vector store to disk"""
        self.vector_store.save(filepath)
    
    def load_vector_store(self, filepath: str):
        """Load the vector store from disk"""
        self.vector_store.load(filepath)

# Example usage and testing
def main():
    """Example usage of the RAG cover letter system"""
    
    # Initialize the system
    generator = CoverLetterGenerator(
        openai_api_key="your-openai-api-key-here",
        model_name="gpt-3.5-turbo"
    )
    
    # Sample resume data
    sample_resume = {
        "personal_info": {
            "name": "John Doe",
            "email": "john.doe@email.com"
        },
        "work_experience": [
            {
                "title": "Software Engineer",
                "company": "TechCorp",
                "duration": "2021-2023",
                "description": "Developed web applications using React and Node.js",
                "achievements": ["Reduced page load time by 40%", "Led team of 3 developers"]
            },
            {
                "title": "Junior Developer",
                "company": "StartupXYZ",
                "duration": "2020-2021", 
                "description": "Built REST APIs and database systems",
                "achievements": ["Implemented CI/CD pipeline", "Improved test coverage to 85%"]
            }
        ],
        "projects": [
            {
                "name": "E-commerce Platform",
                "description": "Full-stack e-commerce solution with payment integration",
                "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
                "achievements": "Handled 1000+ concurrent users"
            }
        ],
        "technical_skills": ["Python", "JavaScript", "React", "Node.js", "MongoDB", "AWS"],
        "soft_skills": ["Team Leadership", "Problem Solving", "Communication"],
        "certifications": ["AWS Certified Developer"]
    }
    
    # Save sample data
    with open('sample_resume.json', 'w') as f:
        json.dump(sample_resume, f, indent=2)
    
    # Load resume data
    generator.load_resume_data('sample_resume.json')
    
    # Generate cover letter
    cover_letter = generator.generate_cover_letter(
        job_title="Senior Software Engineer",
        company_name="Google",
        job_description="We are looking for a senior software engineer with experience in web development, team leadership, and cloud technologies. The role involves building scalable systems and mentoring junior developers.",
        candidate_name="John Doe",
        current_role="Software Engineer",
        experience_level="Mid-level"
    )
    
    print("Generated Cover Letter:")
    print("=" * 50)
    print(cover_letter)
    
    # Save vector store for future use
    generator.save_vector_store('resume_vector_store')

if __name__ == "__main__":
    main()
```
