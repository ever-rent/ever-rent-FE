import React from "react";
import styled from "styled-components";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";

export const BestProductItem = () => {
  return (
    <>
      <Desktop>
        <StyledItemBox>
          <StyledImg
            src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/92F53297C5CBF171F0A87AADD70C605A72EB133C46431E88C0563F4529BAA175.jpg?q=82&s=300x300&t=crop"
            alt="이미지 없음"
          />
          <StyledPayBox>
            <StyledTitle>다이슨 청소기 팔아요</StyledTitle>
            <StyledPay>5000원</StyledPay>
            <StyledDay> / 일</StyledDay>
          </StyledPayBox>
        </StyledItemBox>
      </Desktop>
      <Mobile>
        <></>
      </Mobile>
    </>
  );
};

const StyledItemBox = styled.div`
  border: 1px solid red;
  padding: 15px 10px 0 10px;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
  padding-bottom: 10px;
`;

const StyledTitle = styled.div``;

const StyledPayBox = styled.div`
  /* position: absolute;
  bottom: 0; */
`;

const StyledPay = styled.span``;

const StyledDay = styled.span``;

const StyledTimeForToday = styled.span``;
