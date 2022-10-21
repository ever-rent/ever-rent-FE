import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tab } from "../components/nav/Tab";
import { UserInfo } from "../components/nav/UserInfo";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openNav } from "../redux/modules/navSlice";

export const SideNav = ({ openState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem("accessToken") ? true : false;

  return (
    <>
      {openState ? (
        <StyledContainer>
          <BsReverseBackspaceReverse
            className="back"
            onClick={() => dispatch(openNav())}
          />
          {isLogin ? (
            <>
              <UserInfo className="user-info" />
              <Tab className="tab" />
            </>
          ) : (
            <Login>
              <button onClick={() => navigate("/login")}>로그인</button>
              <button onClick={() => navigate("/join")}>회원가입</button>
            </Login>
          )}
        </StyledContainer>
      ) : null}
    </>
  );
};

const StyledContainer = styled.div`
  width: 400px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .back {
    position: absolute;
    top: 20px;
    right: 350px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  button {
    width: 50%;
    height: 50px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #5902ff;
    cursor: pointer;
  }
`;
