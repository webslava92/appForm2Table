import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Movies } from "../../Movies";
import moviesData from "./moviesData.json";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: moviesData,
  },
  reducers: {
    addMovie(state, action) {
      console.log(state);
      console.log(action);

      state.movies.push({
        id: nanoid(),
        name: "",
        rating: "",
        watched: false,
      });
    },
  },
});

export const { addMovie, } = movieSlice.actions;
export default movieSlice.reducer;