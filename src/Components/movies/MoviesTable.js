import React from "react";
import { useSelector } from "react-redux";
import { Movie } from "./Movie";
import "../../App.css";

export function MoviesTable() {
  const {status, error} = useSelector(state => state.movies);
  return (
    <div className="MoviesTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Watched</th>
            <th className="Actions_title">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Movie />
        </tbody>
      </table>
      {status === "loading" && (
        <h2 className="loading">Data is being loaded...</h2>
      )}
      {error && <h2 className="SubmitError">Response error</h2>}
    </div>
  );
}
