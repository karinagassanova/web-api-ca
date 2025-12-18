import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyReviews, updateReview, deleteReview } from "../api/reviews-api";
import Spinner from "../components/spinner";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyReviewsPage = () => {
  const queryClient = useQueryClient();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h5">{error.message}</Typography>;
  }

  const reviews = data || [];

  if (!reviews.length) {
    return (
      <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
        You haven't written any reviews yet.
      </Typography>
    );
  }

  const handleEdit = async (review) => {
    const newContent = window.prompt("Edit your review text:", review.content);
    if (newContent === null) return;

    const newRatingStr = window.prompt("Edit your rating (0–5):", String(review.rating));
    if (newRatingStr === null) return;
    const newRating = Number(newRatingStr);
    if (Number.isNaN(newRating) || newRating < 0 || newRating > 5) {
      alert("Rating must be a number between 0 and 5.");
      return;
    }

    try {
      await updateReview(review._id, { content: newContent, rating: newRating });
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    } catch (err) {
      alert(err.message || "Failed to update review");
    }
  };

  const handleDelete = async (review) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(review._id);
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    } catch (err) {
      alert(err.message || "Failed to delete review");
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Reviews
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="my reviews table">
          <TableHead>
            <TableRow>
              <TableCell>Movie ID</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((r) => (
              <TableRow key={r._id}>
                <TableCell>
                  <Link to={`/movies/${r.movieId}`} style={{ textDecoration: "none" }}>
                    <Button
                      variant="text"
                      sx={{
                        textTransform: "none",
                        color: "#032541",
                        "&:hover": { color: "#00bfff", backgroundColor: "transparent" },
                      }}
                    >
                      {r.movieId}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{r.rating}</TableCell>
                <TableCell>{r.content}</TableCell>
                <TableCell>
                  {new Date(r.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(r)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyReviewsPage;


