import { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../services/api';

export const AuthContext = createContext();

const useAuth = () => {
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        isAuthenticated: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AuthContext logging")

        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('authUser'));
        if (token && user){
            console.log('user authenticated', user)
            setAuthState({ token, user, isAuthenticated: true });
        } else {
            console.log('user not authenticated')
            setAuthState({ token: null, user: null, isAuthenticated: false });
        }
        setLoading(false);
    },[]);

    //Login method
    const login = async (credentials) => {
        try {
            const response = await API.post('/auth/login', credentials);
            console.log("Response from request authContext: ", response);
            const {token, user} = response.data;

            if (!token || !user){
                console.log('User not found or Invalid credentials');
                throw new Error('Invalid credentials');
            }
            localStorage.setItem('authToken', token);
            localStorage.setItem('authUser', JSON.stringify(user));

            //update state
            setAuthState({ token, user, isAuthenticated: true });
            //redirect to dashboard
            return;
        } catch (error) {
            console.log('Login failed', error.response?.data || error.message);
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        //clear storage and state
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setAuthState({ token: null, user: null, isAuthenticated: false });

        //redirect home
        return;
    };

    //context value
    return {
        authState,
        loading,
        login,
        logout,
    };
};

const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
}

export const useAuthContext = ()=> useContext(AuthContext);
export default AuthProvider;
