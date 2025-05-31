# 🧠 SmartCV

An AI-powered web app that helps you **create**, **tailor**, and **polish** your resume and cover letter for any job posting. Built with React, Flask, and the Gemini API, TailorTrack makes job applications smarter and more personalized.

---

## ✨ Features

- 📝 **Resume Builder**  
  Input your education, experience, skills, and instantly generate a professional resume.

- 🎯 **Job Description Tailoring**  
  Upload or paste a job posting and receive a tailored version of your resume that highlights relevant experience and keywords.

- ✍️ **Cover Letter Generator**  
  Automatically create personalized cover letters based on your resume and a job description.

- 📄 **Downloadable PDFs**  
  Export your resume and cover letter in clean, ATS-friendly formats.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite

### Backend
- Flask (Python)
- Gemini API (Google Generative Language API)
- PDF generation (`pdfkit` / `react-pdf`)

---

## 📂 Project Structure
SmartCV/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components (Forms, ResumeViewer, etc.)
│ │ ├── pages/ # Page views (Builder, Tailor, CoverLetter)
│ │ ├── App.jsx
│ ├── public/
│ ├── package.json
│
├── server/ # Flask backend
│ ├── app/
│ │ ├── routes/ # Endpoints for resume, tailoring, cover letter
│ │ ├── services/ # Gemini API & PDF utilities
│ │ └── init.py
│ ├── run.py
│ ├── requirements.txt
│
├── .env # API keys and config
├── README.md


---

## ⚙️ Getting Started

### 1. Clone the repo
    ```bash
    git clone https://github.com/your-username/tailortrack.git
    cd tailortrack

### 2. Set up the backend
    cd server
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    flask run

### 3. Set up the frontend
    cd client
    npm install
    npm run dev

## 🔑 Environment Variables
    ```client/.env
    VITE_API_BASE_URL=http://localhost:5000
    VITE_GEMINI_API_KEY=your_gemini_api_key_here

    ```server/.env
    GEMINI_API_KEY=your_gemini_api_key_here
    FLASK_ENV=development

## 📚 Credits
Created by Louis Nguyen  
Powered by Google Gemini APi
