import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { timeToToday } from "../../../util/timeToToday";
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
  heart,
  thumbimgUrl,
}) => {
  // console.log(wishNum);
  // 찜목록용 dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isrent, setIsrent] = useState(false);

  const data = useSelector((state) => state.mypage?.like);
  // console.log("data", id, data);
  // console.log(id, like);

  //상품 status
  const presentStatus = (status) => {
    if (status === "WAITING") {
      return <StyledWaiting></StyledWaiting>;
    } else if (status === "CONFIRMATION") {
      return <StyledStatus>렌탈확정</StyledStatus>;
    } else if (status === "EXPIRATION") {
      return <StyledStatus>기한만료</StyledStatus>;
    }
  };

  //TODO: 찜하기 기능은 빼고 숫자만 보여주는 것으로 바꿀 예정.

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

  // 비회원이 찜하기 클릭할 때
  const nonMemberLike = (e) => {
    e.preventDefault();
    const answer = window.confirm(
      "찜하기 기능은 로그인 시에만 이용가능합니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    if (answer === true) {
      navigate("/login");
    } else {
      return;
    }
  };

  //글쓴 시간 표시.

  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt]);

  return (
    <>
      <Desktop>
        <StyledItemBox
          style={
            status === "EXPIRATION" ? { backgroundColor: "#a5a1a3" } : null
          }
        >
          <StyledImgBox
            onClick={() => {
              navigate(`/productDetail/${id}`);
            }}
          >
            <StyledImg
              src={`${imgFirstString}${thumbimgUrl}`}
              alt="이미지 없음"
            />
          </StyledImgBox>
          <StyledContentBox>
            <StyledTitle
              onClick={() => {
                navigate(`/productDetail/${id}`);
              }}
            >
              {productName}
            </StyledTitle>

            <StyledLocation>
              {location ? location : "지역 선택 안함"}
            </StyledLocation>
            {presentStatus(status)}
            <StyledPayBox>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
              <br />
              <StyledTimeForToday> {createdAt}</StyledTimeForToday>
            </StyledPayBox>
            <StyledLikeAndChatBox>
              <StyledLikeWrap>
                {localStorage.getItem("memberId") ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <StyledLike
                      onClick={nonMemberLike}
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜 {likeCount}</span>
                  </>
                )}
              </StyledLikeWrap>
              {/* <StyledChatWrap>
                <StyledChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅</span>
              </StyledChatWrap> */}
            </StyledLikeAndChatBox>
          </StyledContentBox>
        </StyledItemBox>
      </Desktop>

      <Mobile>
        <StyledMobileItemBox
          style={
            status === "EXPIRATION" ? { backgroundColor: "#a5a1a3" } : null
          }
        >
          <StyledMobileImgBox>
            <StyledImg
              onClick={() => {
                navigate(`/productDetail/${id}`);
              }}
              src={`${imgFirstString}${thumbimgUrl}`}
              alt="이미지 없음"
            />
          </StyledMobileImgBox>
          <StyledMobileContentBox>
            <StyledMobileTitle
              onClick={() => {
                navigate(`/productDetail/${id}`);
              }}
            >
              {productName}
            </StyledMobileTitle>
            {/* <StyledCateId>{categoriNumber(cateId)}</StyledCateId> */}
            <StyledLocation>{location}</StyledLocation>
            {presentStatus(status)}
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
            <StyledMobileLikeAndChatBox>
              <StyledMobileLikeWrap>
                {localStorage.getItem("memberId") ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <StyledLike
                      onClick={nonMemberLike}
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜 {likeCount}</span>
                  </>
                )}
              </StyledMobileLikeWrap>

              {/* <StyledMobileChatWrap>
                <StyledChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅 </span>
              </StyledMobileChatWrap> */}
            </StyledMobileLikeAndChatBox>
          </StyledMobileContentBox>
        </StyledMobileItemBox>
      </Mobile>
    </>
  );
};

const StyledWaiting = styled.span`
  position: absolute;
  right: 5%;
  bottom: 5%;
  padding: 2px;
`;
const StyledStatus = styled.span`
  position: absolute;
  right: 5%;
  bottom: 8%;
  background-color: #2b8fd6;
  border-radius: 5px;
  padding: 2px 3px;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 0 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledMobileItemBox = styled.div`
  border-bottom: 1px solid #c7c6c6bc;
  padding: 10px 10px 0 10px;
  position: relative;
  background-image: linear-gradient(120deg, #ffffff 0%, #ebedee6e 100%);
  display: flex;
  background-color: white;
  padding: 0;
  align-items: center;
`;

const StyledImgBox = styled.div`
  /* border: 1px solid red; */
  padding: 2px;
  width: 180px;
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
  position: relative;
  height: 130px;
  margin-top: 12px;
`;

const StyledMobileContentBox = styled.div`
  width: 200px;
  margin-top: 12px;
`;

const StyledTitle = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 5px;
  font-weight: 600;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  width: 180px;
  height: 20px;
  cursor: pointer;
`;

const StyledMobileTitle = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 5px;
  font-weight: 600;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  width: 210px;
  height: 20px;
  cursor: pointer;
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
