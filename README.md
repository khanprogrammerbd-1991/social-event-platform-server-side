# Social Event Management - Backend API

This is the server-side application for the Social Event Management platform. It provides a robust RESTful API built with Express.js, handles secure cross-origin user authentication using Better Auth, and manages data using the native MongoDB driver.

## 🚀 Live Deployment
**Production Server:** https://social-event-website-server.vercel.app/

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Native `MongoClient`)
* **Authentication:** Better Auth
* **Deployment:** Vercel

## ✨ Key Features
* **Secure Authentication:** Cookie-based session management configured for cross-origin requests (`sameSite: "none"`, `secure: true`).
* **Event Management:** CRUD operations for creating, reading, and managing social events.
* **Participant Tracking:** Endpoint logic to handle users joining events and storing participant data securely.
* **CORS Configured:** Strictly connected to the authorized frontend deployment to prevent unauthorized data access.

## ⚙️ Environment Variables
To run this project locally, you must create a `.env` file in the root directory and add the following variables:

```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_atlas_connection_string

# Better Auth Configuration
BETTER_AUTH_SECRET=your_random_secure_secret_string
BETTER_AUTH_URL=http://localhost:3000 # Use your live server URL in production