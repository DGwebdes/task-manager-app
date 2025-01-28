import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Use dynamic import for pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const TaskDashboard = React.lazy(() => import('./pages/TaskDashboard'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

import Navbar from './components/Navbar';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import ErrorBoundary from './utils/ErrorBoundary.jsx'


function App() {
  return (
    <>
    <Navbar />
      <Router basename='/task-manager-app'>
        <ErrorBoundary>
          <React.Suspense fallback={<div> Loading... </div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/dashboard' element={<ProtectedRoute><TaskDashboard /></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </Routes>
          </React.Suspense>
        </ErrorBoundary>
      </Router>
    </>
  )
}

export default App
