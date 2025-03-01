# Task Management Web Application

## Project Overview

This project is a full-stack web application designed for managing tasks efficiently. It allows users to register, log in, and manage their tasks securely. The application is built using modern technologies and follows best practices for scalability, security, and usability.

## Student Perspective

Before I dive into a more industry-oriented documentation, let me talk a little about what I learned and what was the process for this project.
First, this is really simple in nature, a task-manager that allows users to login and create/edited their tasks, however, what I really think was an important aspect of building this was building able to build frontend and backend separately and communicate efficiently, handle user information and how they are stored, either on the server or on the client. Learn how to handle user input and input sanitization for safety and infer format.
I used tools like JWT token and bcrypt to encrypt and store user information. I also used Yup to validate user input on the frontend.
Something of particular interest to me was the backend and how to handle proper authentication. I used limiter to mitigate potential brute force attacks, together with a middleware to protect routes both for users and tasks. For users in particular I use validation for the register route to improve on sanitization of incoming data from user to follow an expected format. I do make use of localStorage for this application, however it was for learning purposes only as I see no reason as to why not use cookies instead.
I use logger and errorResponse util to simplify and clean up the code a little.
Some other important skill I learned along the way was how to deploy my backend to a hosting service, in my case, Render. Which, thankfully has a free tier.

The frontend is being hosted on netlify, which reploys the application every time i push code to its github repo. I use a serverless function on netlify that pings my server on render and keeps it from going cold, improving response time, as it can be very very slow when the website is not very busy (which, is my case, of course).
Although I have implemented the backend for profile, I did not get around to implement the frontend for it as of yet but plan on expanding this application on the future and accept collaboration happily.

## Key Features

- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Task Management**: Create, update, delete, and mark tasks as complete.
- **Technology Stack**: Built with **Node.js, Express, MongoDB, React**.
- **Security Measures**: Input validation, password hashing, and API protection.
- **Scalable Deployment**: Backend on Render, frontend on Netlify.

---

## Technology Stack

### Backend

- **Node.js**: Server-side runtime for building scalable applications.
- **Express**: Framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing users and tasks.
- **JWT**: Secure authentication mechanism.
- **Bcrypt**: Library for hashing user passwords.
- **Mongoose**: ODM for MongoDB, enabling easy schema and model definitions.

### Frontend

- **React**: Frontend library for building interactive UIs.
- **React Router**: Client-side routing for navigation.
- **Axios**: HTTP client for API communication.
- **Yup**: Schema validation library for form validation.
- **React Hook Form**: Library for managing form state and validation.

---

## API Documentation

### Authentication Endpoints

#### Register User

**POST** `/auth/register`

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

- `200`: User registered successfully.
- `400`: Validation error or email already in use.

#### Login User

**POST** `/auth/login`

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

- `200`: Returns access token and refresh token.
- `401`: Invalid credentials.

### Task Management Endpoints

#### Fetch All Tasks

**GET** `/tasks`

- **Headers**: `Authorization: Bearer <token>`
- **Response:**
  - `200`: Returns list of tasks.
  - `401`: Unauthorized.

#### Create Task

**POST** `/tasks`

```json
{
  "title": "string",
  "description": "string",
  "priority": "string",
  "dueDate": "ISODate"
}
```

**Response:**

- `201`: Task created successfully.
- `400`: Validation error.

#### Update Task

**PUT** `/tasks/:taskId`

- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Fields to update.
- **Response:**
  - `200`: Task updated successfully.
  - `404`: Task not found.

#### Delete Task

**DELETE** `/tasks/:taskId`

- **Headers**: `Authorization: Bearer <token>`
- **Response:**
  - `200`: Task deleted successfully.
  - `404`: Task not found.

---

## Frontend Structure

### Core Pages

- **Login Page**: Users log in using email and password.
- **Register Page**: Users create an account with username, email, and password.
- **Dashboard**: Displays tasks with options to create, update, delete, and filter tasks.
- **Profile Page (Future Enhancement)**: Allows users to update their profile and password.

### Key Components

- **FormField Component**: Reusable input field with validation.
- **TaskCard Component**: Displays task details and actions.
- **Navbar Component**: Navigation links for dashboard and logout.

---

## Development Workflow

### Backend

1. Build and test authentication endpoints.
2. Implement task-related endpoints with validation and authorization.
3. Secure API with middleware and token-based authentication.

### Frontend

1. Set up React project and define routes.
2. Build reusable components and UI.
3. Integrate backend with Axios and handle API responses.

### Deployment

- **Backend**: Deployed on Render.
- **Frontend**: Hosted on Netlify.

---

## Setup Instructions

### Prerequisites

- Node.js installed
- Running backend API server

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

The production build will be located in the `build/` directory.

---

## Backend Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB instance running

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `.env` file:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_secret_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server runs on `http://localhost:3000`.

---

## Future Improvements

- Add notifications/reminders for tasks.
- Implement pagination for large datasets.
- Improve error handling and user feedback.
- Optimize task filtering performance.
- Implement profile feature in the frontend.

---

## Conclusion

This documentation serves as a guide for understanding and building the Task Management Web Application. It outlines the project’s goals, technical details, and roadmap for future development. Contributions and improvements are welcome!
