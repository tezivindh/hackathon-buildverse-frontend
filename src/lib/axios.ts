import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://hackathon-buildverse-backend.onrender.com/app/api",
  withCredentials: true,
});
