import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyPage } from "../../pages/MyPage";
import { getMyInfo } from "../../redux/modules/mypageSlice";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const Profile = ({ like, setLike }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const info = useSelector((state) => state.mypage.myinfo);
  console.log("Profile >> info", info);

  const [likeModal, setlikeModal] = useState(like);

  useEffect(() => {
    dispatch(getMyInfo());
  }, [dispatch]);

  const likeListhandler = () => {
    setLike(!like);
  };
  console.log("likeListhandler >> like", like);

  return (
    <>
      <Desktop>
        <StyledProfileBox>
          <StyledImgFlexBox>
            <StyledImgBox>
              <StyledImg
                src={`https://source.boringavatars.com/beam/110/${info?.memberName}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0 
                `}
                alt="이미지 없음"
              />
            </StyledImgBox>
            <StyledNickname>{info?.memberName}</StyledNickname>
            <StyledProfileEdit
              onClick={() => navigate(`/editUserInfo/${info?.memberName}`)}
            >
              프로필 수정
            </StyledProfileEdit>
          </StyledImgFlexBox>
          <StyledIcon>
            <StyledLikeAndChatBox>
              <StyledEachWrap>
                {like ? (
                  <>
                    <StyledLikeAndChat
                      onClick={likeListhandler}
                      src="https://img.icons8.com/ios/50/47b5ff/reservation-2.png"
                      alt="https://icons8.com/icon/24814/reserve reserve icon by https://icons8.com Icons8"
                    />
                    <span>렌탈 목록</span>
                  </>
                ) : (
                  <>
                    <StyledLikeAndChat
                      onClick={likeListhandler}
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜목록</span>
                  </>
                )}
              </StyledEachWrap>
              <StyledEachWrap>
                <StyledLikeAndChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅목록</span>
              </StyledEachWrap>
            </StyledLikeAndChatBox>
          </StyledIcon>
        </StyledProfileBox>
      </Desktop>

      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileProfileContainer>
          <StyledMobileImgBox>
            <StyledMobileImg
              src="https://image.ajunews.com/content/image/2019/12/25/20191225170826943516.jpg"
              alt="이미지 없음"
            />
          </StyledMobileImgBox>
          <StyledMobileFlexBox>
            <StyledMobileNickname>{info?.memberName}</StyledMobileNickname>

            <StyledMobileEditButton
              onClick={() => navigate(`/editUserInfo/${info?.memberName}`)}
            >
              프로필 수정
            </StyledMobileEditButton>
          </StyledMobileFlexBox>

          <div>
            <StyledMobileIcon>
              <StyledMobileEachWrap>
                {like ? (
                  <>
                    <StyleMobileLikeAndChat
                      onClick={likeListhandler}
                      src="https://img.icons8.com/ios/50/47b5ff/reservation-2.png"
                      alt="https://icons8.com/icon/24814/reserve reserve icon by https://icons8.com Icons8"
                    />
                    <span>렌탈 목록</span>
                  </>
                ) : (
                  <>
                    <StyleMobileLikeAndChat
                      onClick={likeListhandler}
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
                      alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                    />
                    <span>찜목록</span>
                  </>
                )}
              </StyledMobileEachWrap>
              <StyledMobileEachWrap>
                <StyleMobileLikeAndChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅목록</span>
              </StyledMobileEachWrap>
            </StyledMobileIcon>
          </div>
        </StyledMobileProfileContainer>
      </Mobile>
    </>
  );
};

const StyledProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 30px 0 0 0;
  height: 380px;
  grid-row: 1/3;
  @media only screen and (max-width: 767px) {
    /* border: 1px solid yellow; */
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    /* width: 100vw; */
    height: 100%;
    padding: 10px 0;
  }
`;

const StyledImgFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 200px;
  @media only screen and (max-width: 767px) {
    /* border: 1px solid red; */
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    /* width: 100%; */
    /* display: flex; */
    height: 100%;
    /* width: 30rem; */
    /* padding: 10px 0; */
  }
`;

const StyledImgBox = styled.div`
  /* border: 2px solid green; */
  width: 110px;
  height: 110px;
  border-radius: 70%;
  overflow: hidden;
  ::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media only screen and (max-width: 767px) {
    position: absolute;
  }
`;

const StyledNickname = styled.div`
  margin: 10px 0;
  font-size: 25px;
  font-weight: 600;
  /* margin-right: 15px; */
  @media only screen and (max-width: 767px) {
    font-size: 5vw;
  }
`;
const StyledProfileEdit = styled.button`
  background-color: #47b5ff;
  color: white;
  /* position: absolute; */
  /* top: 47px; */
  border: transparent;
  border-radius: 3px;
  padding: 4px 5px;
  cursor: pointer;
  min-width: max-content;
`;

const StyledIcon = styled.div`
  /* border: 1px solid red; */
  width: 200px;
  /* height: 230px; */
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  @media only screen and (max-width: 767px) {
    height: 100%;
  }
`;

const StyledLikeAndChatBox = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  justify-content: space-evenly;
  /* width: max-content; */
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledEachWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  /* margin: 5px 12px 0 0; */
  align-items: center;
  width: max-content;
  span {
    margin-top: 10px;
    cursor: pointer;
  }
`;

const StyledLikeAndChat = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  /* margin: 5px 5px 5px 0; */
`;

const StyledMobileProfileContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  /* margin-bottom: 30px; */
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  /* border-radius: 10px; */
  /* padding: 30px 0 0 0; */
  height: 100%;
`;

const StyledMobileImgBox = styled.div`
  /* border: 2px solid green; */
  width: 110px;
  height: 110px;
  border-radius: 70%;
  overflow: hidden;
  @media only screen and (max-width: 767px) {
    /* border: 2px solid green; */
    height: 100px;
    width: 100px;
    /* padding: 10px 0; */
    margin-right: 20px;
    position: relative;
  }
  ::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StyledMobileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media only screen and (max-width: 767px) {
    position: absolute;
  }
`;

const StyledMobileEditButton = styled.button`
  background-color: #47b5ff;
  color: white;
  border: transparent;
  border-radius: 3px;
  padding: 4px 5px;
  margin: 8px 0 5px 0;
  cursor: pointer;
  min-width: max-content;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const StyledMobileFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMobileNickname = styled.div`
  margin: 10px 0 0 0;
  font-size: 25px;
  font-weight: 500;
  font-size: 30px;
`;

const StyleMobileLikeAndChat = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const StyledMobileIcon = styled.div`
  /* border: 1px solid red; */
  width: 200px;
  /* height: 230px; */
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0 0 0;
  @media only screen and (max-width: 767px) {
    height: 100%;
  }
`;

const StyledMobileEachWrap = styled.span`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  /* margin: 5px 12px 0 0; */
  align-items: center;
  width: max-content;
  span {
    margin-top: 10px;
    cursor: pointer;
  }
`;
