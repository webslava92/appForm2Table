import { React, useState, useEffect } from "react";
import {
  getMovies,
  modifyMovie,
  insertMovie,
} from "../../features/movies/movieSlice";
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
  const [inputError, setInputError] = useState("");

  const editMovies = useSelector((state) =>
    state.movies.movies.find((item) => item.editStatus)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const validate = () => {
    let inputError = "";
    if (editNameValue ? !editNameValue : !nameValue) {
      inputError = "Name cannot be blank";
    }
    if (inputError) {
      setInputError(inputError);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (editMovies) {
      setEditNameValue(editMovies.movieName);
      setEditRatingValue(editMovies.rating);
    }
  }, [editMovies]);

  function editMovie() {
    dispatch(
      modifyMovie({
        id: editMovies.id,
        movieName: editNameValue,
        rating: editRatingValue,
      })
    );
    setEditNameValue("");
    setEditRatingValue(0);
  }

  function addMovie() {
    dispatch(
      insertMovie({
        movieName: nameValue,
        rating: ratingValue,
      })
    );
    setNameValue("");
    setRatingValue(0);
  }

  function submitForm(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (editMovies) {
        editMovie();
      } else {
        addMovie();
      }
      setInputError("");
    }
  }

  const inputNameChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (editMovies) {
      setEditNameValue(value);
    } else {
      setNameValue(value);
    }
  };

  const inputRatingChange = (e) => {
    e.preventDefault();
    let value = Number(e.target.value);
    if (editMovies) {
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
              value={editMovies ? editNameValue : nameValue}
              placeholder="Input movie name"
            />
            <div className="ErrorMessage">{inputError}</div>
            <div className="rating__box">
              <p>Choose a movie rating</p>
              <Rating
                name="ratingValue"
                size="small"
                onChange={inputRatingChange}
                value={editMovies ? editRatingValue : ratingValue}
              />
            </div>
          </div>
          <Button type="submit">Add Video</Button>
        </div>
      </form>
    </div>
  );
}
