import axios from "axios";

export const base = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // baseURL: "http://3.35.19.62:8080",
});

export const auth = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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

auth.interceptors.response.use((response) => {
  if (response.headers["authorization"]) {
    localStorage.removeItem("accessToken");
    localStorage.setItem("accessToken", response.headers["authorization"]);
  } else if (
    response.headers["message"] &&
    localStorage.getItem("accessToken")
  ) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
    window.location.href = "/login";
  }
  return response;
});
