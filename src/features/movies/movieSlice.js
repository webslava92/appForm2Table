import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await movieApi.get("/data");

      if (!response.ok) {
        throw new Error("Can't receive movies. Server Error!");
      }

      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await movieApi.delete(`/data/${id}`);

      if (!response.statusText) {
        throw new Error("Can't delete movie. Server Error!");
      }

      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const watchMovieStatus = createAsyncThunk(
  "movies/watchMovieStatus",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await movieApi.patch(`/data/${id}`, {
        watched: true,
      });

      if (!response.statusText) {
        throw new Error("Can't change movie watched status. Server Error!");
      }

      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertMovie = createAsyncThunk(
  "movies/insertMovie",
  async ({ movieName, rating }, { rejectWithValue, dispatch }) => {
    try {
      const movie = {
        movieName: movieName,
        rating: rating,
        watched: false,
      };
      const response = await movieApi.post(`/data`, movie);

      if (!response.statusText) {
        throw new Error("Can't add movie. Server Error!");
      }

      dispatch(getMovies());
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const selectEditMovie = createAsyncThunk(
  "movies/selectEditMovie",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await movieApi.patch(`/data/${id}`, {
        editStatus: true,
      });

      if (!response.statusText) {
        throw new Error("Can't change movie select status. Server Error!");
      }

      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const modifyMovie = createAsyncThunk(
  "movies/modifyMovie",
  async ({ id, movieName, rating }, { rejectWithValue, dispatch, getState }) => {
    const prevMovie = getState().movies.movies.find(movie => movie.id === id);
    try {
      const movie = {
        movieName: movieName,
        rating: rating,
        watched: prevMovie.watched,
      };
      const response = await movieApi.put(`/data/${id}`, movie);

      if (!response.statusText) {
        throw new Error("Can't save the movie changes. Server Error!");
      }

      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: null,
    error: null,
  },

  extraReducers: {
    [getMovies.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.movies = action.payload;
    },
    [getMovies.rejected]: setError,
    [deleteMovie.rejected]: setError,
    [watchMovieStatus.rejected]: setError,
    [insertMovie.rejected]: setError,
    [modifyMovie.rejected]: setError,
  },
});

export default movieSlice.reducer;
