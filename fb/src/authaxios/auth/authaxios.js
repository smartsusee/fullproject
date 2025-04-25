import axios from "axios";

const authAxios = axios.create({

      baseURL:"http://localhost:4006/"
})


export {authAxios}