import { useState, createContext, useEffect } from "react";
import { login, signup } from "../api/tmdb-api";
import { getUserMovies } from "../api/userMovies-api";


export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");

  // Validate token on page load to check if user is actually authenticated
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Extract username from JWT token
        const tokenWithoutBearer = token.replace(/^(BEARER|Bearer)\s+/i, "");
        const payload = JSON.parse(atob(tokenWithoutBearer.split('.')[1]));
        if (payload.username) {
          setUserName(payload.username);
        }
        
        // Test token by fetching user movies - if successful, token is valid
        await getUserMovies();
        setIsAuthenticated(true);
      } catch {
        // Token is invalid or expired - clear it and set user as not authenticated
        localStorage.removeItem("token");
        setAuthToken(null);
        setIsAuthenticated(false);
        setUserName("");
      }
    };

    validateToken();
  }, []);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
