import React from "react";
import styled from "styled-components";

export const ProductsItem = () => {
  return (
    <StyledItemBox>
      <StyledImgBox>
        <StyledImg
          src="https://dnvefa72aowie.cloudfront.net/origin/article/202209/1afbe86d79afe49eaf6fb5b553b7ae06674524ca78c61cb5653b29f18bec48b4.webp?q=82&s=300x300&t=crop"
          alt="이미지 없음"
        />
      </StyledImgBox>
      <StyledContentBox>
        <div>골프채 렌탈합니다.</div>
        <StyledPay>20.000원 / 일</StyledPay>
        <StyledAddress>서울 강남구 논현동</StyledAddress>
        <StyledLikeAndChat>관심 2 · 채팅 1</StyledLikeAndChat>
      </StyledContentBox>
    </StyledItemBox>
  );
};

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  width: 200px;
`;
const StyledImgBox = styled.div``;

const StyledContentBox = styled.div`
  margin: 12px 0;
`;

const StyledPay = styled.div`
  font-weight: 600;
`;
const StyledAddress = styled.div`
  font-size: small;
  font-weight: 500;
`;
const StyledLikeAndChat = styled.div`
  font-size: small;
`;

const StyledImg = styled.img`
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
`;
