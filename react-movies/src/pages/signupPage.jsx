import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext"; 

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

    // Optional: validate password format here
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
    <div>
      <h2>Sign Up</h2>
      <p>You must register a username and password to log in.</p>
      
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      /><br />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default SignUpPage;
