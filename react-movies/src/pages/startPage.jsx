import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';

const StartPage = () => {
  const { isAuthenticated, userName } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <p>
          Welcome {userName}! View your <Link to="/home">Movies</Link> or your <Link to="/profile">Profile</Link>.
        </p>
      ) : (
        <p>
        Browse <Link to="/home">Movies</Link>, or{" "}
        <Link to="/login">Login</Link> / <Link to="/signup">Signup</Link>
      </p>
      
      )}
    </div>
  );
};

export default StartPage;
