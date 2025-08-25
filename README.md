# 🧠 SmartCV

An AI-powered web app that helps you **create**, **tailor**, and **polish** your resume and cover letter for any job posting. Built with React, Flask, and the Gemini API, SmartCV makes job applications smarter and more personalized, increasing your chances of landing a job.

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
- Flask
- Gemini API
- PDF generation

---

## ⚙️ Getting Started

### 1. Clone the repo
    ```bash
    git clone https://github.com/louisnguyenn/SmartCV.git
    cd SmartCV

### 2. Set up the backend
    cd server
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python3 app.py

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
