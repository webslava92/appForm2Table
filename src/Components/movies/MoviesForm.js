import { React, useState } from "react";
import { addNewMovie } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "../../App.css";

export function MoviesForm() {
  const [nameValue, setNameValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const addNewItem = (e) => {
    e.preventDefault();
    dispatch(
      addNewMovie({
        movieName: nameValue,
        rating: ratingValue,
      })
    );
    setNameValue("");
    setRatingValue(0);
  };

  const movieNameChange = (e) => {
    e.preventDefault();
    movies.filter((item) =>
      item.editStatus === true
        ? setNameValue(item.movieName)
        : setNameValue(e.target.value)
    );
  };

  const movieRatingChange = (e) => {
    e.preventDefault();
    movies.filter((item) =>
      item.editStatus === true
        ? setRatingValue(item.rating)
        : setRatingValue(Number(e.target.value))
    );
  };

  return (
    <div className="MoviesForm">
      <h3>Movies</h3>
      <form onSubmit={addNewItem}>
        <div className="form__inner">
          <div className="formInputWrapper">
            <TextField
              name="nameValue"
              onChange={movieNameChange}
              value={nameValue}
              placeholder="Input movie name"
            />
            <div className="rating__box">
              <p>Choose a movie rating</p>
              <Rating
                name="ratingValue"
                size="small"
                onChange={movieRatingChange}
                value={ratingValue}
              />
            </div>
          </div>
          <Button type="submit">Add Video</Button>
        </div>
      </form>
    </div>
  );
}
