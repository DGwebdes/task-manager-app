# Frontend Documentation

## Project Overview
This is the **frontend** of a Task Management application built using **React**. The app allows users to:

- Register and log in with token-based authentication.
- Manage tasks by creating, updating, deleting, and filtering them.
- Securely interact with the backend API.
- Handle errors gracefully for an improved user experience.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- A running backend server for the API

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

3. Create an `.env` file for environment variables (if needed):
   ```plaintext
   REACT_APP_API_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

### Build for Production
To build the project for production:
```bash
npm run build
```
The production build will be located in the `build/` directory.

---

## Folder Structure
```
frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (e.g., Navbar, CreateTaskPopup)
│   ├── pages/            # Application pages (e.g., LoginPage, TaskDashboard)
│   ├── services/         # API setup and utilities (e.g., Axios interceptors)
│   ├── utils/            # General utility functions (e.g., error handlers, ErrorBoundary)
│   ├── context/          # Context and providers (e.g., ProtectedRoute)
│   └── styles/           # CSS and styling files
├── .env                  # Environment variables (optional)
└── package.json          # Project dependencies and scripts
```

---

## Key Features

### 1. **Authentication**
- **Register and Login Pages**: Users can create an account and log in to the app.
- **Token Management**: Tokens are stored in `localStorage` and automatically included in API requests using Axios interceptors.
- **Protected Routes**: Certain pages (e.g., TaskDashboard) are only accessible to authenticated users.

### 2. **Task Management**
- **TaskDashboard**: Displays tasks with filtering options (priority, completion status, due date).
- **TaskCard**: Represents individual tasks with options to edit, delete, or toggle completion status.
- **Popups**:
  - `CreateTaskPopup` for creating new tasks.
  - `EditTasksPopup` for editing existing tasks.

### 3. **Error Handling**
- **ErrorBoundary**: Catches and displays fallback UI for rendering errors.
- **Error Handler Utility**: Handles API errors gracefully and provides user-friendly feedback.

### 4. **Global Axios Setup**
- Centralized Axios configuration with:
  - Base URL (`http://localhost:3000`)
  - Authorization header for secure API requests
  - Interceptor for handling expired tokens (redirects to login).

---

## API Integration

### API Endpoints Used
| Endpoint                     | Method | Description                    |
|------------------------------|--------|--------------------------------|
| `/register`                  | POST   | Register a new user            |
| `/login`                     | POST   | Log in a user                  |
| `/tasks`                     | GET    | Fetch all tasks                |
| `/tasks`                     | POST   | Create a new task              |
| `/tasks/:id`                 | PUT    | Update an existing task        |
| `/tasks/:id`                 | DELETE | Delete a task                  |
| `/tasks/:id/status`          | PATCH  | Toggle task completion status  |

---

## Testing
- Perform testing using manual interactions in the browser.
- Debug any network/API-related issues via the browser's developer tools.

---

## Known Issues
- Ensure the backend server is running before testing frontend functionality.
- Expired tokens redirect users to the login page but do not display an explicit message.

---

## Future Improvements
- Add notifications/reminders for tasks.
- Implement pagination for large task datasets.
- Optimize task filtering performance for complex queries.
