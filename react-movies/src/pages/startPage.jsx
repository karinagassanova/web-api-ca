import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Container, Paper, Typography, Button, Stack,} from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';

const StartPage = () => {
  const { isAuthenticated, userName } = useContext(AuthContext);

  return (
<Container maxWidth="sm" sx={{ mt: 10 }}>
  <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
      {isAuthenticated ? (
       <Typography variant="h6" sx={{ mb: 3 }}>
  Welcome back, <strong>{userName}</strong>!
</Typography>
      ) : (
        <>
        <Typography variant="body1" sx={{ mb: 3 }}>
  Browse movies or sign in to personalize your experience.
</Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
 <Button
  variant="contained"
  component={RouterLink}
  to="/home"
  startIcon={<MovieIcon />}
>
  Movies
</Button>

<Button
  variant="outlined"
  component={RouterLink}
  to="/login"
>
  Login
</Button>

<Button
  variant="text"
  component={RouterLink}
  to="/signup"
>
  Signup
</Button>

</Stack>
</>
      )}
 </Paper>
</Container>
  );
};

export default StartPage;
