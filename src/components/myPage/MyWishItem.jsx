import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { timeToToday } from "../../util/timeToToday";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLike } from "../../redux/modules/mypageSlice";

export const MyWishItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("MyWishItem>>", item);
  const {
    imgUrlArray,
    price,
    productName,
    mapLocation,
    memberName,
    productWriteAt,
    productId,
  } = item;

  // 글 작성 시간
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setCreatedAt(timeToToday(productWriteAt));
  }, [productWriteAt]);

  // 찜 하기
  const [like, setLike] = useState(true);
  const cancelLike = (e) => {
    e.preventDefault();
    setLike(!like);
    dispatch(postLike(productId));
  };
  const reLike = (e) => {
    e.preventDefault();
    setLike(true);
    dispatch(postLike(productId));
  };
  return (
    <>
      <Desktop>
        <StyledItem>
          <StyledImgBox
            onClick={() => navigate(`/productDetail/${item.productId}`)}
          >
            <img
              className="img"
              src={`${imgFirstString}${imgUrlArray[0]}`}
              alt="img"
            />
          </StyledImgBox>
          <div className="span-div">
            <span>
              <StyledTitle
                onClick={() => navigate(`/productDetail/${item.productId}`)}
                className="title"
              >
                {productName}
              </StyledTitle>
              {/* <span className="writer">작성자 : {memberName}</span> */}
              <br />
              <span className="date">
                {mapLocation} ∙ {createdAt}
              </span>
            </span>
            {like ? (
              <div>
                <StyledLike
                  onClick={cancelLike}
                  src="https://img.icons8.com/ios-filled/50/47b5ff/like--v1.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
              </div>
            ) : (
              <>
                <StyledLike
                  onClick={reLike}
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
              </>
            )}

            <span>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
            </span>
          </div>
        </StyledItem>
      </Desktop>

      <Mobile>
        <StyledMobileItem>
          <img
            className="img"
            src={`${imgFirstString}${imgUrlArray[0]}`}
            alt="img"
          />
          {/* <img src={imgUrlArray[1]} alt="img" /> */}
          <div className="span-div">
            <span>
              <span className="title">{productName}</span>
              {/* <span className="writer">작성자 : {memberName}</span> */}
              <br />
              <span className="date">
                {mapLocation} ∙ {createdAt}
              </span>
            </span>
            {like ? (
              <div>
                <StyledMobileLike
                  onClick={cancelLike}
                  src="https://img.icons8.com/ios-filled/50/47b5ff/like--v1.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
              </div>
            ) : (
              <>
                <StyledLike
                  onClick={reLike}
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
              </>
            )}
            <span>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
            </span>
          </div>
        </StyledMobileItem>
      </Mobile>
    </>
  );
};

const StyledItem = styled.div`
  /* border: 1px solid red; */
  display: flex;
  margin-bottom: 5px;
  width: 100%;
  position: relative;
  /* padding: 10px; */
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .like {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  .img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .span-div {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .writer {
      color: gray;
      font-size: 13px;
    }
    .date {
      color: gray;
      font-size: 13px;
    }
  }
`;

const StyledImgBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 5px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledTitle = styled.span`
  cursor: pointer;
`;
const StyledPay = styled.span`
  /* border: 1px solid red; */
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledLike = styled.img`
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
// const StyledContentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

const StyledMobileItem = styled.div`
  display: flex;
  max-width: 460px;
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
  .img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .span-div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .writer {
      color: gray;
      font-size: 13px;
    }
    .date {
      color: gray;
      font-size: 13px;
    }
  }
`;

const StyledMobileLike = styled.img`
  position: absolute;
  right: 8%;
  bottom: 10%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
