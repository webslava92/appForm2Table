import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import "../../App.css";

import { addNewMovie } from "../store/movieSlice";

export function MoviesForm() {
  const[inputValue, setInputValue] = useState('');
  
  const dispatch = useDispatch();

  const addNewItem = (e) => {
    e.preventDefault();
    dispatch(
      addNewMovie({
        movieName: inputValue,
      })
    );
    setInputValue('');
  };

  return (
    <div className="MoviesForm">
      <h3>Movies</h3>
      <Box component="form" onSubmit={addNewItem}>
        <TextField
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Input movie name"
        />
        <Button type="submit">
          Add Video
        </Button>
      </Box>
    </div>
  );
}
