import "./App.css";
import { MoviesForm } from "./Components/movies/MoviesForm";
import { MoviesTable } from "./Components/movies/MoviesTable";

export function Movies() {
  return (
    <div className="Movies">
      <MoviesForm />
      <MoviesTable />
    </div>
  );
}
