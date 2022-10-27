import React from "react";
import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import DesktopBanner from "../../image/bannerImg.png";
import MobileBanner from "../../image/bannerMobileImg.png";

export const Banner = () => {
  return (
    <>
      <Desktop>
        <StyledBanner src={DesktopBanner} alt="이미지 중비중 입니다." />
      </Desktop>

      <Mobile>
        <StyledMobileBanner src={MobileBanner} alt="이미지 중비중 입니다." />
      </Mobile>
    </>
  );
};

const StyledBanner = styled.img`
  display: flex;
  width: 1000px;
  min-width: 768px;
  height: 200px;
  margin: auto;
  margin-top: 60px;
  border-radius: 10px;
`;

const StyledMobileBanner = styled.img`
  display: flex;
  width: 100vw;
  height: 128px;
  margin: auto;
  margin-top: 120px;
`;
