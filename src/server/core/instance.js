import axios from "axios";

export const base = axios.create({
  baseURL: "http://13.209.8.18",
  // baseURL: "http://davidpai.shop",
});

export const auth = axios.create({
  baseURL: "http://13.209.8.18/auth",
  // baseURL: "http://3.35.19.62:8080/auth",
  // baseURL: "http://davidpai.shop/auth",
  
});

export const profile = axios.create({
  baseURL: "http://13.209.8.18",
  // baseURL: "http://3.35.19.62:8080", // ㅎㅈ님
  // baseURL: "https://davidpai.shop",
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

profile.interceptors.request.use((config) => {
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
