import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDashboard from './pages/TaskDashboard';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
    <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<TaskDashboard />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
