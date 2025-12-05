import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const LoginPage = () => {
    const { isAuthenticated, authenticate } = useContext(AuthContext); // Get context
    const [userName, setUserName] = useState(""); // Local state for form
    const [password, setPassword] = useState("");
    const location = useLocation(); // To redirect after login

    // Redirect path after login (default to /home)
    const from = location.state?.from?.pathname || "/home";
    const handleLogin = async () => {
        await authenticate(userName, password);
    };
    if (isAuthenticated) return <Navigate to={from} />;

    return (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>
            
            <input
                id="username"
                placeholder="user name"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            /><br />
            <input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            /><br />
            
            <button onClick={handleLogin}>Log in</button>
            
            <p>Not Registered?
                <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};


export default LoginPage;
