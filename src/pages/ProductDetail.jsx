import styled from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout/Layout";
import { LocationModal } from "../components/location/LocationModal";
import { ImageModal } from "../components/imageModal/ImageModal";
import { UserReport } from "../components/report/UserReport";
import { PostReport } from "../components/report/PostReport";
import { WishButton } from "../components/button/WishButton";
import { UsersBadge } from "../components/detail/UsersBadge";
import { OtherProfile } from "../components/detail/OtherProfile";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProducts } from "../redux/modules/productSlice";
import { getProductsDetail } from "../redux/modules/productSlice";

import { categoriNumber } from "../util/categoryNumber";
import { timeToToday } from "../util/timeToToday";
import { Desktop, Mobile } from "../Hooks/MideaQuery";
import { imgFirstString } from "../server/api";
import axios from "axios";
import Swal from "sweetalert2";
import { createChatRoom } from "../redux/modules/chatSlice";

// 게시글 상세 페이지 컴포넌트
export const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const [data, setData] = useState();
  const fetchDetail = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/products/${param.id}`)
      .then((response) => {
        setData(response);
      });
  };
  useEffect(() => {
    fetchDetail();
    // 최근 본 상품용 dispatch
    dispatch(getProductsDetail(param.id));
  }, []);

  const detailDataSet = [data?.data.data];
  const detailData = detailDataSet?.filter((element) => element)[0];
  const firstUrl = imgFirstString;

  // 유저 프로필 없을 시 기본이미지
  const defaultUserImg = `https://source.boringavatars.com/beam/110/${detailData?.memberId}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`;

  const [writeAt, setWriteAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  // 타임스탬프용 useEffect
  // (timeToToday.js 사용 시 처리 시간 맞춤)
  useEffect(() => {
    let timeStatus = detailData?.writeAt;
    timeStatus !== undefined ? setWriteAt(timeStatus) : (timeStatus = "");
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt, detailData]);

  //수정가능여부
  const [editabled, setEditabled] = useState(false);
  const [userImage, setUserImage] = useState(defaultUserImg);

  //프로필 정보
  const [userInfoData, setUserInfoData] = useState();
  const fetchProfile = async (memberId) => {
    console.log("패치데이터", param);
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/updateInfo/${memberId}`)
      .then((response) => {
        setUserInfoData(response.data.data);
      });
  };

  useEffect(() => {
    if (detailData !== undefined) {
      detailData?.memberId === Number(localStorage.memberId)
        ? setEditabled(true)
        : setEditabled(false);
      fetchProfile(detailData?.memberId);
      if (detailData?.imgUrl !== undefined) {
        setUserImage(detailData?.imgUrl);
      }
    }
  }, [detailData]);

  // 게시글 삭제
  const deletePost = () => {
    Swal.fire({
      title: "정말 삭제하실건가요?",
      text: "삭제하시면 다시 복구시킬 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProducts(param.id));
        Swal.fire({
          title: "삭제완료!",
          icon: "success",
          confirmButtonColor: "rgb(71, 181, 255)",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.value) {
            navigate("/");
          }
        });
      }
    });
  };

  // 카카오 맵 모달
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onCreateChatRoom = async () => {
    if (localStorage.getItem("memberId")) {
      try {
        const data = await dispatch(createChatRoom(detailData?.id)).unwrap();
        if (data) {
          return navigate(`/chat/room/${detailData?.id}/${data}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "로그인이 필요합니다.",
        icon: "warning",
        confirmButtonColor: "rgb(71, 181, 255)",
        confirmButtonText: "확인",
      });
    }
  };

  //이미지 모달
  const [showImages, setShowImages] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const openImage = (index) => {
    setImageIndex(index);
    setShowImages(true);
  };
  const closeImage = () => {
    setShowImages(false);
  };

  // 프로필 이미지 모달
  const [showProfile, setShowProfile] = useState(false);
  const openProfile = () => {
    setShowProfile(true);
  };
  const closeProfile = () => {
    setShowProfile(false);
  };

  // 임시 뱃지 배열
  let badgeArray = [true, true, true, true, true, true, true, true, true];

  return (
    <>
      <Desktop>
        <Layout>
          <StyledDetailProductContainer>
            <StyledDetailProductWrap>
              <PostReport targetProductId={param.id} />
              {/* 게시글 리포트자리 */}
              <StyledPostHeadWrap>
                <ImageModal
                  showImages={showImages}
                  imageArray={detailData?.imgUrlArray}
                  imageIndex={imageIndex}
                  closeImage={closeImage}
                />
                {/* 이미지 모달 */}
                <StyledProductImagetWrap>
                  <SyltedProductMainImage
                    src={
                      detailData?.imgUrlArray[0] !== null
                        ? `${firstUrl}${detailData?.imgUrlArray[0]}`
                        : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png"
                    }
                    alt="이미지 미리보기"
                    onClick={() => openImage(0)}
                  />
                  <StyledProductSubImageWrap>
                    {detailData?.imgUrlArray.map((item, index) => {
                      if (index !== 0) {
                        return (
                          <StyledProductSubImage
                            src={`${firstUrl}${item}`}
                            onClick={() => openImage(index)}
                          />
                        );
                      }
                    })}
                  </StyledProductSubImageWrap>
                </StyledProductImagetWrap>
              </StyledPostHeadWrap>
              <StyledPostBodyWrap>
                <StyledPostSubItems
                  style={
                    detailData?.imgUrlArray.length < 7
                      ? { marginTop: "-100px" }
                      : null
                  }
                >
                  <StyledImagesWrap onClick={onCreateChatRoom}>
                    <StyledChatImage
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                      alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                    />
                    <StyledChatImgAlt>채팅하기</StyledChatImgAlt>
                  </StyledImagesWrap>
                  <WishButton productId={param.id} data={detailData} />
                  <StyledImagesWrap
                    className="openPopupButton"
                    onClick={openModal}
                  >
                    <StyledMapImage
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZoOUr%2FbtrMtG2s1YT%2FLwGap5AgYCUktPDgK0hCik%2Fimg.png"
                      alt="https://icons8.com/icon/WbyzmoN1bnxR/map-marker Map Marker icon by https://icons8.com Icons8"
                    />
                    <StyledMapImgAlt>위치</StyledMapImgAlt>
                    <LocationModal
                      showModal={showModal}
                      closeModal={closeModal}
                      location={detailData?.mapLocation}
                    />
                  </StyledImagesWrap>
                </StyledPostSubItems>
                <StyledPostHr />
                <StyledUserInfo>
                  <StyledInfoWrap>
                    <StyledUserimage src={userImage} onClick={openProfile} />
                    {/* 프로필 모달 */}
                    <OtherProfile
                      showProfile={showProfile}
                      closeProfile={closeProfile}
                      detailData={detailData}
                      userImage={userImage}
                      badgeArray={badgeArray}
                    />
                    <StyledUserSubInfo>
                      <StyledUserNickname>
                        {detailData?.memberName}
                      </StyledUserNickname>
                      <StyledUserLocation>
                        {detailData?.mapLocation}
                      </StyledUserLocation>
                    </StyledUserSubInfo>
                  </StyledInfoWrap>
                  <StyledPostOptionWrap>
                    <StyledMyPostOption
                      style={editabled ? null : { display: "none" }}
                    >
                      <span
                        onClick={() => {
                          navigate(`/editProduct/${param.id}`);
                        }}
                      >
                        글 수정
                      </span>
                      <StyledNoPointer>·</StyledNoPointer>
                      <span onClick={deletePost}>글 삭제</span>
                      <StyledNoPointer>·</StyledNoPointer>
                    </StyledMyPostOption>
                    <UserReport targetUserId={detailData?.memberId} />
                    {/* 유저 리포트 자리 */}
                  </StyledPostOptionWrap>
                </StyledUserInfo>
                <StyledPostHr />
                <StyledUserSubItem>
                  {/* 게시글 작성 유저 뱃지 */}
                  <div style={{ display: "flex" }}>
                    <UsersBadge badgeArray={badgeArray} />
                  </div>
                  <StyledMannerOndoWrap>
                    <StyledMannerOndo
                      src={require("../image/mannerNumber.png")}
                      alt="매너온도"
                    />
                    <StyledMannerSpan>
                      {detailData?.rating}
                      <StyledMannerHover>매너온도</StyledMannerHover>
                    </StyledMannerSpan>
                  </StyledMannerOndoWrap>
                </StyledUserSubItem>
                <StyledPostHr />
                <StyledPostMain>
                  <StyledPostTitle>{detailData?.productName}</StyledPostTitle>
                  <StyledPostEachWrap>
                    <StyledPostCategory>
                      {categoriNumber(detailData?.cateId)}
                    </StyledPostCategory>
                    <StyledTimeForToday> ㆍ{createdAt}</StyledTimeForToday>
                  </StyledPostEachWrap>
                  <StyledProductPrice>
                    {detailData?.price}(원) / 일
                  </StyledProductPrice>
                  <StyledRentDate>
                    렌트 가능기간 : {detailData?.rentStart} ~{" "}
                    {detailData?.rentEnd}
                  </StyledRentDate>
                  <StyledPostDescription>
                    {detailData?.content}
                  </StyledPostDescription>
                </StyledPostMain>
              </StyledPostBodyWrap>
            </StyledDetailProductWrap>
          </StyledDetailProductContainer>
        </Layout>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <Layout>
          <StyledMobileDetailContainer>
            <StyledMobileDetailWrap>
              <PostReport targetProductId={param.id} />
              {/* 게시글 리포트자리 */}
              <ImageModal
                showImages={showImages}
                imageArray={detailData?.imgUrlArray}
                imageIndex={imageIndex}
                closeImage={closeImage}
              />
              {/* 이미지 모달 */}
              <StyledMobilePostHeadWrap>
                <StyledMobileProductImagetWrap>
                  <SyltedMobileProductMainImage
                    src={
                      detailData?.imgUrlArray[0] !== null
                        ? `${firstUrl}${detailData?.imgUrlArray[0]}`
                        : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png"
                    }
                    alt="이미지 미리보기"
                    onClick={() => openImage(0)}
                  />
                  <StyledMobileSubImageWrap>
                    {detailData?.imgUrlArray.map((item, index) => {
                      if (index !== 0) {
                        return (
                          <StyledMobileSubImage
                            src={`${firstUrl}${item}`}
                            onClick={() => openImage(index)}
                          />
                        );
                      }
                    })}
                  </StyledMobileSubImageWrap>
                </StyledMobileProductImagetWrap>
              </StyledMobilePostHeadWrap>
              <StyledMobilePostBodyWrap>
                <StyledMobilePostSubItems
                  style={
                    detailData?.imgUrlArray.length < 7
                      ? { marginTop: "-100px" }
                      : null
                  }
                >
                  <StyledMobileImagesWrap onClick={onCreateChatRoom}>
                    <StyledChatImage
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                      alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                    />
                    <StyledChatImgAlt>채팅하기</StyledChatImgAlt>
                  </StyledMobileImagesWrap>
                  <WishButton productId={param.id} data={detailData} />
                  <StyledMobileImagesWrap
                    className="openPopupButton"
                    onClick={openModal}
                  >
                    <StyledMapImage
                      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FZoOUr%2FbtrMtG2s1YT%2FLwGap5AgYCUktPDgK0hCik%2Fimg.png"
                      alt="https://icons8.com/icon/WbyzmoN1bnxR/map-marker Map Marker icon by https://icons8.com Icons8"
                    />
                    <StyledMapImgAlt>위치</StyledMapImgAlt>
                    <LocationModal
                      showModal={showModal}
                      closeModal={closeModal}
                      location={detailData?.mapLocation}
                    />
                  </StyledMobileImagesWrap>
                </StyledMobilePostSubItems>
                <StyledMobilePostHr />
                <StyledMobileUserInfo>
                  <StyledMobileInfoWrap>
                    <StyledMobileUserimage
                      src={userImage}
                      onClick={openProfile}
                    />
                    {/* 프로필 모달 */}
                    <OtherProfile
                      showProfile={showProfile}
                      closeProfile={closeProfile}
                      detailData={detailData}
                      userImage={userImage}
                      badgeArray={badgeArray}
                    />
                    <StyledMobileUserSubInfo>
                      <StyledMobileUserNickname>
                        {detailData?.memberName}
                      </StyledMobileUserNickname>
                      <StyledMobileUserLocation>
                        {detailData?.mapLocation}
                      </StyledMobileUserLocation>
                    </StyledMobileUserSubInfo>
                  </StyledMobileInfoWrap>
                  <StyledMobilePostOptionWrap>
                    <StyledMobileMyPostOption
                      style={editabled ? null : { display: "none" }}
                    >
                      <span
                        onClick={() => {
                          navigate(`/editProduct/${param.id}`);
                        }}
                      >
                        글 수정
                      </span>
                      <StyledNoPointer>·</StyledNoPointer>
                      <span onClick={deletePost}>글 삭제</span>
                      <StyledNoPointer>·</StyledNoPointer>
                    </StyledMobileMyPostOption>
                    <UserReport targetUserId={detailData?.memberId} />
                    {/* 유저 리포트 자리 */}
                  </StyledMobilePostOptionWrap>
                </StyledMobileUserInfo>
                <StyledPostHr />
                <StyledUserSubItem>
                  {/* 게시글 작성 유저 뱃지 */}
                  <div style={{ display: "flex" }}>
                    <UsersBadge badgeArray={badgeArray} />
                  </div>
                  <StyledMannerOndoWrap>
                    <StyledMannerOndo
                      src={require("../image/mannerNumber.png")}
                      alt="매너온도"
                    />
                    <StyledMannerSpan>{detailData?.rating}</StyledMannerSpan>
                  </StyledMannerOndoWrap>
                </StyledUserSubItem>
                <StyledPostHr />
                <StyledMobilePostMain>
                  <StyledMobilePostTitle>
                    {detailData?.productName}
                  </StyledMobilePostTitle>
                  <StyledMobilePostEachWrap>
                    <StyledPostCategory>
                      {categoriNumber(detailData?.cateId)}
                    </StyledPostCategory>
                    <StyledTimeForToday> ㆍ{createdAt}</StyledTimeForToday>
                  </StyledMobilePostEachWrap>
                  <StyledMobileProductPrice>
                    {detailData?.price}(원) / 일
                  </StyledMobileProductPrice>
                  <StyledRentDate>
                    렌트 가능기간 : {detailData?.rentStart} ~{" "}
                    {detailData?.rentEnd}
                  </StyledRentDate>
                  <StyledMobilePostDescription>
                    {detailData?.content}
                  </StyledMobilePostDescription>
                </StyledMobilePostMain>
              </StyledMobilePostBodyWrap>
            </StyledMobileDetailWrap>
          </StyledMobileDetailContainer>
        </Layout>
      </Mobile>
    </>
  );
};

const StyledDetailProductContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;

  animation: productDetailFadein 0.8s;
  & {
    @keyframes productDetailFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledDetailProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;

  padding: 40px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  border-radius: 10px;
`;

const StyledPostHeadWrap = styled.div`
  display: flex;
  justify-content: space-around;

  height: 250px;
`;

const StyledProductImagetWrap = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
`;

const SyltedProductMainImage = styled.img`
  margin-top: 20px;

  width: 400px;
  height: 400px;
  cursor: pointer;
`;

const StyledProductSubImageWrap = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 80px 80px 80px 80px 80px;
  grid-gap: 20px;
`;
const StyledProductSubImage = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

const StyledPostBodyWrap = styled.section`
  margin-top: 400px;
`;

const StyledPostSubItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const StyledImagesWrap = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background-color: #ebebeb;
  }
`;

const StyledChatImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
`;
export const StyledLikeImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
`;
const StyledMapImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
`;

const StyledChatImgAlt = styled.span``;
const StyledLikeImgAlt = styled.span``;
const StyledMapImgAlt = styled.span``;

const StyledPostHr = styled.hr`
  margin: 10px 0 10px;
  border: none;
  height: 1px;
  box-shadow: 1px 1px 1px 1px #ebebeb;
`;

const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledUserSubItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledMannerOndoWrap = styled.div`
  margin-left: 20px;
`;

const StyledMannerOndo = styled.img`
  width: 80px;
  height: 60px;
`;
const StyledMannerSpan = styled.span`
  position: relative;
  right: 60px;
  top: -20px;
  font-size: 15px;
  font-weight: bold;
  color: rgb(253, 138, 105);
`;

const StyledInfoWrap = styled.div`
  display: flex;
`;

const StyledUserimage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const StyledUserSubInfo = styled.div``;
const StyledUserNickname = styled.div`
  padding: 5px;
`;
const StyledUserLocation = styled.div`
  padding: 5px;
`;

const StyledPostOptionWrap = styled.div`
  display: flex;
`;
const StyledMannerHover = styled.span`
  position: absolute;
  bottom: 0;
  left: -15px;
  color: transparent;
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    width: 60px;
    color: rgb(253, 138, 105);
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
  }
