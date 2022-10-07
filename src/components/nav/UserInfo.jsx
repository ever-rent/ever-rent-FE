import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { mypageAPI } from "../../server/api";

export const UserInfo = () => {
  const navigate = useNavigate();

  const { data: userData } = useQuery("getUserInfo", mypageAPI.getMyInfo);
  const userInfo = userData?.data.data;

  return (
    <StyledContainer>
      {userInfo?.imgUrl ? (
        <img src={userInfo?.imgUrl} alt={userInfo?.memberName} />
      ) : (
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt={userInfo?.memberName}
        />
      )}
      <h3>{userInfo?.memberName}</h3>
      <p>
        {userInfo?.mainAddress} | {userInfo?.subAddress}
      </p>
      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.reload();
        }}
      >
        로그아웃
      </button>
      <button onClick={() => navigate("/myPage")}>마이페이지</button>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 80px 0 20px 0;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  h3 {
    margin: 0 0 10px 0;
    text-align: center;
  }
  p {
    margin: 0 0 20px 0;
    color: #999;
  }
  button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #47b5ff;
    cursor: pointer;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
  .logout {
    position: absolute;
    top: 20px;
    right: 10px;
    border: 1px solid #e6e6e6;
    color: #999;
    background-color: #fff;
  }
`;
