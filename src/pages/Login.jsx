import React, { useRef } from "react";
import logo from "../image/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleLogin = async (data) => {
    return await axios.post("http://13.209.8.18/logins", {
      email: data.email,
      password: data.password,
    });
  };

  const { mutate } = useMutation(handleLogin, {
    onSuccess: (data) => {
      if (data.status === 200) {
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("accessToken", data.headers["authorization"]);
        localStorage.setItem("refreshToken", data.headers["refresh-token"]);
        alert("로그인 성공!!");
        navigate("/");
      } else {
        password.current.value = "";
        alert("로그인 실패!!");
      }
    },
  });

  return (
    <StyledContainer>
      <img src={logo} alt="logo" />
      <label>이메일</label>
      <input type="email" ref={email} />
      <label>비밀번호</label>
      <input type="password" ref={password} />
      <button
        onClick={() =>
          mutate({
            email: email.current.value,
            password: password.current.value,
          })
        }
      >
        로그인
      </button>
      <div className="span-box">
        <span>비밀번호 재설정</span>
        <span onClick={() => navigate("/join")}>회원가입</span>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  img {
    width: 200px;
    margin-bottom: 40px;
  }
  label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  input {
    height: 30px;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    height: 50px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: large;
    font-weight: bold;
    background-color: rgb(71, 181, 255);
    cursor: pointer;
  }
  .span-box {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    span {
      cursor: pointer;
    }
  }
`;
