import React from "react";
import styled from "styled-components";
import { Layout } from "../components/layout/Layout";

export const MyPage = () => {
  return (
    <Layout>
      <StyledGridBox>
        <StyledProfile>
          <StyledImgBox>
            <StyledImg
              src="https://image.ajunews.com/content/image/2019/12/25/20191225170826943516.jpg"
              alt="이미지 없음"
            />
          </StyledImgBox>
          <StyledNicknameAndIcon>
            <StyledNickname>gardenk</StyledNickname>
            <StyledProfileEdit>프로필 수정</StyledProfileEdit>
            <StyledLikeAndChatBox>
              <StyledEachWrap>
                <StyledLikeAndChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
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
          </StyledNicknameAndIcon>
        </StyledProfile>
        <StyledRentTitle>
          <StyledLendItem>빌려준 물건</StyledLendItem>
          <span>빌린 물건</span>
        </StyledRentTitle>
        <StyledRentStatusBox>
          <StyledStatusDetail>
            <StyledPending>대기중</StyledPending>
            <span>빌려주는 중</span>
            <span>기한 만료</span>
          </StyledStatusDetail>
        </StyledRentStatusBox>
      </StyledGridBox>
    </Layout>
  );
};

const StyledGridBox = styled.div`
  /* border: 1px solid blue; */
  width: 1024px;
  height: 100%;
  margin: 60px auto;
  display: grid;
  /* position: relative; */
  grid-template-columns: 250px 670px;
  justify-content: space-between;
  /* align-items: center; */
`;

const StyledProfile = styled.div`
  /* border: 1px solid red; */
  /* background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee12 100%); */
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 30px 0 0 0;
  height: 400px;
  grid-row: 1/3;
`;

const StyledImgBox = styled.div`
  /* border: 2px solid red; */
  width: 110px;
  height: 110px;
  border-radius: 70%;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledNicknameAndIcon = styled.div`
  /* border: 1px solid red; */
  width: 150px;
  height: 230px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
`;

const StyledNickname = styled.div`
  font-size: 25px;
  font-weight: 600;
`;
const StyledProfileEdit = styled.button`
  background-color: white;
  position: absolute;
  top: 47px;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 4px 5px;
`;

const StyledLikeAndChatBox = styled.div`
  /* border: 1px solid red; */
  width: 140px;
  justify-content: space-between;
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
`;

const StyledLikeAndChat = styled.img`
  width: 40px;
  height: 40px;
  /* margin: 5px 5px 5px 0; */
`;

const StyledRentTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.159);
  display: flex;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  height: 50px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  /* border-radius: 5px; */
`;

const StyledLendItem = styled.span`
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  /* background: #000; */
  /* color: #fff; */
  text-align: center;
  font-weight: bold;
  margin: 30px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-10px);
    border: 10px solid transparent;
    border-top-color: #000;
  }
`;

const StyledRentStatusBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 100%;
  grid-row: 2/4;
`;

const StyledStatusDetail = styled.div`
  /* border: 1px solid red; */
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 630px;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
  border-radius: 5px;
`;

const StyledPending = styled.span`
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  /* background: #000; */
  /* color: #fff; */
  text-align: center;
  font-weight: bold;
  margin: 30px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-10px);
    border: 10px solid transparent;
    border-top-color: #000;
  }
`;
