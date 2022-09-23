import React, { useState } from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";

export const WishItem = () => {
  const [like, setLike] = useState(true);
  return (
    <StyledItem>
      {like ? (
        <FcLike className="like" onClick={() => setLike(false)} />
      ) : (
        <FcLikePlaceholder className="like" onClick={() => setLike(true)} />
      )}
      <img
        src="https://davidsone.s3.ap-northeast-2.amazonaws.com/9cfa90d7-d143-40ed-a2be-b1ab170faceb.jpg"
        alt="img"
      />
      <div className="span-div">
        <span className="title">고양이 빌려드립니다</span>
        <span className="date">방이동 · 1일 전</span>
        <span className="price">20,000원 / 일</span>
      </div>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  display: flex;
  position: relative;
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .like {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .span-div {
    display: flex;
    flex-direction: column;
    .title {
      font-weight: 400;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
    .price {
      font-weight: 500;
    }
  }
`;
