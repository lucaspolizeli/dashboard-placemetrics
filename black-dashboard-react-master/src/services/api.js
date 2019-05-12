import axios from "axios";

const api = axios.create({
  baseURL: "https://placemetrics.herokuapp.com"
});

export default api;
