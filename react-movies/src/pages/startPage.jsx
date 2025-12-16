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
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to start exploring movies!
        </p>
      )}
    </div>
  );
};

export default StartPage;
