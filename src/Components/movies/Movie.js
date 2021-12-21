import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import "../../App.css";


export function Movie() {
  const movies = useSelector((state) => state.movies.movies);

  return movies.map((item) => (
    <tr key={item.id}>
      <td>{item.movieName}</td>
      <td>
        <Box >
          <Typography component="legend"></Typography>
          <Rating name="read-only" value={item.rating} size="small" readOnly />
        </Box>
      </td>
      <td>
        <Checkbox
          inputProps={{ "aria-label": "Checkbox demo" }}
          name={"watched"}
          background={"rgba(57,75,89,.5)"}
          disabled
          checked={item.watched}
          size="small"
        />
      </td>
    </tr>
  ));
}
