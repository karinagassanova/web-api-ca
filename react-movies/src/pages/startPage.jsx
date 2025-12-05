import { Link } from "react-router-dom";


const StartPage = () => {
  
    return(
        <>
            <p>
                Welcome to TMDB! View your <Link to="/home">Movies</Link> or your <Link to="/profile">Profile</Link>.
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to view movies!
            </p>
        </>
    );
  };

export default StartPage;
