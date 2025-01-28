import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {useAuthContext} from './AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
    const { authState, loading } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !authState.isAuthenticated) {
            navigate('/task-manager-app/login');
        }
    },[loading, authState.isAuthenticated, navigate])

    if(loading || !authState.isAuthenticated){
        return null;
    }

    return children;
}

export default ProtectedRoute;