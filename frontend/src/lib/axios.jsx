import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", //base url
  withCredentials: true, //sending cookies
});
