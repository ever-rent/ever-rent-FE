import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OAuth = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate("/");
    }
  }, [accessToken, refreshToken, navigate]);

  const httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      console.log(httpRequest.getResponseHeader("Date"));
    //   console.log(httpRequest.getResponseHeader("refresh-Token"));
    }
  };

  httpRequest.open("GET", "http://localhost:3000/oauth/google/callback");
  httpRequest.send();

  return (
    <h1>hi</h1>
  )
};
