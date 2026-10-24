
# EventEase — Workshop Registration System

EventEase is a full-stack web application for creating technical workshops and managing participant registrations.

## Features

- Create and display technical workshops.
- User registration, login, and logout.
- MongoDB database integration.
- JWT-based authentication.
- Participant registration for workshops.
- Duplicate-registration prevention.
- Organizer access controls.

- Seat-limit management
- Organizer attendee dashboard
- Improved responsive design
- Production deployment and testing


## Technology Stack

- Frontend: React.js and Vite
- Backend: Node.js and Express.js
- Database: MongoDB Atlas
- Authentication: JSON Web Tokens (JWT)
- Password security: bcryptjs
- API testing: Postman
- Version control: Git and GitHub

## Project Structure

- `client/` — React frontend
- `server/` — Express backend and API routes
- `server/models/` — MongoDB models
- `server/routes/` — API endpoints
- `server/middleware/` — Authentication and authorization

## Prerequisites

- Node.js and npm
- Git
- A MongoDB Atlas database

## Setup Instructions

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd eventease
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside `server/`:

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000
```

Use your own credentials. Never commit `.env` to GitHub.

### 5. Start the backend

From the `server/` folder:

```bash
node server.js
```

### 6. Start the frontend

From the `client/` folder:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## API Overview

- `GET /api/events` — retrieve events
- `POST /api/events` — create an event
- `GET /api/events/:id` — retrieve one event
- `PUT /api/events/:id` — update an event
- `DELETE /api/events/:id` — delete an event
- `POST /api/auth/register` — register an account
- `POST /api/auth/login` — log in
- `POST /api/registrations` — register for an event
- `GET /api/registrations/my` — view the current user's registrations

## Deployment

Live website: To be added

GitHub repository: To be added


