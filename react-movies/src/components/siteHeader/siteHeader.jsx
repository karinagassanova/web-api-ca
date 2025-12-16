import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import tmdbLogo from '../../images/tmdb.png';
import "../../App.css";

const SiteHeader = () => {
  const { isAuthenticated, userName, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Update header height on mount and window resize
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="header-left">
          <img
            src={tmdbLogo}
            alt="TMDB Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="header-right">
          {isAuthenticated ? (
            <>
              <span className="welcome-text">Welcome {userName}!</span>
              <button className="header-btn" onClick={signout}>Sign out</button>
            </>
          ) : (
            <>
              <Link className="header-btn" to="/login">Login</Link>
              <Link className="header-btn" to="/signup">Signup</Link>
            </>
          )}
        </div>
      </header>

      {/* Dynamic spacer so content starts below header */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
};

export default SiteHeader;
