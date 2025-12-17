import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const AddToFavoritesIcon = ({ movie }) => {

  const AddToFavoritesIcon = ({ movie }) => {
    const { addToFavorites } = useContext(MoviesContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleAddToFavorites = (e) => {
      e.preventDefault();
  
      if (!isAuthenticated) {
        alert("Please log in to add favorites");
        navigate("/login");
        return;
      }
  
      addToFavorites(movie);
    };
  
    return (
      <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
        <FavoriteIcon
          fontSize="large"
          sx={{
            color: "#032541",
            "&:hover": { color: "#01b4e4" },
          }}
        />
      </IconButton>
    );
  };
  
};
export default AddToFavoritesIcon;
