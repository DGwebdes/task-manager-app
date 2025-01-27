import {useAuthContext} from '../context/AuthContext';

const LoginNavButton = () => {
    const {authState, loading, logout} = useAuthContext();
    const handleClick = () => {
        if (authState.isAuthenticated) {
            logout();
        } else {
            window.location.href = '/login';
        }
    }
  return (
    <button onClick={handleClick} disabled={loading}>
        { loading ? 'Loading...' : authState.isAuthenticated ? 'Logout' : 'Login / Register'}
    </button>
  )
}

export default LoginNavButton;