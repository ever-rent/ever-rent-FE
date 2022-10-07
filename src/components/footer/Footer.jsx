import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const Footer = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const goAddProduct = () => {
    isLogin === true
      ? navigate("/addproduct")
      : Swal.fire({
          position: "middle",
          icon: "warning",
          title: "로그인이 필요합니다.",
          showConfirmButton: false,
          timer: 1500,
          width: "300px",
        });
  };
  const goMyPage = () => {
    isLogin === true
      ? navigate("/addproduct")
      : Swal.fire({
          position: "middle",
          icon: "warning",
          title: "로그인이 필요합니다.",
          showConfirmButton: false,
          timer: 1500,
          width: "300px",
        });
  };

  return (
    <>
      <Desktop>
        <StyledFooter>
          <h1>Footer</h1>
        </StyledFooter>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileFootNav>
          <StyledNavImgWrap
            onClick={() => {
              navigate("/");
            }}
          >
            <StyledMypageImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPW3Ya%2FbtrN3DCU40e%2FFg4kQSyTMv9gqnKOH2Tjvk%2Fimg.png"
              alt="https://icons8.com/icon/6RlaHUy2CmGh/home-page Home Page icon by https://icons8.com Icons8"
            />
            <StyledImgSpan>홈으로</StyledImgSpan>
          </StyledNavImgWrap>
          <StyledNavImgWrap onClick={goAddProduct}>
            <StyledMypageImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
              alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
            />
            <StyledImgSpan>채팅</StyledImgSpan>
          </StyledNavImgWrap>
          <StyledNavImgWrap onClick={goMyPage}>
            <StyledMypageImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdqldLh%2FbtrN4aOcYSX%2FGfQqgud8sKNpsj7fXcBTRK%2Fimg.png"
              alt="https://icons8.com/icon/111473/person Person icon by https://icons8.com Icons8"
            />
            <StyledImgSpan>마이페이지</StyledImgSpan>
          </StyledNavImgWrap>
          {/* <div>플러스 동동</div> */}
        </StyledMobileFootNav>
      </Mobile>
    </>
  );
};

const StyledFooter = styled.footer`
  margin-top: 250px;
  background-color: #f7f9fa;
  width: 100%;
  height: 150px;
  position: relative;
  bottom: 0;
  left: 0;
`;

// for Mobile
const StyledMobileFootNav = styled.footer`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: #f7f9fa;
  position: fixed;
  bottom: 0;
`;

const StyledNavImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMypageImg = styled.img`
  width: 35px;
  height: 35px;
`;

const StyledImgSpan = styled.span`
  font-size: 12px;
`;
