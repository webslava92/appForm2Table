import React from "react";
import { useSelector } from "react-redux";
import "../../App.css";

export function Movie() {
  const movies = useSelector((state) => state.movies.movies);

  return movies.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <select type={"select"} name={"rating"}>
          <option selected={item.rating === 1 ? true : false} value={"1"}>
            1
          </option>
          <option selected={item.rating === 2 ? true : false} value={"2"}>
            2
          </option>
          <option selected={item.rating === 3 ? true : false} value={"3"}>
            3
          </option>
          <option selected={item.rating === 4 ? true : false} value={"4"}>
            4
          </option>
          <option selected={item.rating === 5 ? true : false} value={"5"}>
            5
          </option>
        </select>
      </td>
      <td>
        <input type={"checkbox"} name={"watched"} checked={item.watched} />
      </td>
    </tr>
  ));
}
