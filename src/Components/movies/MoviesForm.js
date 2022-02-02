import { React, useState, useEffect } from "react";
import {
  getMovies,
  changeMovie,
  addNewMovie,
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
  const [stateError, setStateError] = useState({
    nameError: "",
    submitError: "",
  });

  const editMovies = useSelector((state) =>
    state.movies.movies.find((item) => item.editStatus)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const validate = () => {
    let nameError = "";
    if (editNameValue ? !editNameValue : !nameValue) {
      nameError = "Name cannot be blank";
    }
    if (nameError) {
      setStateError({ nameError, submitError: "" });
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
      changeMovie({
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
      addNewMovie({
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
      setStateError({ nameError: "", submitError: "" });
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
            <div className="ErrorMessage">{stateError.nameError}</div>
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
      {stateError.submitError ? (
        <h2 className="SubmitError">{stateError.submitError}</h2>
      ) : (
        ""
      )}
    </div>
  );
}
