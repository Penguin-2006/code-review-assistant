# Code Review Assistant

A full-stack MERN application that provides AI-powered code reviews. Paste in a code snippet, and get structured feedback on bugs, style issues, security concerns, and complexity — backed by an LLM, with reviews saved to your personal history.


## Live Demo

- Frontend: https://code-review-assistant-bice.vercel.app
- Backend: https://code-review-assistant-s9u6.onrender.com

> Note: The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on the first request if it has been inactive.

## Features

- User authentication (JWT-based, passwords hashed with bcrypt)
- Submit code in any language and receive structured AI feedback across four categories: bugs, style, security, complexity
- Review history — every submission is saved and viewable later
- Rate limiting on auth and review endpoints
- NoSQL injection input validation
- Fully responsive design

## Tech Stack

**Frontend:** React, React Router, Vite, plain CSS (custom design system, no framework)

**Backend:** Node.js, Express, MongoDB (Mongoose)

**AI:** Groq API (Llama 3.3 70B) — structured JSON output parsing

**Auth:** JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas account (free tier)
- A Groq API key (free, from console.groq.com)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=http://localhost:5173
```

Run the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Log in and receive a token |
| POST | `/api/reviews` | Yes | Submit code for AI review |
| GET | `/api/reviews` | Yes | Get all reviews for the logged-in user |
| GET | `/api/reviews/:id` | Yes | Get a single review by ID |

## Security

- Passwords hashed with bcrypt, never stored in plain text
- JWT-based auth with protected routes
- Rate limiting on login (brute-force protection) and review submission (API quota protection)
- Input validation to prevent NoSQL injection
- Generic error responses — no internal error details leaked to clients
- MongoDB user scoped to read/write only, not admin
- CORS restricted to the frontend origin
- Environment variables never committed to version control

## Project Structure

```
code-review-assistant/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        ├── components/
        ├── context/
        └── utils/
```

