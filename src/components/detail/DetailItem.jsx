import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { imgFirstString } from "../../server/api";
import { timeToToday } from "../../util/timeToToday";
import { postLike } from "../../redux/modules/mypageSlice";

export const DetailItem = ({
  id,
  thumbimgUrl,
  productName,
  memberName,
  price,
  address,
  wishNum,
  chat,
  writeAt,
  cateId,
  location,
  mapLocation,
  rentEnd,
  rentStart,
  thumbimgUrl,
  // like
  heart,

}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 찜하기
  const [togglelike, setTogglelike] = useState(heart);
  const [likeCount, setLikeCount] = useState(wishNum);
  // console.log("heart 처음상태 >>", togglelike);

  const likeHandler = (e) => {
    e.preventDefault();
    setTogglelike(!togglelike);
    setLikeCount(likeCount + 1);
    dispatch(postLike(id));
  };

  const canceLikeHandler = (e) => {
    e.preventDefault();
    setTogglelike(!togglelike);
    setLikeCount(likeCount - 1);

    dispatch(postLike(id));
  };

  //글 작성 시간
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt]);

  return (
    <>
      <Desktop>
        <StyledItemBox>
          <StyledImgBox>
            <StyledImg
              onClick={() => {
                navigate(`/productDetail/${id}`);
              }}
              src={`${imgFirstString}${thumbimgUrl}`}
              alt="이미지 없음"
            />
          </StyledImgBox>
          <StyledContentBox>
            <StyledTitle>{productName}</StyledTitle>
            <StyledLocation>
              {location ? location : "지역 선택 안함"}
            </StyledLocation>
            <StyledPayBox>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
              <br />
              <StyledTimeForToday>{createdAt}</StyledTimeForToday>
            </StyledPayBox>
            <StyledLikeAndChatBox>
              <StyledLikeWrap>
                {togglelike ? (
                  <>
                    <StyledLike
                      onClick={canceLikeHandler}
                      src="https://img.icons8.com/ios-filled/50/47b5ff/like--v1.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜 {likeCount}</span>
                  </>
                ) : (
                  <>
                    <StyledLike
                      onClick={likeHandler}
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜 {likeCount}</span>
                  </>
                )}
              </StyledLikeWrap>
              {/* <StyledChatWrap>
                <StyledChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅 </span>
              </StyledChatWrap> */}
              {/* <StyledChatWrap>
                <button onClick={reservationHandler}>예약 신청</button>
              </StyledChatWrap> */}
            </StyledLikeAndChatBox>
          </StyledContentBox>
        </StyledItemBox>
      </Desktop>

      <Mobile>
        <StyledMobileItemBox>
          <StyledMobileImgBox>
            <StyledImg
              onClick={() => {
                navigate(`/productDetail/${id}`);
              }}
              src={`${imgFirstString}${thumbimgUrl}`}
              alt="이미지 없음"
            />
          </StyledMobileImgBox>
          <StyledContentBox>
            <StyledTitle>{productName}</StyledTitle>
            {/* <StyledCateId>{categoriNumber(cateId)}</StyledCateId> */}
            <StyledLocation>
              {location ? location : "지역 선택 안함"}
            </StyledLocation>
            <br />
            {/* <StyledPeriod>
              {rentEnd}~{rentStart}
            </StyledPeriod> */}
            <StyledPayBox>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
              <br />
              <StyledTimeForToday>{createdAt}</StyledTimeForToday>
            </StyledPayBox>
            <StyledMobileLikeAndChatBox>
              <StyledMobileLikeWrap>
                {togglelike ? (
                  <StyledLike
                    onClick={canceLikeHandler}
                    src="https://img.icons8.com/ios-filled/50/47b5ff/like--v1.png"
                    alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                  />
                ) : (
                  <StyledLike
                    onClick={likeHandler}
                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                    alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                  />
                )}
                <span>찜 {likeCount}</span>
              </StyledMobileLikeWrap>

              {/* <StyledMobileChatWrap>
                <StyledChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅 </span>
              </StyledMobileChatWrap> */}
              {/* <StyledChatWrap>
            <button onClick={reservationHandler}>예약 신청</button>
          </StyledChatWrap> */}
            </StyledMobileLikeAndChatBox>
          </StyledContentBox>
        </StyledMobileItemBox>
      </Mobile>
    </>
  );
};

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 20px;
  padding: 10px 10px 0 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledMobileItemBox = styled.div`
  border-bottom: 1px solid #c7c6c6bc;
  /* max-width: 480px; */
  padding: 10px 10px 0 10px;
  position: relative;
  /* border-radius: 5px; */
  background-image: linear-gradient(120deg, #ffffff 0%, #ebedee6e 100%);
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  /* margin: auto; */
  display: flex;
  background-color: white;
  padding: 0;
  align-items: center;
`;

const StyledImgBox = styled.div`
  /* border: 1px solid red; */
  padding: 2px;
  width: 200px;
  height: 140px;
  margin-bottom: 3px;
`;

const StyledMobileImgBox = styled.div`
  /* border: 1px solid red; */
  padding: 2px;
  width: 150px;
  height: 140px;
  margin: 5px 15px 5px 3px;
`;

const StyledImg = styled.img`
  /* box-sizing: border-box; */
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  margin: 12px 0;
`;

const StyledTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
`;

const StyledCateId = styled.span`
  font-size: 13px;
`;
const StyledTimeForToday = styled(StyledCateId)`
  color: gray;
`;

const StyledLocation = styled(StyledCateId)`
  color: gray;
  /* font-weight: 600; */
`;

const StyledPeriod = styled(StyledLocation)``;

const StyledPayBox = styled.div`
  margin: 5px 0 5px 0;
`;
const StyledPay = styled.span`
  /* border: 1px solid red; */
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledAddress = styled.div`
  font-size: small;
  font-weight: 500;
  /* padding-top: 10px; */
`;

const StyledLikeAndChatBox = styled.div`
  /* border: 1px solid red; */
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledLikeAndChat = styled.div`
  position: absolute;
  bottom: 0;
`;

const StyledMobileLikeAndChatBox = styled.div`
  /* border: 1px solid red; */
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
  padding-top: 5px;
`;

const StyledLikeWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column; */
  margin: 5px 12px 0 0;
  align-items: center;
  width: max-content;
`;

const StyledMobileLikeWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column; */
  /* margin: 5px 12px 0 0; */
  align-items: center;
  width: max-content;
  bottom: 0;
`;

const StyledLike = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px 5px 5px 0;
  cursor: pointer;
`;

const StyledChatWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column; */
  margin: 5px 5px 0 0;
  align-items: center;
  width: max-content;
`;

const StyledMobileChatWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column; */
  /* margin: 5px 5px 0 0; */
  align-items: center;
  width: max-content;
`;

const StyledChat = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px 5px 5px 0;
`;
