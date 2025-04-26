import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export { authAxios };
