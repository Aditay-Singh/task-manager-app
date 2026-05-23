# Task Manager System

A full-stack Task Manager web application built using the MERN stack.

This project was developed as a job assessment project with proper role-based authentication, project management, task assignment, dashboard analytics, and responsive UI.

---

# Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Context API
- CSS3

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

# Features

## Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access

## Admin Features
- Create Projects
- Assign Team Members
- Create Tasks
- Edit Tasks
- Delete Tasks
- Dashboard Statistics
- Task Monitoring

## Member Features
- View Assigned Tasks
- Update Task Status
- Personal Dashboard

---

# Project Structure

```bash
AssignmentWork/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Backend Folder Structure

```bash
backend/src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
└── server.js
```

---

# Frontend Folder Structure

```bash
frontend/src/
│
├── api/
├── components/
├── context/
├── pages/
├── routes/
├── styles/
├── App.jsx
└── main.jsx
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager-app.git
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

## Start Backend Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |

---

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get All Projects |
| POST | /api/projects | Create Project |

---

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get Tasks |
| POST | /api/tasks | Create Task |
| PUT | /api/tasks/:id | Update Task |
| DELETE | /api/tasks/:id | Delete Task |

---

# Dashboard Statistics

- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Total Projects
- Total Members
- Completion Rate

---

# Authentication Flow

1. User registers
2. JWT token generated
3. Token stored in localStorage
4. Protected APIs accessed using token
5. Role-based dashboard rendered

---

# Deployment

## Backend Deployment
- Railway

## Frontend Deployment
- Railway

## Database
- MongoDB Atlas

---

# Future Improvements

- Email Notifications
- File Uploads
- Team Chat
- Real-Time Updates
- Drag & Drop Kanban Board

---

# Screenshots

## Admin Dashboard
- Project Creation
- Task Assignment
- Analytics Cards

## Member Dashboard
- Assigned Tasks
- Status Updates

---

# Author

Developed by Aditya

---

# License

This project is created for educational and assessment purposes.