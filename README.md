# EventEase — Event Management Platform

EventEase is a full-stack web application that helps users discover events, create events, and register for workshops. Organizers can manage events and view attendee information.

## Live Demo

- **Frontend:** https://event-ease-henna.vercel.app
- **GitHub Repository:** https://github.com/advitiandanur10-byte/EventEase
- **Backend:** https://eventease-backend-r9zg.onrender.com

## Features

- Browse upcoming events.
- Create and manage events.
- User registration and login.
- Workshop registration.
- Organizer and attendee functionality.
- Persistent event data using MongoDB.

## Technologies Used

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT authentication

**Database**
- MongoDB Atlas
- Mongoose

**Deployment and Version Control**
- Git and GitHub
- Vercel for the frontend
- Render for the backend

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/advitiandanur10-byte/EventEase.git
cd EventEase
```

### 2. Start the backend

```bash
cd server
npm install
node server.js
```

Configure the required environment variables in `server/.env` before starting the backend. Never commit real credentials or secrets.

### 3. Start the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Environment Configuration

Keep database connection strings, JWT secrets, and other sensitive credentials in the backend environment configuration. Do not publish them in GitHub.

## Future Improvements

- Event search and category filters.
- Improved mobile responsiveness.
- Event reminders and email notifications.
- Organizer analytics and attendee management.
- Automated testing and improved error handling.

## Author

Developed as an engineering project to practise full-stack web development, API integration, authentication, and deployment.


