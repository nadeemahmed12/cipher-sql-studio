# CipherSQLStudio - Frontend

A browser-based SQL learning interface built using React.js and Vanilla SCSS.

This frontend allows users to:
- View SQL assignments
- Attempt SQL queries in a browser editor
- Execute queries in real-time
- View results and errors
- Get intelligent hints (without full solutions)

---

## 🚀 Tech Stack

- React.js
- React Router
- Axios
- Vanilla SCSS (Mobile-first)
- Monaco Editor (SQL editor)

## 📱 Responsive Design
This project follows a **mobile-first approach**.
Breakpoints used:

- 320px (Mobile)
- 641px (Tablet)
- 1024px (Laptop)
- 1281px (Desktop)

SCSS Features Used:

- Variables
- Mixins
- Nesting
- Partials
- BEM naming conventions

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
- git clone <https://github.com/nadeemahmed12/cipher-sql-studio.git>
- cd frontend

2️⃣ Install dependencies
- npm install

3️⃣ Start development server
- npm run dev

🔄 Application Flow
- User lands on Assignment Listing Page
- Selects an assignment
- Navigates to Assignment Attempt page
- Writes SQL query in Monaco Editor
- Clicks "Execute Query"
- Backend validates and executes query
- Results displayed in formatted table
- User may request hint
- Hint displayed (without full solution)