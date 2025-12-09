# 🧠 Exam AI Grader

## 🧩 Problem Statement

In Nigeria, WAEC's grading system for theory exams is still heavily manual. Objective questions are processed with basic automation, but theory scripts are distributed to teachers across the country for marking. This causes inconsistency, bias, and human error — some students end up with poor grades not because they performed badly, but because their script was marked by a tired or careless examiner.

To solve this, I built an AI-driven system capable of grading handwritten theory answers automatically. The goal was to introduce fairness, consistency, and speed to large-scale exam evaluation.

## ⚙️ Core Solution & Architecture

The system was designed as a two-part platform — a frontend interface for uploading exam materials and a backend orchestrator that handled the AI grading pipeline.

### Frontend
Built with Next.js and Prisma for database management. It allows examiners or administrators to upload:
- Question paper (PDF or image)
- Handwritten answer scripts

### Backend
Built with FastAPI, orchestrated using LangGraph, and powered by a Visual Language Model (VLM).
Instead of traditional OCR, the VLM directly interprets each scanned answer sheet — recognizing handwriting, describing diagrams, and extracting text with semantic context.

## 🧰 Tech Stack & Tools

| Layer | Tools / Frameworks | Purpose |
|-------|-------------------|---------|
| Frontend | Next.js, TailwindCSS | User interface for uploads and results |
| Backend | FastAPI, LangGraph | API server and grading workflow orchestration |
| Database | PostgreSQL (via Prisma) | Store questions, uploads, and grading reports |
| Async Processing | RabbitMQ, Redis, Celery | Queue and process multiple grading jobs concurrently |
| Realtime Updates | WebSockets + Redis Pub/Sub | Stream grading progress live to frontend |
| AI Models | Visual Language Models (VLMs) + LLMs | Extract handwriting and evaluate based on marking scheme |
| Deployment | Docker, Nginx | Scalable and modular environment |

## 🧠 AI / ML Implementation

Unlike OCR-based approaches, this system used Visual Language Models (VLMs) capable of understanding both text and visuals in a single inference pass. The workflow combined two levels of intelligence:

### Visual Understanding
The VLM interpreted the handwritten answers — not just extracting text, but describing diagrams, reading annotations, and interpreting symbols contextually.

### Structured Grading
The extracted content was then evaluated by an LLM-based grading agent, following a structured prompt template aligned with an official marking guide.
Each question was scored line-by-line, allowing for detailed feedback and partial scoring similar to how human examiners work.

The system then generated:
- Total and per-question scores
- Corrected feedback summaries
- Confidence levels for each grade

## 🔄 System Workflow

1. User uploads the question and student answer scripts.
2. Backend queues the task in RabbitMQ.
3. Celery worker picks it up, sends it to the Visual Language Model.
4. VLM interprets the entire handwritten content.
5. LLM compares responses to the marking guide and generates structured grading data.
6. WebSocket updates stream real-time progress back to the frontend.
7. Final report and grading feedback are saved via Prisma to PostgreSQL.

## ⚡ Challenges & Learnings

### Inconsistent handwriting styles
Some students' handwriting was nearly illegible. Even with a strong VLM, there were cases where characters or diagrams were misinterpreted. I learned that preprocessing and prompt reinforcement can significantly improve accuracy.

### Hallucination control
I used structured prompts and clear schema enforcement to ensure the LLM didn't invent scores or comments.

### Latency
Although grading involved multiple models, the overall latency was still faster than manual marking. The system handled concurrent grading efficiently using asynchronous task queues.

### Realtime orchestration
Managing grading status updates for parallel jobs was complex. I solved it using Redis Pub/Sub channels, which synced backend task events with active WebSocket clients seamlessly.

## 🚀 Outcome & Impact

- Automated grading time per paper reduced by over 80% compared to manual marking.
- Produced consistent, bias-free results based on standardized marking guides.
- Laid the groundwork for Exacraft, my ongoing project that aims to digitize and automate the entire school exam ecosystem in Nigeria.

