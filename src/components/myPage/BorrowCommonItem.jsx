import React from 'react'
import styled from 'styled-components';

export const BorrowCommonItem = ({ item, index }) => {
  const { imgUrl, productName, content } = item;
  
  //TODO: 아직 정해지지 않았지만 일단 빌린물건 목록에만 img가 나오도록 설정.
  const insertImg = (index) => {
    if (index === 0) {
      return <img src={imgUrl} alt="img" />;
    } else {
      return;
    }
  };

  return (
    <StyledItem>
      {/* <img src={imgUrl} alt="img" /> */}
      {insertImg(index)}
      <div className="span-div">
        <span className="title">{productName}</span>
        <span>{content}</span>
        <span>
          남은 기간 : <span className="date">3일</span>
        </span>
      </div>
    </StyledItem>
  )
}

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