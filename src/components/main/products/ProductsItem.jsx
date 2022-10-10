import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { timeToToday } from "../../../util/timeToToday";
import { categoriNumber } from "../../../util/categoryNumber";
import { useDispatch, useSelector } from "react-redux";
import { postRent } from "../../../redux/modules/mypageSlice";
import { postLike } from "../../../redux/modules/mypageSlice";
import { imgFirstString } from "../../../server/api";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";

export const ProductsItem = ({
  id,
  imgUrl,
  imgUrlArray,
  productName,
  memberName,
  price,
  address,
  wishNum,
  chat,
  content,
  writeAt,
  cateId,
  location,
  mapLocation,
  rentEnd,
  rentStart,
  status,
  // like
}) => {
  // console.log(wishNum);
  // 찜목록용 dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [togglelike, setTogglelike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // const [isrent, setIsrent] = useState(false);

  const data = useSelector((state) => state.mypage?.like);
  console.log("data", id, data);
  // console.log(id, like);

  const presentStatus = (status) => {
    if (status === "WAITING") {
      return <StyledStatus></StyledStatus>;
    } else if (status === "CONFIRMATION") {
      return <StyledStatus></StyledStatus>;
    } else if (status === "EXPIRATION") {
      return <StyledStatus></StyledStatus>;
    }
  };

  const likeHandler = (e) => {
    e.preventDefault();
    setTogglelike(!togglelike);
    if (!togglelike) {
      setLikeCount(likeCount + 1);
      dispatch(postLike(id));
    } else if (togglelike) {
      setLikeCount(likeCount - 1);
      dispatch(postLike(id));
    }
  };

  // useEffect(() => {
  //   data === "찜 등록이 완료되었습니다." ? setlike(false) : setlike(true);
  // }, []);

  //글쓴 시간 표시.

  const [write, setWrite] = useState("");
  // console.log("writeAt", writeAt);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    let timeStatus = writeAt;
    timeStatus !== undefined ? setWrite(timeStatus) : (timeStatus = "");
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt]);

  const reservationHandler = (e) => {
    e.preventDefault();
    const productData = {
      productId: id,
      buyStart: rentStart,
      buyEnd: rentEnd,
    };
    dispatch(postRent(productData));
  };

  // navigate state 전달 데이터
  const sendData = {
    id: id,
    imgUrl: imgUrl,
    imgUrlArray: imgUrlArray,
    productName: productName,
    memberName: memberName,
    price: price,
    address: address,
    wishNum: wishNum,
    chat: chat,
    content: content,
    writeAt: writeAt,
    cateId: cateId,
    location: location,
    rentEnd: rentEnd,
    rentStart: rentStart,
  };

  return (
    <>
      <Desktop>
        <StyledItemBox>
          <StyledImgBox>
            <StyledImg
              onClick={() => {
                navigate(`/productDetail/${id}`);
              }}
              src={`${imgFirstString}${imgUrlArray[0]}`}
              alt="이미지 없음"
            />
          </StyledImgBox>
          <StyledContentBox>
            <StyledTitle>{productName}</StyledTitle>
            {/* <StyledCateId>{categoriNumber(cateId)}</StyledCateId> */}
            <StyledLocation>{location}</StyledLocation>
            <br />
            {/* <StyledPeriod>
              {rentEnd}~{rentStart}
            </StyledPeriod> */}
            <StyledPayBox>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
              <br />
              <StyledTimeForToday> {createdAt}</StyledTimeForToday>
            </StyledPayBox>
            {presentStatus(status)}
            <StyledLikeAndChat>
              <StyledLikeWrap>
                {togglelike ? (
                  <>
                    <StyledLike
                      onClick={likeHandler}
                      src="https://img.icons8.com/ios-filled/50/47b5ff/like--v1.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜 {wishNum + likeCount}</span>
                  </>
                ) : (
                  <>
                    <StyledLike
                      onClick={likeHandler}
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜 {wishNum - likeCount}</span>
                  </>
                )}
              </StyledLikeWrap>
              <StyledChatWrap>
                <StyledChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅 </span>
              </StyledChatWrap>
              {/* <StyledChatWrap>
                <button onClick={reservationHandler}>예약 신청</button>
              </StyledChatWrap> */}
            </StyledLikeAndChat>
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
              src={`${imgFirstString}${imgUrlArray[0]}`}
              alt="이미지 없음"
            />
          </StyledMobileImgBox>
          <StyledContentBox>
            <StyledTitle>{productName}</StyledTitle>
            {/* <StyledCateId>{categoriNumber(cateId)}</StyledCateId> */}
            <StyledLocation>{location}</StyledLocation>
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

            <StyledAddress>{address}</StyledAddress>
            <StyledMobileLikeAndChat>
              <StyledMobileLikeWrap>
                {togglelike ? (
                  <StyledLike
                    onClick={likeHandler}
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

              <StyledMobileChatWrap>
                <StyledChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅 </span>
              </StyledMobileChatWrap>
              {/* <StyledChatWrap>
            <button onClick={reservationHandler}>예약 신청</button>
          </StyledChatWrap> */}
            </StyledMobileLikeAndChat>
          </StyledContentBox>
        </StyledMobileItemBox>
      </Mobile>
    </>
  );
};

const StyledStatus = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1185d7;
`;

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  padding: 10px 10px 0 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledMobileItemBox = styled.div`
  margin-bottom: 20px;
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
  width: 200px;
  height: 140px;
  margin: 5px 15px 5px 3px;
`;

const StyledImg = styled.img`
  /* box-sizing: border-box; */
  border-radius: 8px;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
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

const StyledLikeAndChat = styled.div`
  /* border: 1px solid red; */
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledMobileLikeAndChat = styled.div`
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
