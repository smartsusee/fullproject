import axios from "axios";

const authAxios = axios.create({

      baseURL:"http://51.20.252.173:3000"
})


export {authAxios}