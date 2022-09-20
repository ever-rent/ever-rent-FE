import axios from "axios";

export const base = axios.create({
  baseURL: "http://52.79.235.129",
  // withCredentials: true,
});

export const auth = axios.create({
  baseURL: "http://52.79.235.129/auth",
  // withCredentials: true,
});

auth.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    config.headers["authorization"] = null;
    config.headers["refresh-token"] = null;
  } else {
    config.headers["authorization"] = accessToken;
    config.headers["refresh-token"] = refreshToken;
  }

  return config;
});