`;

const StyledMyPostOption = styled.div`
  display: flex;

  & span {
    margin-right: 10px;
    font-size: 14px;
    color: gray;
    cursor: pointer;
  }
`;
const StyledNoPointer = styled.span`
  cursor: text;
`;

const StyledPostMain = styled.div`
  padding: 5px;
`;
const StyledPostTitle = styled.h2`
  margin: 10px;
`;
const StyledPostEachWrap = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
  padding: 5px;
`;
const StyledPostCategory = styled.div``;
const StyledTimeForToday = styled.div``;
const StyledProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;

  padding: 5px;
`;
const StyledRentDate = styled.div`
  padding: 5px;
  color: gray;
  font-size: 12px;
`;

const StyledPostDescription = styled.div`
  padding: 5px;
  margin-top: 30px;
`;

// for Mobile

const StyledMobileDetailContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;

  animation: productDetailFadein 0.8s;
  & {
    @keyframes productDetailFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledMobileDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 470px;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 50px;
`;

const StyledMobilePostHeadWrap = styled.div`
  display: flex;
  justify-content: space-around;

  height: 250px;
`;

const StyledMobileProductImagetWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
`;

const SyltedMobileProductMainImage = styled.img`
  margin-top: 20px;

  width: 300px;
  height: 300px;
  cursor: pointer;
