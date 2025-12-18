import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getMovieReviews } from "../../api/reviews-api";
import { excerpt } from "../../util";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

export default function MovieReviews({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['myMovieReviews', { id: movie.id }],
    queryFn: () => getMovieReviews(movie.id),
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const reviews = data || [];


  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Rating</TableCell>
            <TableCell align="center">Excerpt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r._id}>
              <TableCell component="th" scope="row">
                {r.rating}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
