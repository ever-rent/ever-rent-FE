import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <StyledProfileBox>
      <StyledImgFlexBox>
        <StyledImgBox>
          <StyledImg
            src="https://image.ajunews.com/content/image/2019/12/25/20191225170826943516.jpg"
            alt="이미지 없음"
          />
        </StyledImgBox>
        <StyledNickname>gardenk</StyledNickname>
        <StyledProfileEdit>프로필 수정</StyledProfileEdit>
      </StyledImgFlexBox>
      <StyledIcon>
        <StyledLikeAndChatBox>
          {/* <StyledEachWrap>
            <StyledLikeAndChat
              src="https://img.icons8.com/ios/50/47b5ff/reservation-2.png"
              alt="https://icons8.com/icon/24814/reserve reserve icon by https://icons8.com Icons8"
            />
            <span>예약 목록</span>
          </StyledEachWrap> */}
          <StyledEachWrap>
            <StyledLikeAndChat
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
              alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
            />
            {/* TODO: 찜목록 어떤식으로 구현할지 아직 미정. */}
            <span>찜목록</span>
          </StyledEachWrap>
          <StyledEachWrap>
            <StyledLikeAndChat
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
              alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
            />
            <span>채팅목록</span>
          </StyledEachWrap>
        </StyledLikeAndChatBox>
      </StyledIcon>
    </StyledProfileBox>
  );
};

const StyledProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 30px 0 0 0;
  height: 380px;
  grid-row: 1/3;
  @media only screen and (max-width: 767px) {
    /* border: 1px solid yellow; */
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    /* width: 100vw; */
    height: 100%;
    padding: 10px 0;
  }
`;

const StyledImgFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 200px;
  @media only screen and (max-width: 767px) {
    /* border: 1px solid red; */
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    /* width: 100%; */
    /* display: flex; */
    height: 100%;
    /* width: 30rem; */
    /* padding: 10px 0; */
  }
`;

const StyledImgBox = styled.div`
  /* border: 2px solid green; */
  width: 110px;
  height: 110px;
  border-radius: 70%;
  overflow: hidden;
  @media only screen and (max-width: 767px) {
    /* border: 2px solid green; */
    height: 100px;
    width: 100px;
    /* padding: 10px 0; */
    margin-right: 20px;
    position: relative;
  }
  ::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media only screen and (max-width: 767px) {
    position: absolute;
  }
`;

const StyledNickname = styled.div`
  margin: 10px 0;
  font-size: 25px;
  font-weight: 600;
  margin-right: 15px;
  @media only screen and (max-width: 767px) {
    font-size: 5vw;
  }
`;
const StyledProfileEdit = styled.button`
  background-color: #47b5ff;
  color: white;
  /* position: absolute; */
  /* top: 47px; */
  border: transparent;
  border-radius: 3px;
  padding: 4px 5px;
  min-width: max-content;
  @media only screen and (max-width: 767px) {
    /* border: 1px solid red; */
    position: absolute;
    right: 10px;
    bottom: 10px;
    /* margin: 10px; */
    margin-right: 10px;
  }
`;

const StyledIcon = styled.div`
  /* border: 1px solid red; */
  width: 200px;
  /* height: 230px; */
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  @media only screen and (max-width: 767px) {
    height: 100%;
  }
`;

const StyledLikeAndChatBox = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  justify-content: space-evenly;
  /* width: max-content; */
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledEachWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  /* margin: 5px 12px 0 0; */
  align-items: center;
  width: max-content;
  span {
    margin-top: 10px;
    cursor: pointer;
  }
`;

const StyledLikeAndChat = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  /* margin: 5px 5px 5px 0; */
`;
