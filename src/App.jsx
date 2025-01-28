import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDashboard from './pages/TaskDashboard';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import ErrorBoundary from './utils/ErrorBoundary.jsx'


function App() {
  return (
    <>
    <Navbar />
      <Router basename='/task-manager-app'>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard' element={<ProtectedRoute><TaskDashboard /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  )
}

export default App
