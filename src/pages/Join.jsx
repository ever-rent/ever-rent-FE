import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

export const Join = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const nickname = useRef(null);

  const handleJoin = async (data) => {
    return await axios.post("http://52.79.235.129/members/signups", {
      email: data.email,
      password: data.password,
      memberName: data.nickname,
    });
  };

  const { mutate } = useMutation(handleJoin, {
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원가입 실패!!");
      }
    },
  });

  return (
    <StyledContainer>
      <h2>회원가입</h2>
      <label>이메일</label>
      <input type="email" ref={email} />
      <label>비밀번호</label>
      {/* 8자리 이상 32자리 이하 */}
      <input type="password" ref={password} />
      <label>비밀번호 확인</label>
      <input type="password" ref={passwordConfirm} />
      <label>닉네임</label>
      {/* 2자 이상 14자 이하 */}
      <input type="text" ref={nickname} />
      <button
        onClick={() => {
          if (password.current.value === passwordConfirm.current.value) {
            mutate({
              email: email.current.value,
              password: password.current.value,
              nickname: nickname.current.value,
            });
          } else {
            alert("비밀번호가 일치하지 않습니다.");
            password.current.focus();
          }
        }}
      >
        가입하기
      </button>
      <div className="span-box">
        <span>이미 계정이 있으신가요?</span>
        <span onClick={() => navigate("/login")}>로그인하기</span>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 100px auto;
  padding: 20px;
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
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
    span:nth-child(2) {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
