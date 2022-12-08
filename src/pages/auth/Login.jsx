import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useMutation } from "react-query";

import styled from "styled-components";
import logo from "../../image/logo.png";
import { handleToast } from "../../util/toast";
// import { FcGoogle } from "react-icons/fc";

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
        handleToast("success", "로그인 성공! 환영합니다!");
        navigate("/");
      }
    },
    onError: ({ response }) => {
      if (response.status === 400) {
        handleToast(
          "error",
          "일치하는 계정이 없습니다. 이메일 또는 비밀번호를 확인해주세요."
        );
        return;
      }
      handleToast("error", "로그인에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.current.value === "") {
      handleToast("error", "이메일을 입력해주세요.");
      email.current.focus();
      return;
    }
    if (password.current.value === "") {
      handleToast("error", "비밀번호를 입력해주세요.");
      password.current.focus();
      return;
    }
    mutate({
      email: email.current.value,
      password: password.current.value,
    });
  };

  return (
    <StyledLogin>
      <form onSubmit={(event) => handleSubmit(event)}>
        <img src={logo} alt="logo" />
        <label>이메일</label>
        <input type="email" ref={email} placeholder="이메일 입력" />
        <label>비밀번호</label>
        <input type="password" ref={password} placeholder="비밀번호 입력" />
        <button type="submit">로그인</button>
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
      </form>
      <div className="span-box">
        <span onClick={() => navigate("/forgotPw")}>비밀번호 찾기</span>
        <span onClick={() => navigate("/join")}>회원가입</span>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 100px auto;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
  }

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
    background-color: #5902ff;
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

// const StyledGoogleLogin = styled.span`
//   border: none;
//   padding: 0px;
//   margin-top: 15px;
//   border-radius: 20px;
//   font-size: 15px;
//   font-weight: bold;
//   width: 300px;
//   height: 40px;
//   color: #000;
//   background-color: #fff;
//   z-index: 3;
//   a {
//     text-decoration: none;
//     color: inherit;
//   }
//   .icon-box {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     .google-icon {
//       margin: 5px 5px 0 0;
//     }
//   }
// `;
