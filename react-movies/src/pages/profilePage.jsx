import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userName } = useContext(AuthContext);

  return isAuthenticated ? (
    <p>User profile: {userName}</p>
  ) : (
    <p>
      You must log in to see your profile!{" "}
      <button onClick={() => navigate('/login')}>Login</button>
    </p>
  );
};

export default ProfilePage;
