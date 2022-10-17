import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { SelectAddress } from "../../components/selectAddress/SelectAddress";
import { StyledJoin } from "./styled";

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

  const checkValidation = () => {
    // if (!mailAuth) {
    //   alert("이메일을 인증해주세요.");
    //   return;
    // }
    console.log(mainAddress, subAddress);
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
    if (
      nickname.current.value.length < 2 ||
      nickname.current.value.length > 14
    ) {
      alert("닉네임은 2자 이상 14자 이하로 입력해주세요.");
      nickname.current.focus();
      return;
    }
    if (mainAddress === "" || subAddress === "") {
      alert("지역을 선택해주세요.");
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
      <label>비밀번호</label>
      <input
        type="password"
        ref={password}
        placeholder="8자 이상 32자 이하의 영문, 숫자 조합으로 입력"
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
      <input type="text" ref={nickname} placeholder="닉네임 입력" required />
      <label>지역 선택 (1)</label>
      <SelectAddress setAddress={setMainAddress} />
      <label>지역 선택 (2)</label>
      <SelectAddress setAddress={setSubAddress} />
      <button
        onClick={() => {
          if (checkValidation()) {
            mutate({
              email: email.current.value,
              password: password.current.value,
              nickname: nickname.current.value,
              mainAddress: mainAddress,
              subAddress: subAddress,
            });
          }
        }}
      >
        가입하기
      </button>
      <div className="span-box">
        <span>이미 계정이 있으신가요?</span>
        <span onClick={() => navigate("/login")}>로그인하기</span>
      </div>
    </StyledJoin>
  );
};
