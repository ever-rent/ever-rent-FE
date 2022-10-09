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
          <StyledTitle>다이슨 청소기 팔아요</StyledTitle>
          <StyledPayBox>
            <StyledPay>{}</StyledPay>
            <StyledDay> / 일</StyledDay>
            <br />
            <StyledTimeForToday>{}</StyledTimeForToday>
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
  /* border: 1px solid red; */
  padding: 10px 10px 0 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledImg = styled.img`
  /* box-sizing: border-box; */
  border-radius: 8px;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  cursor: pointer;
`;

const StyledTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
`;

const StyledPayBox = styled.div`
  margin: 5px 0 5px 0;
`;

const StyledPay = styled.span`
  /* border: 1px solid red; */
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledTimeForToday = styled.span`
  color: gray;
  font-size: 13px;
`;
