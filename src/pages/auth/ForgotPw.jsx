import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { StyledJoin } from "./styled";
import { Toast } from "../../util/toast";
import Swal from "sweetalert2";

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
      Toast.fire({
        icon: "error",
        title: "이메일을 인증 해주세요.",
      });
      return;
    }
    if (!emailRegExp.test(email.current.value)) {
      Toast.fire({
        icon: "error",
        title: "이메일 형식이 올바르지 않습니다.",
      });
      email.current.focus();
      return;
    }
    if (!passwordRegExp.test(password.current.value)) {
      Toast.fire({
        icon: "error",
        title:
          "비밀번호는 8자 이상 32자 이하의 영문, 숫자 조합으로 입력해주세요.",
      });
      password.current.focus();
      return;
    }
    if (password.current.value !== passwordConfirm.current.value) {
      Toast.fire({
        icon: "error",
        title: "비밀번호가 일치하지 않습니다.",
      });
      passwordConfirm.current.focus();
      return;
    }
    return true;
  };

  const handleEmailAuth = async (email) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/pwMailConfirms?email=${email}`
    );
  };

  const emailAuth = useMutation(handleEmailAuth, {
    onSuccess: ({ data }) => {
      if (data.data) {
        Toast.fire({
          icon: "success",
          title: "인증코드가 발송되었습니다.",
        });
        document.querySelector(".auth-box").style.display = "block";
        setAuthCode(data.data);
        console.log(data.data);
      } else {
        Toast.fire({
          icon: "error",
          title: "가입되지 않은 이메일입니다.",
        });
      }
    },
    onError: (error) => {
      console.dir(error);
      Toast.fire({
        icon: "error",
        title: "이메일 인증에 실패했습니다.",
      });
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
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "비밀번호가 변경되었습니다.",
          text: "로그인 페이지로 이동합니다.",
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/login");
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "비밀번호 변경에 실패했습니다.",
        text: "인터넷 연결을 확인해주세요.",
        confirmButtonText: "확인",
      });
      console.dir(error);
    },
  });

  return (
    <StyledJoin>
      <h2>비밀번호 변경</h2>
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
                Toast.fire({
                  icon: "success",
                  title: "이메일 인증 성공!",
                });
                setMailAuth(true);
                document.querySelector(".auth-box").style.display = "none";
              } else {
                Toast.fire({
                  icon: "error",
                  title: "인증코드가 일치하지 않습니다.",
                });
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
