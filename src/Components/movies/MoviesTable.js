import React from "react";
import { Movie } from "./Movie";
import "../../App.css";

export function MoviesTable() {
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
    </div>
  );
}
