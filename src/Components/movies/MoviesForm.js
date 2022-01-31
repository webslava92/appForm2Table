import { React, useState } from "react";
import { editMovie, addNewMovie } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "../../App.css";

export function MoviesForm() {
  const [nameValue, setNameValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [editNameValue, setEditNameValue] = useState("");
  const [editRatingValue, setEditRatingValue] = useState(0);

  const movies = useSelector((state) =>
    state.movies.movies.find((item) => item.editStatus)
  );
  
  const dispatch = useDispatch();

  console.log("name:", nameValue, "rating:", ratingValue);
  console.log("edit name:", editNameValue, "edit rating:", editRatingValue);
  console.log("movies:", movies);
  console.log("movies rating:", movies ? movies.rating : 0);

  function submitForm (e) {
    e.preventDefault();
    if (movies) {
      dispatch(
        editMovie({
          movieName: editNameValue,
          rating: editRatingValue,
        })
      );
      setEditNameValue("");
      setEditRatingValue(0);
    } else {
      dispatch(
        addNewMovie({
          movieName: nameValue,
          rating: ratingValue,
        })
      );
      setNameValue("");
      setRatingValue(0);
    }
  }

  const inputNameChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (movies) {
      setEditNameValue(value);
    } else {
      setNameValue(value);
    }
  };

  const inputRatingChange = (e) => {
    e.preventDefault();
    let value = Number(e.target.value);
    if (movies) {
      setEditRatingValue(value);
    } else {
      setRatingValue(value);
    }
  };

  return (
    <div className="MoviesForm">
      <h3>Movies</h3>
      <form onSubmit={submitForm}>
        <div className="form__inner">
          <div className="formInputWrapper">
            <TextField
              name="nameValue"
              onChange={inputNameChange}
              value={movies ? editNameValue : nameValue}
              placeholder="Input movie name"
            />
            <div className="rating__box">
              <p>Choose a movie rating</p>
              <Rating
                name="ratingValue"
                size="small"
                onChange={inputRatingChange}
                value={movies ? editRatingValue : ratingValue}
              />
            </div>
          </div>
          <Button type="submit">Add Video</Button>
        </div>
      </form>
    </div>
  );
}
