import React from "react";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux"
import "../../App.css";

import { addMovie } from "../store/movieSlice";

export function MoviesForm({}) {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const addVideo = () => dispatch(addMovie(movies));

  return (
    <div className="MoviesForm">
      <h3>Movies</h3>
      <form onClick={addVideo}>
        <input
          value={movies.movieName}
          onChange={(e) => addMovie(e.target.value)}
        />
        <button type="submit" value="Submit">
          Add Video
        </button>
      </form>
    </div>
  );
}