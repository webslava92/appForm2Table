import React from "react";
import "../../App.css";
import { Movie } from "./Movie";

export function MoviesTable({}) {
  return (
    <div className="MoviesTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Watched</th>
          </tr>
        </thead>
        <tbody>
          <Movie />
        </tbody>
      </table>
    </div>
  );
}
