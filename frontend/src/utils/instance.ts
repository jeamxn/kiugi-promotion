import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
  withCredentials: true,
});

export const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
});

export default instance;
