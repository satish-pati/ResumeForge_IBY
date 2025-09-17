# ResumeForge - System Design Document

## 1. Executive Summary

ResumeForge is an AI-driven platform designed to automate the manual task of resume optimization and job application preparation. The system employs a multi-agent architecture with advanced NLP capabilities to provide comprehensive career assistance services.

## 2. Problem Statement & Solution

### 2.1 Manual Task Identified
**Problem**: Job application preparation is a time-consuming, manual process involving:
- Resume tailoring for specific positions (2-3 hours per application)
- ATS compatibility checking (30-60 minutes)
- Cover letter writing (1-2 hours)
- Interview preparation research (2-4 hours)
- Career guidance consultation (expensive professional services)

**Solution**: An AI agent system that automates these processes through intelligent reasoning, planning, and execution.

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Web Browser   │  │   Mobile App    │  │  Desktop    │ │
│  │   (React.js)    │  │   (Future)      │  │  (Future)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │ HTTPS/REST API
┌─────────────────────────────────────────────────────────────┐
│                  API Gateway Layer                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │           Node.js + Express.js API Server              │ │
│  │  • Authentication & Authorization                      │ │
│  │  • Request Routing & Validation                        │ │
│  │  • Rate Limiting & Security                            │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Core AI Engine                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Python Flask AI Server                    │ │
│  │  ┌───────────────────────────────────────────────────┐  │ │
│  │  │            Multi-Agent System                     │  │ │
│  │  │  ┌─────────────────┐  ┌─────────────────────────┐ │  │ │
│  │  │  │ Resume Analyzer │  │   Content Generator     │ │  │ │
│  │  │  │     Agent       │  │       Agent             │ │  │ │
│  │  │  └─────────────────┘  └─────────────────────────┘ │  │ │
│  │  │  ┌─────────────────┐  ┌─────────────────────────┐ │  │ │
│  │  │  │ Career Coach    │  │  Optimization Planner   │ │  │ │
│  │  │  │     Agent       │  │       Agent             │ │  │ │
│  │  │  └─────────────────┘  └─────────────────────────┘ │  │ │
│  │  └───────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │    MongoDB      │  │  FAISS Vector   │  │  File Store │ │
│  │   Document DB   │  │     Store       │  │  (Resume    │ │
│  │                 │  │                 │  │   Files)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Component Breakdown

#### 3.2.1 Frontend Components
- **React.js Application**
  - Resume Upload Interface
  - Interactive Chat Interface (Career Coach)
  - Resume Builder with Templates
  - Dashboard & Analytics
  - ATS Score Visualization

#### 3.2.2 Backend API Components
- **Express.js Server**
  - User Authentication & Session Management
  - File Upload & Processing
  - API Route Management
  - Integration Layer for AI Services

#### 3.2.3 AI/ML Core Components
- **Multi-Agent Orchestrator**
  - Agent coordination and task delegation
  - Inter-agent communication protocols
  - Workflow management

#### 3.2.4 Individual AI Agents

**Resume Analyzer Agent**
```python
class ResumeAnalyzerAgent:
    def __init__(self):
        self.nlp_model = transformers.AutoModel.from_pretrained('bert-base-uncased')
        self.ats_analyzer = ATSCompatibilityAnalyzer()
    
    def analyze_resume(self, resume_text, job_description=None):
        # Reasoning: Parse and understand resume structure
        parsed_data = self.parse_resume_structure(resume_text)
        
        # Planning: Determine analysis strategy
        analysis_plan = self.create_analysis_plan(parsed_data, job_description)
        
        # Execution: Perform comprehensive analysis
        return self.execute_analysis(analysis_plan)
```

**Content Generator Agent**
```python
class ContentGeneratorAgent:
    def __init__(self):
        self.llm = LangchainLLM()
        self.rag_system = RAGSystem()
    
    def generate_cover_letter(self, resume_data, job_description, company_info):
        # Reasoning: Understand requirements and user background
        context = self.rag_system.retrieve_relevant_context(resume_data, job_description)
        
        # Planning: Structure cover letter approach
        generation_strategy = self.plan_content_generation(context)
        
        # Execution: Generate personalized content
        return self.execute_generation(generation_strategy)
```

**Career Coach Agent**
```python
class CareerCoachAgent:
    def __init__(self):
        self.conversation_memory = ConversationBufferMemory()
        self.knowledge_base = CareerKnowledgeBase()
    
    def provide_guidance(self, user_query, resume_context):
        # Reasoning: Understand user's career situation and goals
        situation_analysis = self.analyze_career_situation(user_query, resume_context)
        
        # Planning: Determine best guidance approach
        guidance_plan = self.create_guidance_strategy(situation_analysis)
        
        # Execution: Provide actionable advice
        return self.execute_guidance(guidance_plan)
```

**Optimization Planner Agent**
```python
class OptimizationPlannerAgent:
    def __init__(self):
        self.optimization_rules = OptimizationRuleEngine()
        self.industry_standards = IndustryStandardsDB()
    
    def create_optimization_plan(self, resume_analysis, target_role):
        # Reasoning: Identify gaps and improvement opportunities
        gap_analysis = self.identify_optimization_gaps(resume_analysis, target_role)
        
        # Planning: Create step-by-step improvement plan
        optimization_plan = self.generate_optimization_steps(gap_analysis)
        
        # Execution: Provide actionable recommendations
        return self.finalize_plan(optimization_plan)
```

## 4. Data Design

### 4.1 MongoDB Schema Design

