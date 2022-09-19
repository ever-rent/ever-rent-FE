import React from "react";
import styled from "styled-components";

export const ProductsItem = (props) => {
  const { img1, title, price, address, Like, chat } = props.data;
  // console.log(props.data);
  return (
    <StyledItemBox>
      <StyledImgBox>
        <StyledImg src={img1} alt="이미지 없음" />
      </StyledImgBox>
      <StyledContentBox>
        <div>{title && title}</div>
        <StyledPay>{price}</StyledPay>
        <span> / 일</span>
        <StyledAddress>{address}</StyledAddress>
        <StyledLikeAndChat>
          관심 {Like} · 채팅 {chat}
        </StyledLikeAndChat>
      </StyledContentBox>
    </StyledItemBox>
  );
};

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  width: 100%;
`;
const StyledImgBox = styled.div``;

const StyledContentBox = styled.div`
  margin: 12px 0;
`;

const StyledPay = styled.span`
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
