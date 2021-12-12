import "./App.css";
import { Routes, Route } from "react-router-dom";

import {Users} from "./Users";
import {Movies} from "./Movies";
import { Layout } from "./Components/Layout";

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Users" element={<Users />} />
          <Route path="Movies" element={<Movies />} />
        </Route>
      </Routes>
    </div>
  );
}