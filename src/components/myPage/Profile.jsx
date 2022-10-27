import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyInfo } from "../../redux/modules/mypageSlice";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { ProfileImg } from "./ProfileImg";
import { MyCallenge } from "./MyChallenge";

export const Profile = ({ like, setLike }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const info = useSelector((state) => state.mypage.myinfo);

  useEffect(() => {
    dispatch(getMyInfo());
  }, [dispatch]);

  const likeListhandler = () => {
    setLike(!like);
  };

  //프로필 수정 전 기본 프로필 지정
  const profileImg =
    info?.imgUrl == null
      ? `https://source.boringavatars.com/beam/110/${info?.id}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`
      : info?.imgUrl;

  // 프로필 모달
  const [showProfile, setShowProfile] = useState(false);
  const openProfileimgFix = () => {
    setShowProfile(true);
  };
  const closeProfileimgFix = () => {
    setShowProfile(false);
  };

  // 도전과제 모달
  const [showChallenge, setShowChallenge] = useState(false);
  const openChallenge = () => {
    setShowChallenge(true);
  };
  const closeChallenge = () => {
    setShowChallenge(false);
  };

  // 임시 뱃지 배열
  let badgeArray = [true, true, true, false, false, false, true, true, true];

  return (
    <>
      <Desktop>
        <StyledProfileBox>
          <StyledImgFlexBox>
            <StyledImgBox onClick={openProfileimgFix}>
              <StyledImg src={profileImg} alt="이미지 없음" />
            </StyledImgBox>
            <StyledImageEdit
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FUjHeg%2FbtrN27EGh2c%2FFUAuCglKKcKdPLOx1zjVK1%2Fimg.png"
              alt="alt=https://icons8.com/icon/kx4uQexsQTUC/write Write icon by https://icons8.com Icons8"
            />
            <StyledNickname>{info?.memberName}</StyledNickname>
            <StyledProfileEdit
              onClick={() =>
                navigate(`/editUserInfo/${info?.id}`, { state: info })
              }
            >
              회원정보 수정
            </StyledProfileEdit>
          </StyledImgFlexBox>
          <ProfileImg
            showProfile={showProfile}
            closeProfileimgFix={closeProfileimgFix}
            defaultImg={`https://source.boringavatars.com/beam/110/${info?.id}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`}
          />
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
              <StyledEachWrap onClick={() => navigate("/chatRoomList")}>
                <StyledLikeAndChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅목록</span>
              </StyledEachWrap>
              <StyledEachWrap onClick={openChallenge}>
                <StyledLikeAndChat
                  src={require("../../image/challengeLogo.png")}
                  alt="https://icons8.com/icon/pM35dYPfUtO5/crown-trophy-for-online-gaming-permium-membership Crown trophy for online gaming permium membership https://icons8.com Icons8"
                />
                <span>도전과제</span>
              </StyledEachWrap>
              <MyCallenge
                showChallenge={showChallenge}
                closeChallenge={closeChallenge}
                badgeArray={badgeArray}
              />
            </StyledLikeAndChatBox>
          </StyledIcon>
        </StyledProfileBox>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileProfileContainer>
          <StyledMobileImgBox onClick={openProfileimgFix}>
            <StyledMobileImg
              src="https://image.ajunews.com/content/image/2019/12/25/20191225170826943516.jpg"
              alt="이미지 없음"
            />
          </StyledMobileImgBox>
          <StyledMobileImageEdit
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FUjHeg%2FbtrN27EGh2c%2FFUAuCglKKcKdPLOx1zjVK1%2Fimg.png"
            alt="alt=https://icons8.com/icon/kx4uQexsQTUC/write Write icon by https://icons8.com Icons8"
          />
          <ProfileImg
            showProfile={showProfile}
            closeProfileimgFix={closeProfileimgFix}
            defaultImg={`https://source.boringavatars.com/beam/110/${info?.id}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`}
          />
          <StyledMobileFlexBox>
            <StyledMobileNickname>{info?.memberName}</StyledMobileNickname>
            <StyledMobileEditButton
              onClick={() =>
                navigate(`/editUserInfo/${info?.id}`, { state: info })
              }
            >
              회원정보 수정
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
              <StyledMobileEachWrap onClick={() => navigate("/chatRoomList")}>
                <StyleMobileLikeAndChat
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <span>채팅목록</span>
              </StyledMobileEachWrap>
              <StyledEachWrap onClick={openChallenge}>
                <StyledLikeAndChat
                  src={require("../../image/challengeLogo.png")}
                  alt="https://icons8.com/icon/pM35dYPfUtO5/crown-trophy-for-online-gaming-permium-membership Crown trophy for online gaming permium membership https://icons8.com Icons8"
                />
                <span>도전과제</span>
              </StyledEachWrap>
              <MyCallenge
                showChallenge={showChallenge}
                closeChallenge={closeChallenge}
                badgeArray={badgeArray}
              />
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
  padding: 15px 0 10px 0;
  height: 340px;
  width: 250px;
  grid-row: 1/3;
`;

const StyledImgFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 200px;
`;

const StyledImgBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 70%;
  cursor: pointer;
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
`;
const StyledImageEdit = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  margin-top: 10px;
  margin-left: 30px;
  background-color: #f0f0f0;
  border-radius: 20px;
  z-index: 99;
`;

const StyledNickname = styled.div`
  margin: 10px 0;
  font-size: 25px;
  font-weight: 600;
`;
const StyledProfileEdit = styled.button`
  background-color: #47b5ff;
  color: white;
  border: transparent;
  border-radius: 3px;
  padding: 4px 5px;
  cursor: pointer;
  min-width: max-content;
`;

const StyledIcon = styled.div`
  width: 200px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
`;

const StyledLikeAndChatBox = styled.div`
  width: 100%;
  justify-content: space-evenly;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledEachWrap = styled.span`
  display: flex;
  flex-direction: column;
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
`;

const StyledMobileProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  height: 100%;
`;

const StyledMobileImgBox = styled.div`
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

const StyledMobileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledMobileImageEdit = styled.img`
  width: 20px;
  height: 20px;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 20px;
  left: -60px;
  top: 40px;
  z-index: 5;
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
  width: 200px;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0 0 0;
`;

const StyledMobileEachWrap = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  span {
    margin-top: 10px;
    cursor: pointer;
  }
`;
