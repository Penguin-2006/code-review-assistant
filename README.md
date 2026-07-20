# Code Review Assistant - Full Stack MERN Application

A full stack AI-powered code review tool built with the MERN stack. Paste in a code snippet and get structured feedback on bugs, style issues, security concerns, and complexity — backed by Groq AI, with reviews saved to your personal history.

## Live Demo

- Frontend: https://code-review-assistant-bice.vercel.app
- Backend: https://code-review-assistant-s9u6.onrender.com

> Note: The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on the first request if it has been inactive.

## Features

- User authentication with JWT and bcrypt password hashing
- Submit code in any language and receive structured AI feedback across four categories: bugs, style, security and complexity
- Review history — every submission is saved and viewable later
- Rate limiting on auth and review endpoints
- Input validation to prevent NoSQL injection
- Fully responsive design

## Tech Stack

### Frontend
- React.js (Vite)
- React Router v6
- Axios
- Plain CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Groq SDK (AI integration — Llama 3.3 70B)

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Groq API key (free at console.groq.com)

### Installation

1. Clone the repository

```
git clone https://github.com/Penguin-2006/code-review-assistant.git
cd code-review-assistant
```

2. Set up the backend

```
cd backend
npm install
```

3. Create a .env file in the backend folder

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=http://localhost:5173
```

4. Start the backend

```
npm run dev
```

5. Set up the frontend

```
cd ../frontend
npm install
npm run dev
```

6. Open http://localhost:5173 in your browser

## Project Structure

```
code-review-assistant/
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/        # Auth context
│       ├── pages/          # Login, Register, Dashboard, Review
│       └── utils/          # Axios instance
├── backend/                # Express backend
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth and rate limit middleware
│   ├── models/             # User and Review schemas
│   ├── routes/             # API routes
│   ├── utils/              # Groq AI integration
│   └── server.js           # Entry point
```

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive a token

### Reviews
- POST /api/reviews - Submit code for AI review
- GET /api/reviews - Get all reviews for the logged-in user
- GET /api/reviews/:id - Get a single review by ID

## Security

- Passwords hashed with bcrypt, never stored in plain text
- JWT-based auth with protected routes
- Rate limiting on login and review submission endpoints
- Input validation to prevent NoSQL injection
- Environment variables never committed to version control
