import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

import Swal from "sweetalert2";
import { handleToast } from "../../util/toast";
import { StyledJoin } from "./styled";
import { SelectAddress } from "../../components/selectAddress/SelectAddress";

export const Join = () => {
  const [authCode, setAuthCode] = useState("");
  const [mailAuth, setMailAuth] = useState(false);
  const [mainAddress, setMainAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const nickname = useRef(null);
  const code = useRef(null);

  const navigate = useNavigate();

  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;

  const handleCheckValidation = () => {
    if (!mailAuth) {
      handleToast("error", "이메일을 인증 해주세요.");
      return;
    }
    if (!emailRegExp.test(email.current.value)) {
      handleToast("error", "이메일 형식이 올바르지 않습니다.");
      email.current.focus();
      return;
    }
    if (!passwordRegExp.test(password.current.value)) {
      handleToast(
        "error",
        "비밀번호는 8자 이상 32자 이하의 영문, 숫자 조합으로 입력해주세요."
      );
      password.current.focus();
      return;
    }
    if (password.current.value !== passwordConfirm.current.value) {
      handleToast("error", "비밀번호가 일치하지 않습니다.");
      passwordConfirm.current.focus();
      return;
    }
    if (
      nickname.current.value.length < 2 ||
      nickname.current.value.length > 14
    ) {
      handleToast("error", "닉네임은 2자 이상 14자 이하로 입력해주세요.");
      nickname.current.focus();
      return;
    }
    if (mainAddress === "" || subAddress === "") {
      handleToast("error", "지역을 선택해주세요.");
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
    onSuccess: ({ data }) => {
      if (data.data) {
        handleToast("success", "인증코드가 발송되었습니다.");
        document.querySelector(".auth-box").style.display = "block";
        setAuthCode(data.data);
        console.log(data.data);
      } else {
        handleToast("error", "이미 가입된 이메일입니다.");
      }
    },
    onError: (error) => {
      console.dir(error);
      handleToast("error", "이메일 인증에 실패했습니다.");
    },
  });

  const handleJoin = async (data) => {
    return await axios.post(`${process.env.REACT_APP_SERVER_URL}/signups`, {
      email: data.email,
      password: data.password,
      memberName: data.nickname,
      mainAddress: data.mainAddress,
      subAddress: data.subAddress,
    });
  };

  const { mutate } = useMutation(handleJoin, {
    onSuccess: (data) => {
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "회원가입에 실패했습니다.",
        text: "다시 시도해주세요.",
        confirmButtonText: "확인",
      });
      console.dir(error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleCheckValidation()) {
      mutate({
        email: email.current.value,
        password: password.current.value,
        nickname: nickname.current.value,
        mainAddress: mainAddress,
        subAddress: subAddress,
      });
    }
  };

  const handleCheckCode = () => {
    if (authCode === code.current.value) {
      handleToast("success", "이메일 인증 성공!");
      setMailAuth(true);
      document.querySelector(".auth-box").style.display = "none";
    } else {
      handleToast("error", "인증코드가 일치하지 않습니다.");
    }
  };

  return (
    <StyledJoin>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h2>회원가입</h2>
        <label>이메일</label>
        <input type="email" ref={email} placeholder="이메일 입력" required />
        <button
          type="button"
          onClick={() => emailAuth.mutate(email.current.value)}
        >
          이메일 인증하기
        </button>
        <div className="auth-box">
          <span>이메일로 전송된 인증코드를 입력해주세요.</span>
          <div>
            <input type="text" placeholder="인증코드 8자리 입력" ref={code} />
            <button
              type="button"
              className="email-auth-button"
              onClick={handleCheckCode}
            >
              확인
            </button>
          </div>
        </div>
        <label>비밀번호</label>
        <input
          type="password"
          ref={password}
          placeholder="8자 이상 32자 이하의 영문, 숫자 조합"
          required
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          ref={passwordConfirm}
          placeholder="비밀번호 재입력"
          required
        />
        <label>닉네임</label>
        <input
          type="text"
          ref={nickname}
          placeholder="2자 이상 14자 이하"
          required
        />
        <label>지역 선택 (1)</label>
        <SelectAddress setAddress={setMainAddress} />
        <label>지역 선택 (2)</label>
        <SelectAddress setAddress={setSubAddress} />
        <button type="submit">가입하기</button>
      </form>
      <div className="span-box">
        <span>이미 계정이 있으신가요?</span>
        <span onClick={() => navigate("/login")}>로그인하기</span>
      </div>
    </StyledJoin>
  );
};
