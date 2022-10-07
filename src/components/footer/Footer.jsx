import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";

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
    // <StyledFooter>
    //   <h1>Footer</h1>
    // </StyledFooter>

    // for Mobile
    <StyledMobileFootNav>
      <div onClick={goAddProduct}>
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUjHeg%2FbtrN27EGh2c%2FFUAuCglKKcKdPLOx1zjVK1%2Fimg.png"
          alt="https://icons8.com/icon/kx4uQexsQTUC/write Write icon by https://icons8.com Icons8"
        />
      </div>
      <div onClick={()=>{navigate("/")}}>
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPW3Ya%2FbtrN3DCU40e%2FFg4kQSyTMv9gqnKOH2Tjvk%2Fimg.png"
          alt="https://icons8.com/icon/6RlaHUy2CmGh/home-page Home Page icon by https://icons8.com Icons8"
        />
      </div>
      <div onClick={goMyPage}>
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb1sd3N%2FbtrN4jDUg1z%2FW6gMyQSJXvK4k7bmjAiXAk%2Fimg.png"
          alt="https://icons8.com/icon/15265/customer Customer icon by https://icons8.com Icons8"
        />
      </div>
    </StyledMobileFootNav>
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
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: #f7f9fa;
  position: fixed;
  bottom: 0;
`;
