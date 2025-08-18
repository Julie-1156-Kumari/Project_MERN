import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://bms-shows.onrender.com",
  headers: {
    withCredentials: true,
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
