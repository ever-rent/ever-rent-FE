import React from "react";
import styled from "styled-components";

export const Banner = () => {
  return <StyledBanner src="img/bannerImg.png" alt="이미지 중비중 입니다." />;
};

const StyledBanner = styled.img`
  /* max-width: 1024px;
  margin: auto; */
  display: flex;
  /* justify-content: center; */
  /* align-items: center;
  position: relative; */
  /* top: 130px; */
  /* left: 0px; */

  width: 1024px;
  width: 100%;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  border-bottom: 1px solid #ececec;
`;
