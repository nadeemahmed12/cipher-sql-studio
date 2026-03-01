## CipherSQL Studio - Backend

## 📌 Overview
CipherSQL Studio is an interactive SQL learning platform backend that allows users to:

- Execute SQL queries safely
- Validate results against expected output
- Generate AI-powered hints using Gemini LLM
- Work inside isolated PostgreSQL schemas per assignment

---
# 🛠️ Project Setup Instructions

## 1️⃣ Clone Repository
- git clone <https://github.com/nadeemahmed12/cipher-sql-studio.git>
- cd backend
## 2️⃣Install Dependencies
- npm install

## 3️⃣Environment Variables
- PG_USER=postgres
- PG_HOST=localhost
- PG_DATABASE=ciphersqlstudio
- PG_PASSWORD=root
- PG_PORT=5432

MONGO_URI="mongodb://localhost:27017/ciphersqlstudio"
- PORT=3000
- GEMINI_API_KEY=your_gemini_api_key_main_backend_folder

## 4️⃣Start Server
- npm run dev
- http://localhost:3000




## 🧠 Features

### 1️⃣ Assignment Management
- Create assignment
- Store question + expected output
- Store sample table structure and rows

### 2️⃣ Dynamic Workspace System
- Creates dedicated PostgreSQL schema per assignment
- Automatically creates tables
- Inserts sample data
- Ensures schema isolation

### 3️⃣ Secure SQL Execution
- Only `SELECT` queries allowed
- Blocks dangerous keywords:
  - DROP
  - DELETE
  - ALTER
  - UPDATE
  - INSERT
  - TRUNCATE
  - CREATE
- Compares user output with expected output

### 4️⃣ AI-Powered Hint System
- Integrated with Gemini 3 Flash
- Uses prompt engineering
- Prevents full solution leakage
- Provides short conceptual hints only

#### 🏗️ Technology Choices
🔹 Node.js + Express
- Used to build REST APIs and handle backend logic efficiently.

🔹 MongoDB
- Chosen for flexible storage of assignment data, including:
 - Question
 - Expected output
 - Sample tables

🔹 PostgreSQL
 - Used as SQL execution engine because:
 - Strong SQL support
 - ACID compliance
 - Schema-based isolation

🔹 Gemini LLM (gemini-3-flash-preview)
 - Fast response
 - Lightweight model

📌 API Endpoints
Create Assignment
  - POST /api/cipherstudio/create
Get All Assignment
  - GET /api/cipherstudio/
Get Assignment By Id(particular assignment) 
  - GET /api/cipherstudio/:id/
Execute Query
  - POST /api/cipherstudio/:id/execute
Delete workspace in (postgre)
  - DELETE /api/cipherstudio/:id/workspace
Get AI Hint
  - POST /api/cipherstudio/:id/hint
  
