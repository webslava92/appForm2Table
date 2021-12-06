import axios from "axios";

export default axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 3000,
});
