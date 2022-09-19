import React from "react";
import styled from "styled-components";

export const ProductsItem = (props) => {
  const { img1, title, price, address, Like, chat } = props.data;
  // console.log(props.data);
  return (
    <StyledItemBox>
      <StyledImgBox>
        {/* TODO: onClick event 만들기.(detail page로 이동.) */}
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
  padding: 15px 15px;
  border-radius: 15px;
  background-color: #fefdfd1f;
  /* box-shadow: 5px 5px 15px 10px gray; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  /* width: 100%; */
`;
const StyledImgBox = styled.div``;

const StyledImg = styled.img`
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
  cursor: pointer;
`;

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
