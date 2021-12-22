import { createSlice, nanoid } from "@reduxjs/toolkit";
import moviesData from "./moviesData.json";

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomBoolean = Math.random() < 0.5;

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: moviesData
  },
  reducers: {
    addNewMovie(state, action) {
      console.log(state);
      console.log(action);

      state.movies.push({
        id: nanoid(),
        movieName: action.payload.movieName,
        rating: randomNumber(1, 5),
        watched: randomBoolean,
      });
    },
  },
});

export const { addNewMovie } = movieSlice.actions;
export default movieSlice.reducer;
