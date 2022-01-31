import { MoviesForm } from "./Components/movies/MoviesForm";
import { MoviesTable } from "./Components/movies/MoviesTable";
import "./App.css";

export function Movies() {
  return (
    <div className="Movies">
      <MoviesForm />
      <MoviesTable />
    </div>
  );
}
