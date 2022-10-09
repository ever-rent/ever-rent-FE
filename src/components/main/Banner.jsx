import React from "react";
import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const Banner = () => {
  return (
    <>
      <Desktop>
        <StyledBanner src="img/bannerImg.png" alt="이미지 중비중 입니다." />
      </Desktop>

      <Mobile>
        <StyledMobileBanner
          src="img/bannerMobileImg.png"
          alt="이미지 중비중 입니다."
        />
      </Mobile>
    </>
  );
};

const StyledBanner = styled.img`
  display: flex;
  width: 1024px;
  /* width: 90%; */
  height: 230px;
  margin: auto;
  margin-top: 60px;
  border-radius: 10px;
`;

const StyledMobileBanner = styled.img`
  display: flex;
  width: 480px;
  width: 90%;
  /* height: 150px; */
  margin: auto;
  margin-top: 120px;
  border-radius: 10px;
`;
