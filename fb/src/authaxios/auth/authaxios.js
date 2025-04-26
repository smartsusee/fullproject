import axios from "axios";

const authAxios = axios.create({
  baseURL:"http://16.170.221.26:3000/",
});

export { authAxios };
