import { createSlice, nanoid } from "@reduxjs/toolkit";
import moviesData from "./moviesData.json";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: moviesData,
  },
  reducers: {
    addNewMovie(state, action) {
      state.movies.push({
        id: nanoid(),
        movieName: action.payload.movieName,
        rating: action.payload.rating,
        watched: false,
      });
    },

    editMovieStatus(state, action) {
      state.movies.map((movie) => movie.editStatus = false);
      const editMovieStatus = state.movies.find(
        (movie) => movie.id === action.payload
      );
      editMovieStatus.editStatus = true;
    },

    editMovie(state, action) {
      const editMovie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      editMovie.movieName = action.payload.movieName;
      editMovie.rating = action.payload.rating;
      editMovie.editStatus = false;
    },

    removeMovie(state, action) {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },

    watchedMovie(state, action) {
      const watchedMovieStatus = state.movies.find(
        (movie) => movie.id === action.payload
      );
      watchedMovieStatus.watched
        ? (watchedMovieStatus.watched = watchedMovieStatus.watched)
        : (watchedMovieStatus.watched = !watchedMovieStatus.watched);
    },
  },
});

export const { addNewMovie, editMovieStatus, editMovie, removeMovie, watchedMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
