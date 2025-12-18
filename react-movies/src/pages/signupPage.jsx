import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext"; 
import { Box, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!userName || !password || !passwordConfirm) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters, include a number and a special character.");
      return;
    }

    try {
      setLoading(true);
      const success = await register(userName, password);

      if (success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert("Registration failed. Try a different username.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

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
      Sign Up
    </Typography>
    <Typography variant="body1" gutterBottom>
      Register a username and password to log in.
    </Typography>

    {loading && <Alert severity="info" sx={{ mb: 2 }}>Registering...</Alert>}

    <form onSubmit={handleRegister}>
      <TextField
        fullWidth
        label="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>

    <Typography variant="body2" sx={{ mt: 2 }}>
      Already have an account? <Link to="/login">Login</Link>
    </Typography>
  </Paper>
</Box>
  );
};

export default SignUpPage;
