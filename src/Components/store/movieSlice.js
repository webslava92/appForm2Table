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

    editMovie(state, action) {
      const editMovieStatus = state.movies.find((movie) =>
        movie.id === action.payload
      );
      editMovieStatus.editStatus = true;
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
      watchedMovieStatus.watched = !watchedMovieStatus.watched;
    },
  },
});

export const { addNewMovie, editMovie, removeMovie, watchedMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
