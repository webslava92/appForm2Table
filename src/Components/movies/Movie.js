import React from "react";
import {
  editMovieStatus,
  removeMovie,
  watchedMovie,
} from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "../../App.css";

export function Movie() {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();


  return movies.map((item) => (
    <tr key={item.id}>
      <td>{item.movieName}</td>
      <td>
        <Rating name="read-only" value={item.rating} size="small" readOnly />
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
      <td className="action-btns">
        <button
          className={
            item.watched ? "movieWatched movieWatched--disable" : "movieWatched"
          }
          onClick={() => dispatch(watchedMovie(item.id))}
        >
          <AddTaskIcon fontSize="small" />
        </button>
        <button
          className="movieEditBtn"
          onClick={() => dispatch(editMovieStatus(item.id))}
        >
          <BorderColorIcon fontSize="small" />
        </button>
        <button
          className="movieRemoveBtn"
          onClick={() => dispatch(removeMovie(item.id))}
        >
          <DeleteForeverIcon fontSize="small" />
        </button>
      </td>
    </tr>
  ));
}
