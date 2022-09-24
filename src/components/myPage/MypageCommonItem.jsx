import React from "react";
import styled from "styled-components";

export const MypageCommonItem = ({
  id,
  imgUrl,
  productName,
  price,
  address,
  Like,
  chat,
  wiriteAt,
  rentEnd,
  rentStart,
}) => {
  return (
    <StyledItem>
      <img src={imgUrl} alt="img" />
      <div className="span-div">
        <span className="title">{productName}</span>
        <span>
          남은 기간 : <span className="date">3일</span>
        </span>
      </div>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  display: flex;
  position: relative;
  padding: 10px;
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
      color: #999;
      font-size: 12px;
    }
    .date {
      color: red;
      font-weight: bold;
    }
  }
`;
