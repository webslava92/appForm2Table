import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi";

export const getMovies = createAsyncThunk(
  'movies/getMovies', 
  async () => {
    const response = await movieApi.get("/data");

    const data = await response.data;
    console.log(data);
    return data;
  }
  
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: null,
    error: null,
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
      state.movies.map((movie) => (movie.editStatus = false));
      const editMovieStatus = state.movies.find(
        (movie) => movie.id === action.payload
      );
      editMovieStatus.editStatus = true;
    },

    changeMovie(state, action) {
      const editMovie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      editMovie.movieName = action.payload.movieName;
      editMovie.rating = action.payload.rating;
      editMovie.watched = editMovie.watched;
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
  extraRedusers: {
    [getMovies.pending]: (state) => {
      state.status = "loading"; 
      state.error = null;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.movies = action.payload;
    },
    [getMovies.rejected]: (state, action) => {},
  },
});



export const {
  addNewMovie,
  editMovieStatus,
  changeMovie,
  removeMovie,
  watchedMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
