import React from "react";
import styled from "styled-components";

export const DetailItem = ({ data }) => {
  const { img1, title, price, address, Like, chat } = data;
  return (
    <StyledItemBox>
      <StyledImgBox>
        {/* TODO: onClick event 만들기.(detail page로 이동.) */}
        <StyledImg src={img1} alt="이미지 없음" />
      </StyledImgBox>
      <StyledContentBox>
        <StyledTitle>{title && title}</StyledTitle>
        <StyledPay>{price}</StyledPay>
        <StyledDay> / 일</StyledDay>
        <StyledAddress>{address}</StyledAddress>
        <StyledLikeAndChat>
          <StyledLikeWrap>
            <StyledLike
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
              alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
            />
            <span>찜 {Like}</span>
          </StyledLikeWrap>

          <StyledChatWrap>
            <StyledChat
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
              alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
            />
            <span>채팅 {chat}</span>
          </StyledChatWrap>
        </StyledLikeAndChat>
      </StyledContentBox>
    </StyledItemBox>
  );
};

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  padding: 15px 15px 0 15px;
  position: relative;
  border-radius: 10px;
  /* background-color: #fefdfd1f; */
  /* background: radial-gradient(#ebedee6e, #fefefe); */
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  /* background-image: linear-gradient(to top, #fff1eb 0%, #ace1f965 100%); */
  /* box-shadow: 5px 5px 15px 10px gray; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px; */
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; */
  /* width: 100%; */
`;

const StyledImgBox = styled.div`
  /* border: 1px solid red; */

  padding: 5px;
  margin-bottom: 5px;
`;

const StyledImg = styled.img`
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  margin: 12px 0;
`;

const StyledTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
`;

const StyledPay = styled.span`
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledAddress = styled.div`
  font-size: small;
  font-weight: 500;
  padding-top: 10px;
`;

const StyledLikeAndChat = styled.div`
  /* border: 1px solid red; */
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledLikeWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column; */
  margin: 5px 12px 0 0;
  align-items: center;
  width: max-content;
`;
const StyledLike = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px 5px 5px 0;
`;
const StyledChatWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column; */
  margin: 5px 5px 0 0;
  align-items: center;
  width: max-content;
`;

const StyledChat = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px 5px 5px 0;
`;
