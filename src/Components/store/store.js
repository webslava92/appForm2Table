import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./movieSlice";


export const store = configureStore({
  reducer: {
    movies: MovieReducer,
  },
});