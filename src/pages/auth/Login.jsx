import React, { useRef } from "react";
import logo from "../../image/logo.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { StyledLogin } from "./styled";
import { Toast } from "../../util/toast";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    return await axios.post(`${process.env.REACT_APP_SERVER_URL}/logins`, {
      email: data.email,
      password: data.password,
    });
  };

  const { mutate } = useMutation(handleLogin, {
    onSuccess: (data) => {
      if (data.status === 200) {
        localStorage.setItem("email", data.data.data.email);
        localStorage.setItem("memberId", data.data.data.id);
        localStorage.setItem("memberName", data.data.data.memberName);
        localStorage.setItem("accessToken", data.headers["authorization"]);
        localStorage.setItem("refreshToken", data.headers["refresh-token"]);
        Toast.fire({
          icon: "success",
          title: "로그인 성공! 환영합니다!",
        });
        navigate("/");
      }
    },
    onError: ({ response }) => {
      if (response.status === 400) {
        Toast.fire({
          icon: "error",
          title:
            "일치하는 계정이 없습니다. 이메일 또는 비밀번호를 확인해주세요.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "로그인에 실패했습니다. 다시 시도해주세요.",
        });
      }
    },
  });

  return (
    <StyledLogin>
      <img src={logo} alt="logo" />
      <label>이메일</label>
      <input type="email" ref={email} placeholder="이메일 입력" />
      <label>비밀번호</label>
      <input type="password" ref={password} placeholder="비밀번호 입력" />
      <button
        onClick={() => {
          if (email.current.value === "") {
            Toast.fire({
              icon: "error",
              title: "이메일을 입력해주세요.",
            });
            email.current.focus();
            return;
          }
          if (password.current.value === "") {
            Toast.fire({
              icon: "error",
              title: "비밀번호를 입력해주세요.",
            });
            password.current.focus();
            return;
          }
          mutate({
            email: email.current.value,
            password: password.current.value,
          });
        }}
      >
        로그인
      </button>
      {/* <StyledGoogleLogin
        onClick={() => {
          window.location.href = `${process.env.REACT_APP_GOOGLE_ACCOUNT}`;
        }}
      >
        <div className="icon-box">
          <div className="google-icon">
            <FcGoogle size="1.2rem" />
          </div>
          <span>Google 계정으로 로그인</span>
        </div>
      </StyledGoogleLogin> */}
      <div className="span-box">
        <span onClick={() => navigate("/forgotPw")}>비밀번호 찾기</span>
        <span onClick={() => navigate("/join")}>회원가입</span>
      </div>
    </StyledLogin>
  );
};

const StyledGoogleLogin = styled.span`
  border: none;
  padding: 0px;
  margin-top: 15px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  width: 300px;
  height: 40px;
  color: #000;
  background-color: #fff;
  z-index: 3;
  a {
    text-decoration: none;
    color: inherit;
  }
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .google-icon {
      margin: 5px 5px 0 0;
    }
  }
`;