`;

const StyledMobileSubImageWrap = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px;
  grid-gap: 10px;
`;
const StyledMobileSubImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const StyledMobilePostBodyWrap = styled.section`
  margin-top: 250px;
`;

const StyledMobilePostSubItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 50px;

  & img {
    width: 30px;
    height: 30px;
  }
  & span {
    font-size: 12px;
  }
`;

const StyledMobileImagesWrap = styled.div`
  width: 90px;
  height: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background-color: #ebebeb;
  }
`;

const StyledMobilePostHr = styled.hr`
  margin: 10px 0 10px;
  border: none;
  height: 1px;
  box-shadow: 1px 1px 1px 1px #ebebeb;
`;

const StyledMobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledMobileInfoWrap = styled.div`
  display: flex;
`;

const StyledMobileUserimage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const StyledMobileUserSubInfo = styled.div``;
const StyledMobileUserNickname = styled.div`
  padding: 5px;
`;
const StyledMobileUserLocation = styled.div`
  padding: 5px;
`;

const StyledMobilePostOptionWrap = styled.div`
  display: flex;
`;
const StyledMobileMyPostOption = styled.div`
  display: flex;

  & span {
    margin-right: 10px;
    font-size: 14px;
    color: gray;
    cursor: pointer;
  }
`;

const StyledMobilePostMain = styled.div`
  padding: 5px;
`;
const StyledMobilePostTitle = styled.h2`
  margin: 10px;
`;
const StyledMobilePostEachWrap = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
  padding: 5px;
`;

const StyledMobileProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;

  padding: 5px;
`;

const StyledMobilePostDescription = styled.div`
  padding: 5px;
  margin-top: 30px;
`;
