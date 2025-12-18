import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';

const LoginPage = () => {
    const { isAuthenticated, authenticate } = useContext(AuthContext); // Get context
    const [userName, setUserName] = useState(""); // Local state for form
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation(); // To redirect after login

    // Redirect path after login (default to /home)
    const from = location.state?.from?.pathname || "/home";
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await authenticate(userName, password);
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    };
    if (isAuthenticated) return <Navigate to={from} />;

    return (
    <Box 
     sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      backgroundColor: "#f4f6f8",
      p: 2
    }}
  >
   <Paper
  elevation={6}
  sx={{
    p: 4,
    maxWidth: 400,
    width: "100%",
    borderRadius: 3,
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
  }}
>
  <Typography variant="h4" gutterBottom>
    Login
  </Typography>
  <Typography variant="body1" gutterBottom>
    You must log in to view the protected pages
  </Typography>

  {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

  <form onSubmit={handleLogin}>
    <TextField
      fullWidth
      label="Username"
      value={userName}
      onChange={e => setUserName(e.target.value)}
      required
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      type="password"
      label="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
      sx={{ mb: 2 }}
    />
    <Button type="submit" variant="contained" color="primary" fullWidth>
      Log In
    </Button>
  </form>

  <Typography variant="body2" sx={{ mt: 2 }}>
    Not registered? <Link to="/signup">Sign Up!</Link>
  </Typography>
</Paper>
  </Box>
);
};
export default LoginPage;