```javascript
// User Collection
{
  _id: ObjectId,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}
// ATS analysis Collection
{
    _id: ObjectId,
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
      
 }
// Resume Collection
{
  _id: ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: String, required: true },
  formData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
}

// Cover Letter Collection
{
  _id: ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobRole: { type: String, required: true },
  jobDescription: { type: String, required: true },
  coverLetter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}

// Interview Questions Collection
{
  _id: ObjectId,
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
}
```

### 4.2 Vector Storage Design (FAISS)

```python
# Vector embeddings for RAG system
class VectorStoreManager:
    def __init__(self):
        self.dimension = 768  # BERT embedding dimension
        self.index = faiss.IndexFlatIP(self.dimension)
        
    def store_embeddings(self, documents):
        embeddings = self.embed_documents(documents)
        self.index.add(embeddings)
        
    def similarity_search(self, query, k=5):
        query_embedding = self.embed_query(query)
        scores, indices = self.index.search(query_embedding, k)
        return self.retrieve_documents(indices)
```

## 5. Technology Choices & Justification

### 5.1 Frontend Technology: React.js

**Rationale:**
- **Component-based architecture**: Enables reusable UI components for templates and forms
- **Virtual DOM**: Provides smooth user experience for real-time feedback and updates
- **Large ecosystem**: Extensive library support for charts, file uploads, and UI components
- **Community support**: Large developer community and extensive documentation

**Alternatives considered:**
- Vue.js: Easier learning curve but smaller ecosystem
- Angular: More complex setup, overkill for this project size
- Plain HTML/CSS/JS: Would require significantly more development time

### 5.2 Backend API: Node.js + Express.js

**Rationale:**
- **JavaScript consistency**: Same language across frontend and backend reduces context switching
- **NPM ecosystem**: Rich package manager with libraries for file processing, authentication
- **Non-blocking I/O**: Efficient handling of file uploads and API requests
- **JSON native**: Natural handling of MongoDB documents and API responses

**Alternatives considered:**
- Python Django/FastAPI: Would add language complexity but better ML integration
- Java Spring Boot: More enterprise-oriented, unnecessary complexity
- PHP Laravel: Less suitable for AI/ML integrations

### 5.3 AI/ML Backend: Python + Flask

**Rationale:**
- **ML ecosystem**: Unmatched library support (scikit-learn, transformers, langchain)
- **Research community**: Latest AI/ML developments typically implemented in Python first
- **Integration capabilities**: Easy integration with Hugging Face, LangChain and Chatgroq APIs
- **Performance**: Efficient for AI model inference and vector operations

**Alternatives considered:**
- Node.js with ML libraries: Limited ML ecosystem compared to Python
- R: Strong for statistics but weaker for production deployments
- Java: Good performance but limited AI/ML library ecosystem

### 5.4 Database: MongoDB

**Rationale:**
- **Document structure**: Natural fit for resume data with varying structures
- **Schema flexibility**: Easy to evolve data models as requirements change
- **JSON compatibility**: Seamless integration with Node.js and Python
- **Scalability**: Built-in horizontal scaling capabilities
- **Full-text search**: Native support for content search within documents

**Alternatives considered:**
- PostgreSQL: Excellent RDBMS but resume data doesn't fit well in rigid schemas
- MySQL: Good performance but limited JSON support
- Redis: Great for caching but not suitable as primary database

### 5.5 Vector Search: FAISS

**Rationale:**
- **Performance**: Optimized for high-dimensional vector similarity search
- **Memory efficiency**: Efficient storage and retrieval of embeddings
- **Facebook backing**: Well-maintained and continuously improved
- **Python integration**: Native Python bindings with good documentation

**Alternatives considered:**
- Pinecone: Cloud-based but adds external dependency and cost
- Weaviate: Good features but more complex setup
- Elasticsearch: Good for text search but less optimized for dense vectors

### 5.6 AI/ML Framework: Langchain + Hugging Face

**Rationale:**
- **Langchain**: Excellent for orchestrating multi-agent systems and LLM chains
- **Hugging Face**: Largest repository of pre-trained models with easy integration
- **Community**: Active development and extensive model library
- **Flexibility**: Easy to swap models and experiment with different approaches

## 6. Security & Performance Considerations

### 6.1 Security Measures
- JWT-based authentication for API access
- File upload validation and sanitization
- Rate limiting on AI service endpoints
- Secure storage of API keys and sensitive configuration
- Input validation and sanitization for all user inputs

### 6.2 Performance Optimizations
- Faster retreival of Data from VectorDatbase using FAISS vector index 
- Asynchronous processing for long-running tasks


## 7. Scalability & Deployment

### 7.1 Scaling Strategy
- Stateless API design enables easy load balancing
- Microservices architecture allows independent scaling of components
- Container-based deployment (Docker) for consistent environments

### 7.2 Deployment Architecture
```
    ├── Frontend (React) 
    ├── API Gateway (Node.js) 
    ├── AI Engine (Python) - GPU-enabled 
    └── Database Cluster (MongoDB) 
```

## 8. Monitoring & Analytics

### 8.1 Key Metrics
- API response times and error rates
- AI model inference latency
- User engagement metrics (session duration, feature usage)
- ATS score improvement tracking
- System resource utilization

### 8.2 Logging & Observability
- Structured logging across all services
- Error tracking and alerting systems
- Performance monitoring dashboards
- User behavior analytics

This system design provides a robust, scalable foundation for the ResumeForge platform while maintaining flexibility for future enhancements and integrations.