## 💡 Key Takeaways

Building this system deepened my expertise in LangGraph orchestration, LLM/VLM pipeline design, and real-time AI architecture.
It also reinforced my obsession with solving real problems in education — not just by adding AI, but by engineering AI systems that are practical, interpretable, and scalable.

---

# 📚 Learn Your Facts

(AI-Powered Educational Blog Generator)

## 🧩 Problem Statement

Most educational platforms still depend on static content — rigid lesson plans, fixed blog posts, and manually curated topics. Students today crave interactive, dynamic learning experiences that adapt to their curiosity in real time.

The idea behind Learn Your Facts was simple:

> "What if anyone could choose any subject, type a topic, and instantly get a complete, illustrated, AI-generated educational article — written in plain, engaging language?"

That's exactly what this system does — it turns any topic in any subject into a fully generated educational blog with relevant visuals and structured explanations.

## ⚙️ Core Solution & Architecture

Learn Your Facts was built as a serverless, fullstack AI-powered content generator, designed entirely with Next.js and TypeScript.

Here's how it worked:

1. On the landing page, users select a subject (e.g., Chemistry, Physics, CRS, History, Biology, etc.).
2. They choose whether they want a random article from that subject or a specific topic (e.g., Boyle's Law).
3. Within seconds, the system generates a full blog post — with an educational tone, structured paragraphs, and a context-relevant image.
4. Each article is conversational and informative, often starting with hooks like:

> "Did you know that Boyle's Law shows how pressure and volume are related in gases?"

## 🧰 Tech Stack & Tools

| Layer | Tools / Frameworks | Purpose |
|-------|-------------------|---------|
| Frontend | Next.js (App Router), TailwindCSS | User interface and interactive subject/topic selection |
| Backend | Next.js API Routes / Server Actions | Handles AI calls and API orchestration |
| AI Layer | LLMs via OpenRouter (Free Models) | Generates structured educational blog content |
| Image Layer | Pexels API | Retrieves image related to generated topic |
| Database | MongoDB | Stores generated posts, subjects, and cached responses |
| Deployment | Docker | Containerized setup for scalable deployment |
| Language | TypeScript | Entire system built from scratch with strong type safety |

## 🧠 AI Implementation

This system used a chained prompt pipeline, designed from scratch in TypeScript — no LangGraph, no external AI orchestration frameworks.

Here's the breakdown:

1. The user input (subject + topic) is sent to an OpenRouter LLM.
2. The model is prompted to:
   - Generate a short search term for fetching an image (e.g., "gas pressure experiment").
   - Create a structured educational blog with:
     - Title
     - Introduction
     - Concept Explanation
     - Real-life Example
     - Summary / Key Takeaway
3. The search term is passed to the Pexels API, which returns the first relevant image.
4. The final response — article + image — is rendered in the frontend.
5. Everything ran inside Next.js' server environment, meaning no external backend — clean, minimal, and efficient.

## 🔄 System Workflow

1. User picks a subject (e.g., Physics).
2. Chooses topic mode (random or specific).
3. Submits input → AI generates search phrase + blog.
4. Pexels API retrieves a relevant image.
5. Blog (with image) is returned and displayed.
6. MongoDB optionally stores and caches the blog for reuse.

## ⚡ Challenges & Learnings

### Handcrafted AI orchestration
Without tools like LangChain or LangGraph, I had to manually handle token management, rate limits, and prompt structuring in TypeScript. It gave me a deep understanding of raw LLM integration.

### Topic diversity
Some topics generated repetitive formats. I solved this by randomizing tone and context in the prompt ("Teach this like you're explaining to a 12-year-old" vs "Explain this to a curious adult").

### Image mismatches
The first versions often pulled wrong visuals (e.g., "Boyle's Law" showing random lab workers). I fixed this by appending clarifiers like "scientific diagram" or "physics concept illustration" to the LLM's generated search terms.

### Latency
Despite the LLM and API calls, response time stayed under ~30 seconds. The caching layer in MongoDB cut repeated requests down to <3 seconds.

### Frontend UX
I added progress animations and dynamic loading text ("Researching facts…" → "Drafting your article…" → "Generating image…") to keep the user engaged during generation.

## 🚀 Outcome

- Generated full, original educational blogs (with visuals) for any topic in any subject within seconds.
- No manual backend — everything powered by Next.js' API routes.
- Created a smooth, self-contained AI learning platform.
- Served as an early experiment in personalized AI education — the idea of "learning anything instantly".

## 💡 Key Takeaways

This project taught me how to build AI-driven systems from scratch — without heavy frameworks — and how to orchestrate multi-step reasoning pipelines manually.

It solidified my understanding of:
- LLM prompt engineering
- API chaining logic
- Serverless backend design in Next.js
- UI/UX flow for AI generation

It's the kind of project that made me realize how powerful simplicity and creativity can be when you deeply understand the tools you're using.

---

# 🧾 Generate Logbook Entries

(AI-Powered Student Internship Documentation)

## Overview

Generate Logbook Entries is an AI-powered productivity tool I built to help students—especially Computer Science and Engineering majors—automate their SIWES (Student Industrial Work Experience Scheme) or internship logbook documentation.

I created it out of frustration during my own internship, where I had to fill out over a month's worth of daily entries manually. Instead of spending hours reconstructing my activities, I decided to build an app that could automatically generate structured daily logbook entries based on a few project details.

## ✨ Key Features

- **🧠 AI-Powered Log Generation**: Automatically creates day-by-day internship entries based on a project description, tech stack, and preferred duration (e.g., 2–4 weeks).
- **⚙️ Dynamic Output Control**: Users can choose the style of output — concise, detailed, or technical.
- **💡 Smart Splitting Algorithm**: The system divides one project into realistic daily activities (e.g., setup, debugging, code reviews, UI refinements, testing).
- **📄 Clean Presentation**: Generated results are displayed in a structured format — Day 1, Day 2, Day 3... — for easy copying into physical logbooks.
- **🧰 Modern UI**: Sleek, dark-themed interface using ShadCN UI for an elegant developer-oriented experience.

## ⚙️ How It Works

The user provides:
- Project title
- Detailed project description
- Programming languages / tech stack
- UI libraries used (if any)
- Preferred output length and writing style
- Duration to spread entries across (e.g., 2 weeks, 3 weeks)

The app uses an LLM (via OpenRouter) to generate contextually relevant, human-like log entries.

Each entry simulates a realistic workflow for that time frame, so the logs sound authentic — not AI-generated gibberish.

## 🧩 Tech Stack

- **Frontend**: Next.js 13+, TypeScript, ShadCN UI, TailwindCSS
- **Backend**: Next.js Server Actions (for AI inference & logic orchestration)
- **Database**: MongoDB (for logs & user sessions)
- **AI Layer**: OpenRouter-hosted LLMs
- **Deployment**: Vercel

## 🚀 Results

- Reduced log-writing time from hours to minutes.
- Over 50+ students used the app during its first release period.
- Achieved consistent, realistic, and plagiarism-free log entries.

## 🧭 Future Plans

I plan to revive the project as a mini SaaS product with the following upgrades:
- User authentication and saved log history
- PDF export and CSV download
- Freemium pricing (e.g., 7 days free, premium unlocks for extended entries)
- AI rewrite modes: Formal, Technical, Simple
- Batch generation for multiple projects

## 💬 Personal Note

This project taught me the value of turning personal pain points into scalable solutions. What started as a last-minute fix for my SIWES logbook ended up being a real product that solved a widespread student problem. It's one of those builds that proved to me: if you experience the problem deeply enough, you already have the blueprint for a great product.

---

# 💬 Customer Support Chatbot (for a Hospital)

## Overview

This project is an AI-powered customer support chatbot designed specifically for hospitals and health centers.
I built it during my software engineering fellowship to explore how LLMs can be grounded with contextual data to serve realistic business use cases.

While the initial brief was to "build a simple chatbot," I extended it into a domain-specific, retrieval-augmented chatbot capable of responding accurately to hospital-related queries using both predefined data and live reasoning.

## ✨ Key Features

- **🏥 Domain-Specific Intelligence**: The chatbot understands and responds to hospital-related inquiries such as appointment scheduling, visiting hours, available services, and basic patient support.
- **🔍 Retrieval-Augmented Generation (RAG)**: Instead of relying on generic LLM output, responses are grounded using data from a local vector database.
- **🧠 Custom System Prompting**: The agent's "persona" was shaped using a carefully engineered system prompt that framed it as a polite, professional hospital assistant.
- **💬 Interactive Frontend**: Built with Next.js, the chat interface provides smooth, real-time exchanges and persistent message states.
- **☁️ Full Cloud Deployment**: Deployed via Amazon EC2 using SSH — my first hands-on experience with manual Linux provisioning, key-based authentication, and instance management.

## 🧩 Tech Stack

- **Frontend**: Next.js 13+, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **AI Layer**: LLM (via OpenRouter) integrated with a RAG (Retrieval-Augmented Generation) pipeline
- **Database**: Local vector database for contextual grounding
- **Deployment**: AWS EC2 (Ubuntu, NGINX, SSH)

## ⚙️ How It Works

1. User sends a query through the chat interface (e.g., "What are the visiting hours for the pediatric ward?").
2. The backend retrieves relevant data from the vector database based on embeddings.
3. The retrieved context is injected into the LLM's system prompt to guide its response.
4. The model generates a grounded, accurate, and conversational reply.

## 🚀 Outcome

- Successfully deployed a fully functional RAG-based chatbot on AWS.
- Gained experience in manual deployment and server management with EC2 and SSH.
- Learned how to structure system prompts effectively to maintain domain consistency.
- Served as my first hands-on experience integrating LLMs with custom data sources.

## 🧭 Key Learnings

- Realized how prompt engineering directly affects model performance and accuracy.
- Learned how to deploy apps without relying on managed platforms like Vercel — understanding the low-level aspects of deployment, NGINX config, and uptime management.
- Appreciated how RAG pipelines turn LLMs from "generic text generators" into context-aware assistants.

## 💬 Personal Reflection

This project wasn't about flashy UI or complex architecture — it was about understanding the fundamentals of AI product integration.
It taught me how to combine traditional web app structure with intelligent systems, and how deployment choices can impact latency, reliability, and cost.

---

# 📊 Task Management Dashboard

## Overview

Task Management Dashboard is a web application built to streamline how teams create, track, and manage tasks.
The project was developed as part of a technical assessment for a full-stack developer role, with the challenge to replicate a provided UI design and implement major functionality within just four days.

Despite the short deadline, I delivered a working prototype with core CRUD features, drag-and-drop task movement, search and filter, and state management across task categories — built using technologies I learned on the fly (including jQuery).

## ✨ Key Features

- **✅ Task Creation & Categorization**: Create tasks with title, description, category, and due date.
- **🏷️ Smart Task States**: Tasks are organized into three boards — Pending, Completed, and Overdue.
- **🖱️ Drag & Drop Functionality**: Seamlessly move tasks across boards using jQuery's UI patterns.
- **🔎 Search & Filter**: Real-time searching and filtering based on keywords, status, and due dates.
- **⚡ RESTful Backend**: Django REST Framework powers the backend with clean endpoints for task operations.
- **💻 Responsive UI**: Replicated pixel-perfect UI from the provided mockup using TailwindCSS.

## 🧩 Tech Stack

- **Frontend**: jQuery, React (for structured components), TailwindCSS
- **Backend**: Django REST Framework (DRF)
- **Database**: SQLite (development), PostgreSQL (for Render deployment)
- **Deployment**: Render (free tier)

## ⚙️ Development Notes

- Built the entire project from scratch in under 4 days, including backend APIs, frontend logic, and deployment.
- Learned jQuery in real time while debugging complex DOM manipulations and event handling.
- Implemented drag-and-drop from first principles using jQuery's event listeners and DOM state updates.
- Added basic test coverage using Django's built-in testing framework to verify CRUD routes and data integrity.

## 🚀 Outcome

- Delivered a functional prototype that met all major specifications before the deadline.
- Successfully deployed to Render for live demo access.
- Although the company never responded, the project became a milestone for personal growth — proving I could handle new stacks, tight deadlines, and full ownership end-to-end.

## 🧭 Key Learnings

- Rapidly adapted to new technologies (jQuery, Django REST Framework).
- Learned the importance of time-boxing, prioritization, and minimal viable delivery.
- Verified that pressure + hands-on work accelerates learning far more than passive study.

## 💬 Personal Reflection

This project was my trial by fire. Building something real in a new stack under an aggressive deadline taught me how to prioritize the right features and ship under pressure. If I can learn jQuery, debug Django, and deploy to Render in four days — I can learn anything.

---

# 🕊️ Chapel Letter Automation System

## Overview

The Chapel Letter Automation System is a desktop application built to automate the generation and printing of disciplinary letters for students who miss mandatory chapel services at Mountaintop University.

Originally, this process was entirely manual — each warning letter was handwritten or individually edited in a template for dozens (sometimes hundreds) of students. The workload was repetitive, error-prone, and time-consuming.

To solve this, I developed a Python-based automation tool with a graphical interface that generates personalized letters instantly from spreadsheet data and sends them directly to the printer — all in one click.

## ✨ Key Features

- **📄 Automated Letter Generation**: Auto-fills preformatted PDF letter templates with student details (name, matric number, level, offenses).
- **🧾 Bulk CSV/Excel Upload**: Imports multiple student records at once for mass letter generation.
- **🖨️ One-Click Print Integration**: Connects directly to a printer; automatically prints all generated letters without manual intervention.
- **💻 User-Friendly GUI**: Built using CustomTkinter for an intuitive desktop interface — no command line required.
- **🪶 Customizable Template**: Maintains official formatting, school logo, and structure for consistent document output.

## 🧩 Tech Stack

- **Language**: Python
- **Libraries**: CustomTkinter, FPDF, Pandas, CSV, OS
- **Data Source**: Excel/CSV files
- **Deployment**: Standalone desktop app (packaged with PyInstaller for easy use)

## ⚙️ Development Notes

- Designed the system to handle bulk automation — generating and printing 50+ letters in under 10 minutes.
- Integrated PDF manipulation and template replacement logic for seamless merging of student data into predesigned documents.
- Focused heavily on usability, enabling even non-technical staff to use the app efficiently.
- Implemented print queue management for stable high-volume printing.

## 🚀 Outcome

- Reduced what previously took multiple staff hours down to minutes.
- Completely eliminated repetitive manual writing and formatting tasks.
- Though the university discontinued issuing chapel warning letters shortly after development, the project proved my ability to identify inefficiencies, design automation workflows, and ship complete products independently.

## 🧭 Key Learnings

- Realized how automation can massively improve administrative processes in institutions.
- Learned practical PDF manipulation, desktop UI design, and bulk printing automation.
- Reinforced my ability to spot process bottlenecks and convert them into elegant software solutions.

## 💬 Personal Reflection

This project might never have been officially deployed, but it's one of my favorite builds. It started from pure frustration and ended as a full automation system that worked flawlessly. It taught me that the best automation ideas come from lived inefficiencies — the things everyone hates doing but nobody thinks to fix.

---

# 🛒 E-Commerce API Server

## Overview

The E-Commerce API Server is a backend service I built while transitioning from framework-driven development (Django and Next.js) into low-level backend engineering using Express.js and TypeScript.

The goal was simple: learn how to design a complete backend API from scratch — no scaffolds, no boilerplate — and understand the full lifecycle of authentication, database modeling, and RESTful API structuring.

## ✨ Key Features

- **👤 User Authentication**: Implemented secure user registration and login using JWT (JSON Web Tokens).
- **🛍️ Product Management**: CRUD endpoints for products with validation, pagination, and search support.
- **🛒 Cart System**: Users can add, update, and remove products from their cart, persisted via database.
- **🧱 API Documentation**: Integrated Swagger UI for clean API visualization and testing.
- **🗂️ Modular Architecture**: Structured with controllers, services, and routes for maintainability.

## 🧩 Tech Stack

- **Runtime**: Node.js (Express.js)
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite (for development)
- **Auth**: JWT (JSON Web Tokens)
- **Documentation**: Swagger UI
- **Dev Tooling**: TSX for live TypeScript execution

## ⚙️ Development Notes

- Initially faced major friction adapting YouTube tutorials (which used plain JavaScript + MongoDB) into a TypeScript + Prisma stack.
- Switched from ts-node to TSX to enable faster live development and hot reloading.
- Designed relational models for Users, Products, and Carts, each linked via Prisma schema relations.
- Implemented proper password hashing and token verification flow manually to understand how JWT works under the hood.

## 🚀 Outcome

- Completed a fully functional e-commerce API server with production-ready endpoints.
- Gained practical understanding of Express.js architecture, TypeScript typing, and ORM-based database design.
- Deployed the API locally with Swagger for testing, ensuring all CRUD routes and auth flows worked end-to-end.
- Cemented my confidence in building custom backend systems beyond framework constraints.

## 🧭 Key Learnings

- Learned how to structure scalable API projects with separation of concerns (routes → controllers → services).
- Understood JWT authentication deeply — generation, validation, and expiry.
- Discovered how ORMs like Prisma differ from document databases, and how they enforce data integrity.
- Developed debugging instincts by building everything manually from the ground up.

## 💬 Personal Reflection

This project wasn't about shipping something fancy — it was about learning backend development the hard way, properly. I stopped relying on Django abstractions and learned how everything connects: tokens, schemas, routing, and DB logic.
It's one of those "you struggle your way through, but you never forget it" builds — and it permanently changed how I approach backend systems today.

---

# 🧠 Flashcard SaaS Generator

## Overview

The Flashcard SaaS Generator is a collaborative project built during my Software Engineering Fellowship. The goal was to create an AI-powered flashcard generation platform that automatically creates study flashcards from any topic a user provides — turning text-based topics into interactive learning cards instantly.

It was one of the first projects where I experimented with LLM integration inside a SaaS environment, and also my first real experience collaborating in a development team while implementing both frontend design and AI logic.

## ✨ Key Features

- **🧩 AI-Powered Flashcard Creation**: Users can input any topic, and the app dynamically generates multiple flashcards (e.g., "Who is the father of programming languages?" → Ada Lovelace).
- **🔄 Interactive Flip Cards**: Each flashcard flips between question and answer, enabling active recall for users.
- **💾 Flashcard Set Management**: Users can save selected flashcards into personalized sets for future study.
- **👤 Google Authentication**: Implemented Sign in with Google for smooth user onboarding.
- **🏠 Modern Landing Page**: Designed with Chakra UI for an elegant, SaaS-ready interface and responsive design.

## 🧩 Tech Stack

- **Frontend Framework**: Next.js
- **UI Library**: Chakra UI
- **Auth**: Google OAuth
- **AI Integration**: LLM-based text generation via OpenRouter API
- **Deployment**: Vercel

## ⚙️ Development Notes

- The project was a team collaboration, but I led most of the core application logic and frontend structure.
- I designed the prompt system for generating flashcards and the logic for dynamically rendering question-answer cards.
- We structured the UI for scalability — ensuring new topics could easily generate dozens of flashcards dynamically.
- Used a clean, component-based architecture to separate dashboard, input, and card-rendering layers.

## 🚀 Outcome

- Built a fully functional flashcard SaaS prototype that converts any topic into AI-generated flashcards.
- Demonstrated end-to-end product flow: from landing page → authentication → dashboard → AI output → saving sets.
- Learned how to integrate AI modules within real user workflows while maintaining speed and UX quality.

## 🧭 Key Learnings

- Learned how to structure SaaS apps around user flows and persistent session data.
- Gained experience in AI-assisted learning design and data-driven component rendering.
- Understood team-based version control, code merging, and collaboration under tight deadlines.

## 💬 Personal Reflection

This project was a major turning point for me — it was where I really learned how to blend AI with practical product design. The experience of turning a raw text prompt into something tangible and useful for learners showed me how powerful LLMs can be when paired with strong frontend logic.

---

# 📦 Smart Inventory Management Dashboard

## Overview

The Smart Inventory Management Dashboard was built as part of my Software Engineering Fellowship program. It's a modern web application designed to streamline inventory tracking through automation, analytics, and AI-driven item recognition.

The system provides full CRUD capabilities (Create, Read, Update, Delete) for managing product inventories while introducing a unique feature: AI-powered product entry through image capture. Users can add inventory items simply by taking photos — the app automatically detects the product name, generates a short description, and extracts visible price details if available.

## ✨ Key Features

- **🧾 Comprehensive Inventory Table**: View and manage all product details, including name, description, price, quantity, and date added.
- **📈 Real-Time Analytics**: Integrated dashboard with graphs and metrics showing stock trends, total inventory value, and quantity distribution.
- **📸 AI-Assisted Product Recognition**: Add items by capturing a product photo — the system extracts name, description, and visible pricing automatically.
- **🔄 Full CRUD Operations**: Create, read, update, and delete inventory records seamlessly.
- **💻 Responsive UI**: Optimized for both desktop and mobile users, supporting device cameras for quick product input.

## 🧩 Tech Stack

- **Frontend Framework**: Next.js
- **UI Library**: Chakra UI
- **State Management**: React Hooks
- **AI Layer**: Vision model integration via OpenAI / OpenRouter
- **Charts & Analytics**: Chart.js
- **Database**: MongoDB
- **Deployment**: Vercel

## ⚙️ Development Notes

- Implemented a modular CRUD structure for flexible data manipulation.
- Integrated camera input APIs to allow real-time photo capture from browser devices.
- Connected an image-to-text model for auto-generating item descriptions and metadata.
- Designed the dashboard layout with Chakra UI components for clean responsiveness and maintainability.

## 🚀 Outcome

- Delivered a working prototype capable of automating the most time-consuming part of inventory management — data entry.
- The dashboard successfully demonstrated AI's potential to replace manual recording processes in small businesses and retail environments.
- Served as a practical showcase of AI integration within standard business workflows.

## 🧭 Key Learnings

- Gained experience in combining computer vision with structured data workflows.
- Learned how to design efficient and responsive dashboards with data visualizations.
- Understood how to connect frontend camera APIs to backend processing pipelines.

## 💬 Personal Reflection

This project changed how I see automation. It proved that everyday business problems — like stock entry — can be massively improved with just a bit of AI and thoughtful UX. It's one of those builds that showed me what "smart web apps" should actually feel like.

---

# 🤖 Machine Learning Portfolio – Titanic & House Price Prediction

## Type
Machine Learning / Data Science Projects

## Tech Stack
Python, Pandas, NumPy, Scikit-learn, Matplotlib, Jupyter Notebook

## Overview

These projects were part of my early journey into machine learning, where I explored real-world prediction problems using supervised learning techniques. They helped me understand how data preprocessing, model selection, and evaluation come together to create reliable predictive systems.

## Projects

### 1. Titanic – Machine Learning from Disaster
Built a classification model that predicts which passengers were likely to survive the Titanic shipwreck.

- Cleaned and engineered passenger data to reveal relationships between gender, age, and survival likelihood.
- Trained multiple supervised models including Logistic Regression and Random Forest, fine-tuning parameters using GridSearchCV.
- Analyzed model performance and extracted insights — e.g., women, children, and first-class passengers had higher survival probabilities.

### 2. House Price Prediction
Developed a regression model to predict housing prices based on features such as number of rooms, area, and location data.

- Conducted extensive exploratory data analysis to identify key drivers of price variations.
- Applied feature scaling, encoding, and regularization techniques to improve model performance.
- Achieved strong predictive accuracy using supervised models such as Linear Regression and Gradient Boosting.

## Impact

Both projects strengthened my ability to handle datasets end-to-end — from data cleaning and visualization to model training, evaluation, and fine-tuning. They also deepened my understanding of supervised learning workflows, forming the foundation for more advanced projects like customer segmentation and image-based classification models.

---

# 🏫 Daglore Model International School Website

## Type
Full-Stack Web Development

## Tech Stack
Next.js, TypeScript, Tailwind CSS, ShadCN UI

## Overview

This project was a full-scale website developed for Daglore Model International School, a private nursery, primary, and secondary school. The goal was to create a professional and user-friendly online presence that showcases the school's values, facilities, and admission process.

## Details

- Designed and built the entire frontend and backend architecture using Next.js, ensuring fast performance and SEO optimization.
- Implemented multiple core pages — Homepage, About, Gallery, Admissions, Contact, and Blog — each tailored to reflect the school's brand and communicate information clearly.
- Integrated a dynamic blog section where school administrators can post updates, announcements, and events.
- Styled the UI using Tailwind CSS and ShadCN UI to maintain a clean, consistent design language across all pages.
- Deployed the project and optimized for accessibility, mobile responsiveness, and efficient loading.

## Impact

The website established Daglore Model International School's digital presence and streamlined how parents, students, and prospective applicants interact with the school. The project also strengthened my experience in Next.js full-stack development, SEO optimization, and production-grade frontend design systems.

---

# 💼 Bursary Management Dashboard

## Type
Full-Stack School Finance Application

## Tech Stack
Next.js, TypeScript, Tailwind CSS, ShadCN UI, Prisma ORM, Supabase

## Overview

The Bursary Management Dashboard is a comprehensive financial analytics and student management platform designed to help schools streamline their bursary operations. The project originated from Daglore Model International School, where the bursary department struggled with manual financial tracking and reporting.

## 🧩 Problem

Before this system, all financial records were handled manually through paper-based methods and spreadsheets — a process that was slow, error-prone, and difficult to scale. Tasks such as identifying debtors in specific classes or generating term-based financial reports required hours of manual cross-checking.

## ✅ Solution

To solve this, I developed a modular bursary management system that automates student billing, fee tracking, and reporting. The platform allows schools to:

- Manage student profiles, class groups, and financial records.
- Define and assign custom fee schedules (e.g., tuition, library, transportation, uniforms) to specific class groups or academic terms.
- Track student payment statuses and generate invoice summaries and analytics in real time.
- Handle term management in alignment with the Nigerian academic calendar (first, second, and third term).
- Implement role-based access control for bursars, assistants, and administrators.
- Log all user activity for transparency and accountability.

## 🔧 Technical Highlights

- Built using Next.js and TypeScript for scalability and modular architecture.
- Integrated Prisma ORM with Supabase for real-time database operations.
- Designed with Tailwind CSS and ShadCN UI for a clean, responsive interface.
- Employed AI-assisted development agents to support code modularization and accelerate development.

## 📊 Status

The project is currently in its final testing and optimization phase. Core modules — including analytics, group management, term management, and invoicing — are complete.

## 🚀 Future Plan

I plan to offer this system to other schools as a one-time-purchase software solution, providing them with full ownership and lifetime access without recurring subscription fees.

## 💡 Impact

This project has already simplified financial operations at Daglore Model International School, reducing manual work and improving transparency. It demonstrates my ability to translate real-world operational challenges into full-scale, production-ready software systems.
