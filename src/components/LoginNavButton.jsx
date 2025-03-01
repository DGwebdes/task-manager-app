import { useAuthContext } from "../context/AuthContext";

const LoginNavButton = () => {
    const { authState, loading, logout } = useAuthContext();
    const handleClick = () => {
        if (authState.isAuthenticated) {
            logout();
        } else {
            window.location.href = "/login";
        }
    };
    return (
        <>
            <button onClick={handleClick} disabled={loading}>
                {loading ? (
                    "Loading..."
                ) : authState.isAuthenticated ? (
                    "Logout"
                ) : (
                    <img
                        src="/avatar.png"
                        id="navbar-login"
                        alt="navbar-login"
                    />
                )}
            </button>
        </>
    );
};

export default LoginNavButton;
