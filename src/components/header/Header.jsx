import React from "react";
import styled from "styled-components";
import { CategoryBox } from "../category/CategoryBox";

export const Header = () => {
  return (
    <>
      <StyledHeaderTop>
        <StyledLogoImageWrap>
          <StyledLogoImg src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcIaEmP%2FbtrMnmILkqF%2FTxtrB71zUMzMY9Z2iiHqcK%2Fimg.png" />
        </StyledLogoImageWrap>
        <StyledHeaderWrap>
          <StyledSearchWrap>
            <StyledSearchButton alt="https://icons8.com/icon/59878/search https://icons8.com Icons8" />
            <StyledSearchInput
              type="text"
              placeholder="지역, 물품명으로 찾아보세요"
              maxLength={35}
            />
          </StyledSearchWrap>
        </StyledHeaderWrap>
        <StyledAddProductButton>글쓰기</StyledAddProductButton>
        <StyledSideMenu alt="https://icons8.com/icon/36389/menu-rounded Menu Rounded https://icons8.com" />
      </StyledHeaderTop>
      <CategoryBox />
    </>
  );
};

const StyledHeaderTop = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 78px;

  box-shadow: 0px 0px 1px 0px #a09f9f;
`;

const StyledLogoImageWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogoImg = styled.img`
  width: 300px;
  height: 60px;

  vertical-align: middle;
  cursor: pointer;
`;

const StyledHeaderWrap = styled.div`
  width: 100%;
`;

const StyledSearchWrap = styled.div`
  display: flex;
  align-items: center;
  max-width: 480px;
  min-width: 120px;
  margin-left: 30px;
  border-radius: 20px;
  border-color: rgb(71, 181, 255);
  box-shadow: 1px 0 4px 1px rgb(71, 181, 255);
  transition: box-shadow 0.2s ease-in-out 0s;
`;

const StyledSearchButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeAy66g%2FbtrMjWY3xqU%2Fm1EZ0SnIuAjUklSkeWYRqk%2Fimg.png");
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledSearchInput = styled.input`
  min-width: 100px;
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 15px;

  margin-left: 20px;

  &:focus {
    outline: none;
  }
`;

const StyledAddProductButton = styled.button`
  width: 150px;
  height: 40px;
  margin-right: 50px;

  background-color: rgb(71, 181, 255);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    font-size: 16px;
    box-shadow: 1px 1px 4px 1px rgb(71, 181, 255);
    transition: box-shadow 0.3s ease-in-out 0s;
    transition: font-size 0.1s ease-in-out 0s;
  }
`;

const StyledSideMenu = styled.span`
  margin-left: 60px;
  margin-right: 40px;
  background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXEErZ%2FbtrMjt32JCS%2FkCpkPLTB63X2PhhFE9Rin1%2Fimg.png");
  width: 75px;
  height: 50px;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #f1f1f1;
  }
`;
