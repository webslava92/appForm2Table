import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Movies } from "../../Movies";
import moviesData from "./moviesData.json";

const generateNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


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
        movieName: action.payload,
        rating: generateNumber(1, 5),
        watched: generateNumber(0, 1),
      });
    },
  },
});

export const { addMovie, } = movieSlice.actions;
export default movieSlice.reducer;