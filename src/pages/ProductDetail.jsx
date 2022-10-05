import styled from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout/Layout";
import { deleteProducts, getProducts } from "../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { categoriNumber } from "../util/categoryNumber";
import { timeToToday } from "../util/timeToToday";
import { LocationModal } from "../components/location/LocationModal";

import Swal from "sweetalert2";

import { UserReport } from "../components/report/UserReport";
import { PostReport } from "../components/report/PostReport";
import axios from "axios";

const FavoritIconButton = () => {
  const [liked, setLiked] = useState(false);

  const likeUp = () => {
    liked === false ? setLiked(true) : setLiked(false);
  };

  if (liked === false) {
    return (
      <StyledImagesWrap onClick={likeUp}>
        <StyledLikeImage
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
          alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
        />
        <StyledLikeImgAlt>찜하기</StyledLikeImgAlt>
      </StyledImagesWrap>
    );
  } else {
    return (
      <StyledImagesWrap onClick={likeUp}>
        <StyledLikeImage
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDoa5l%2FbtrMvM9d2ZW%2FoA2ssgiZFbkWmn9PZwGbS0%2Fimg.png"
          alt="https://icons8.com/icon/7697/heart Heart icon by https://icons8.com Icons8"
        />
        <StyledLikeImgAlt>찜하기</StyledLikeImgAlt>
      </StyledImagesWrap>
    );
  }
};

export const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const data = useSelector((state) => state.products.products);
  const detailData = data?.filter(
    (element) => element.id === Number(param.id)
  )[0];

  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";
  const defaultUserImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbNF5TD%2FbtrMyfbzuN7%2FJZiKO75eVNPNAGHIPtrAnK%2Fimg.png";

  const [writeAt, setWriteAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    let timeStatus = detailData?.writeAt;
    timeStatus !== undefined ? setWriteAt(timeStatus) : (timeStatus = "");
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt, detailData]);

  const [editabled, setEditabled] = useState(true);
  const [userImage, setUserImage] = useState(defaultUserImg);

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
        dispatch(deleteProducts(param));
        alert("삭제완료");
        navigate("/");
      }
    });
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <UserReport />
      <PostReport />
      <StyledDetailProductContainer>
        <StyledDetailProductWrap>
          <StyledEditableOption
            style={
              editabled === false ? { display: "none" } : { display: "flex" }
            }
          >
            <StyledEditButton
              onClick={() => {
                navigate(`/editProduct/${param.id}`);
              }}
            >
              글 수정
            </StyledEditButton>
            <StyledDeleteButton onClick={deletePost}>
              글 삭제 X
            </StyledDeleteButton>
          </StyledEditableOption>
          <StyledPostHeadWrap>
            <StyledProductImagetWrap>
              <SyltedProductMainImage
                src={
                  detailData?.imgUrl !== null
                    ? detailData?.imgUrl
                    : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png"
                }
                alt="이미지 미리보기"
              />
              <StyledProductSubImageWrap>
                <StyledProductSubImage src={defaultImg} />
                <StyledProductSubImage src={defaultImg} />
                <StyledProductSubImage src={defaultImg} />
              </StyledProductSubImageWrap>
            </StyledProductImagetWrap>
          </StyledPostHeadWrap>
          <StyledPostBodyWrap>
            <StyledPostSubItems>
              <StyledImagesWrap>
                <StyledChatImage
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIk1We%2FbtrMtHmOj3y%2F0raeNVKmtekcYwknla78n0%2Fimg.png"
                  alt="https://icons8.com/icon/1feCpTBoYAjK/chat Chat icon by https://icons8.com Icons8"
                />
                <StyledChatImgAlt>채팅하기</StyledChatImgAlt>
              </StyledImagesWrap>
              <FavoritIconButton />
              <StyledImagesWrap className="openPopupButton" onClick={openModal}>
                <StyledMapImage
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZoOUr%2FbtrMtG2s1YT%2FLwGap5AgYCUktPDgK0hCik%2Fimg.png"
                  alt="https://icons8.com/icon/WbyzmoN1bnxR/map-marker Map Marker icon by https://icons8.com Icons8"
                />
                <StyledMapImgAlt>위치</StyledMapImgAlt>
                <LocationModal showModal={showModal} closeModal={closeModal} />
              </StyledImagesWrap>
            </StyledPostSubItems>
            <StyledPostHr />
            <StyledUserInfo>
              <StyledUserimage src={userImage} />
              <StyledUserSubInfo>
                <StyledUserNickname>
                  {detailData?.memberName}
                </StyledUserNickname>
                <StyledUserLocation>지역</StyledUserLocation>
              </StyledUserSubInfo>
            </StyledUserInfo>
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
              <StyledPostDescription>
                {detailData?.content}
              </StyledPostDescription>
            </StyledPostMain>
          </StyledPostBodyWrap>
        </StyledDetailProductWrap>
      </StyledDetailProductContainer>
    </Layout>
  );
};

const StyledDetailProductContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;

  & {
    @media all and (max-width: 767px) {
      margin-top: 80px;
    }
    @media all and (max-width: 480px) {
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

  & {
    @media all and (max-width: 767px) {
      display: flex;
      flex-direction: column;
      width: 60vw;

      padding: 40px;
      box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
      border-radius: 10px;
    }
    @media all and (max-width: 480px) {
      width: 100vw;
    }
  }
`;

const StyledEditableOption = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledEditButton = styled.button`
  color: rgb(62, 160, 226);
  border-color: rgb(71, 181, 255);
  border-radius: 5px;
  background-color: white;

  margin-right: 10px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: rgb(71, 181, 255);
  }
`;
const StyledDeleteButton = styled.button`
  color: white;
  border: none;
  border-radius: 5px;
  background-color: rgb(224, 11, 11);

  margin-right: 10px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const StyledPostHeadWrap = styled.div`
  display: flex;
  justify-content: space-around;

  height: 250px;
`;

const StyledProductImagetWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
`;

const SyltedProductMainImage = styled.img`
  margin-top: 20px;

  width: 450px;
  height: 450px;

  & {
    @media all and (max-width: 767px) {
    }
    @media all and (max-width: 480px) {
      width: 80vw;
    }
  }
`;

const StyledProductSubImageWrap = styled.div``;
const StyledProductSubImage = styled.img`
  width: 150px;
  height: 150px;
  & {
    @media all and (max-width: 767px) {
    }
    @media all and (max-width: 480px) {
      width: 25vw;
    }
  }
`;

const StyledPostBodyWrap = styled.section`
  margin-top: 400px;
`;

const StyledPostSubItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 50px;
`;

const StyledImagesWrap = styled.div`
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
const StyledLikeImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
`;
const StyledMapImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
`;

const StyledChatImgAlt = styled.div``;
const StyledLikeImgAlt = styled.div``;
const StyledMapImgAlt = styled.div``;

const StyledPostHr = styled.hr`
  margin: 10px 0 10px;
  border: none;
  height: 1px;
  box-shadow: 1px 1px 1px 1px #ebebeb;
`;

const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUserimage = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledUserSubInfo = styled.div``;
const StyledUserNickname = styled.div`
  padding: 5px;
`;
const StyledUserLocation = styled.div`
  padding: 5px;
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

const StyledPostDescription = styled.div`
  padding: 5px;
  margin-top: 30px;
`;
