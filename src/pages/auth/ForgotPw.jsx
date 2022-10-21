import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { StyledJoin } from "./styled";

export const ForgotPw = () => {
  const [mailAuth, setMailAuth] = useState(false);
  const [authCode, setAuthCode] = useState("");

  const email = useRef(null);
  const code = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);

  const navigate = useNavigate();

  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;

  const checkValidation = () => {
    if (!mailAuth) {
      alert("이메일을 인증해주세요.");
      return;
    }

    if (!emailRegExp.test(email.current.value)) {
      alert("이메일 형식이 올바르지 않습니다.");
      email.current.focus();
      return;
    }
    if (!passwordRegExp.test(password.current.value)) {
      alert(
        "비밀번호는 8자 이상 32자 이하의 영문, 숫자 조합으로 입력해주세요."
      );
      password.current.focus();
      return;
    }
    if (password.current.value !== passwordConfirm.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      passwordConfirm.current.focus();
      return;
    }
    return true;
  };

  const handleEmailAuth = async (email) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/mailConfirms?email=${email}`
    );
  };

  const emailAuth = useMutation(handleEmailAuth, {
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        document.querySelector(".auth-box").style.display = "block";
        setAuthCode(data.data);
      } else {
        alert("이미 가입된 이메일입니다.");
      }
    },
  });

  const handleChangePassword = async (data) => {
    return await axios.put(`${process.env.REACT_APP_SERVER_URL}/pwChanges`, {
      email: data.email,
      password: data.password,
    });
  };

  const { mutate } = useMutation(handleChangePassword, {
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        alert("비밀번호 변경이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <StyledJoin>
      <h2>회원가입</h2>
      <label>이메일</label>
      <input type="email" ref={email} placeholder="이메일 입력" required />
      <button onClick={() => emailAuth.mutate(email.current.value)}>
        이메일 인증하기
      </button>
      <div className="auth-box">
        <span>이메일로 전송된 인증코드를 입력해주세요.</span>
        <div>
          <input type="text" placeholder="인증코드 8자리 입력" ref={code} />
          <button
            className="email-auth-button"
            onClick={() => {
              if (authCode === code.current.value) {
                alert("인증되었습니다.");
                setMailAuth(true);
                document.querySelector(".auth-box").style.display = "none";
              } else {
                alert("인증코드가 일치하지 않습니다.");
              }
            }}
          >
            확인
          </button>
        </div>
      </div>
      <label>새 비밀번호</label>
      <input
        type="password"
        ref={password}
        placeholder="8자 이상 32자 이하의 영문, 숫자 조합"
        required
      />
      <label>새 비밀번호 확인</label>
      <input
        type="password"
        ref={passwordConfirm}
        placeholder="비밀번호 재입력"
        required
      />
      <button
        onClick={() => {
          if (checkValidation()) {
            mutate({
              email: email.current.value,
              password: password.current.value,
            });
          }
        }}
      >
        변경 완료
      </button>
      <div className="span-box">
        <span onClick={() => navigate("/login")}>로그인으로 돌아가기</span>
      </div>
    </StyledJoin>
  );
};
