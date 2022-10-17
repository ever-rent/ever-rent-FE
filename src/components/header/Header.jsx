import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openNav } from "../../redux/modules/navSlice";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import Swal from "sweetalert2";
import { RecentItem } from "./RecentItem";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [submitData, setSubmitData] = useState("");

  const goSearch = (e) => {
    e.preventDefault();
    navigate(`/searchItems/${submitData}`);
  };

  return (
    <>
      <Desktop>
        <StyledHeaderTop>
          <StyledLogoImageWrap>
            <StyledLogoImg
              onClick={() => {
                navigate("/");
              }}
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcIaEmP%2FbtrMnmILkqF%2FTxtrB71zUMzMY9Z2iiHqcK%2Fimg.png"
            />
          </StyledLogoImageWrap>
          <StyledHeaderWrap>
            <StyledSearchWrap onSubmit={(e) => goSearch(e)}>
              <StyledSearchButton
                type="button"
                alt="https://icons8.com/icon/59878/search https://icons8.com Icons8"
              />
              <StyledSearchInput
                type="text"
                placeholder="지역, 물품명으로 찾아보세요"
                maxLength={35}
                onChange={(e) => setSubmitData(e.target.value)}
              />
            </StyledSearchWrap>
          </StyledHeaderWrap>
          <StyledSignMenu>
            {localStorage.getItem("memberId") ? (
              <>
                <span onClick={() => navigate("/chatRoomList")}>채팅목록</span>
                <StyledAddProductButton
                  onClick={() => {
                    navigate("/addProduct");
                  }}
                >
                  글쓰기
                </StyledAddProductButton>
              </>
            ) : (
              <StyledLoginTab>
                <StyledLoginSpan
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </StyledLoginSpan>
                <StyledLoginSpan
                  onClick={() => {
                    navigate("/join");
                  }}
                >
                  회원가입
                </StyledLoginSpan>
              </StyledLoginTab>
            )}
          </StyledSignMenu>
          <StyledSideMenu
            onClick={() => dispatch(openNav())}
            alt="https://icons8.com/icon/36389/menu-rounded Menu Rounded https://icons8.com"
          />
        </StyledHeaderTop>
        <RecentItem />
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileHeader>
          <StyledMobileHeaderWrap>
            <StyledMobileSearchWrap>
              <StyledSearchButton
                type="button"
                alt="https://icons8.com/icon/59878/search https://icons8.com Icons8"
              />
              <StyledMobileSearchInput
                type="text"
                placeholder="지역, 물품명으로 찾아보세요"
                maxLength={35}
              />
            </StyledMobileSearchWrap>
            {localStorage.getItem("memberId") ? (
              <StyledMobileAddProductButton
                onClick={() => {
                  navigate("/addProduct");
                }}
              >
                글쓰기
              </StyledMobileAddProductButton>
            ) : (
              <StyledMobileAddProductButton
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </StyledMobileAddProductButton>
            )}
            <StyledSideMenu
              onClick={() => dispatch(openNav())}
              alt="https://icons8.com/icon/36389/menu-rounded Menu Rounded https://icons8.com"
            />
          </StyledMobileHeaderWrap>
        </StyledMobileHeader>
      </Mobile>
    </>
  );
};

const StyledHeaderTop = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 78px;
  border-bottom: 1px solid #ececec;
`;

const StyledLogoImageWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogoImg = styled.img`
  width: 200px;
  height: 40px;
  cursor: pointer;
`;

const StyledHeaderWrap = styled.div`
  /* width: 1024px; */
`;

const StyledSearchWrap = styled.form`
  display: flex;
  align-items: center;
  max-width: 400px;
  min-width: 120px;
  margin-left: 30px;
  border-radius: 20px;
  border-color: rgb(71, 181, 255);
  box-shadow: 1px 1px 4px 1px rgb(71, 181, 255);
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
`;

const StyledSearchInput = styled.input`
  min-width: 100px;
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 15px;

  margin-left: 20px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const StyledSignMenu = styled.div`
  display: flex;
  align-items: center;

  margin-left: 40px;
`;

const StyledLoginTab = styled.div`
  display: flex;
  margin-right: 10px;
`;
const StyledLoginSpan = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: #2e2e2e;
  cursor: pointer;
`;

const StyledAddProductButton = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 10px;

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
  margin-left: 50px;
  margin-right: 40px;
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXEErZ%2FbtrMjt32JCS%2FkCpkPLTB63X2PhhFE9Rin1%2Fimg.png")
    no-repeat 55% 50%;
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

// for Mobile

const StyledMobileHeader = styled.div`
  width: 450px;
  height: 80px;
  display: flex;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const StyledMobileHeaderWrap = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
`;

const StyledMobileSearchWrap = styled.form`
  display: flex;
  align-items: center;
  width: 250px;

  margin-left: 20px;
  border-radius: 20px;
  border-color: rgb(71, 181, 255);
  box-shadow: 1px 1px 4px 1px rgb(71, 181, 255);
  transition: box-shadow 0.2s ease-in-out 0s;
`;

const StyledMobileSearchInput = styled.input`
  min-width: 100px;
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 15px;

  margin-left: 20px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const StyledMobileAddProductButton = styled.button`
  width: 80px;
  height: 35px;
  margin-left: 25px;

  background-color: rgb(71, 181, 255);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    font-size: 16px;
    box-shadow: 1px 1px 4px 1px rgb(71, 181, 255);
    transition: box-shadow 0.3s ease-in-out 0s;
    transition: font-size 0.1s ease-in-out 0s;
  }
`;
