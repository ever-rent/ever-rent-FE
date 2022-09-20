import styled from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout/Layout";
import {
  deleteProducts,
  getProducts,
  getProductsDetail,
} from "../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { categoriNumber } from "../util/categoryNumber";
import { timeToToday } from "../util/timeToToday";

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
  console.log(data);
  console.log(detailData);
  console.log(param.id);
  console.log(param);
  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";
  const defaultUserImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbNF5TD%2FbtrMyfbzuN7%2FJZiKO75eVNPNAGHIPtrAnK%2Fimg.png";

  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    setCreatedAt(detailData.writeAt);
  }, []);
  useEffect(() => {
    if (createdAt !== ``) {
      setCreatedAt(detailData.writeAt);
    }
  }, [createdAt]);

  const [editabled, setEditabled] = useState(true);

  const [userImage, setUserImage] = useState(defaultUserImg);

  const deletePost = () => {
    if (window.confirm("진짜 삭제하실건가요..?")) {
      dispatch(deleteProducts(param));
      alert("삭제완료");
      navigate("/");
    } else {
      alert("휴");
    }
  };

  return (
    <Layout>
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
                src={detailData && detailData.imgUrl}
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
              <StyledImagesWrap>
                <StyledMapImage
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZoOUr%2FbtrMtG2s1YT%2FLwGap5AgYCUktPDgK0hCik%2Fimg.png"
                  alt="https://icons8.com/icon/WbyzmoN1bnxR/map-marker Map Marker icon by https://icons8.com Icons8"
                />
                <StyledMapImgAlt>위치</StyledMapImgAlt>
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
                <StyledTimeForToday>
                  {" "}
                  ㆍ{timeToToday(createdAt)}
                </StyledTimeForToday>
              </StyledPostEachWrap>
              <StyledProductPrice>{detailData?.price}(원)</StyledProductPrice>
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
`;

const StyledDetailProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;

  padding: 40px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  border-radius: 10px;
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
`;

const StyledProductSubImageWrap = styled.div``;
const StyledProductSubImage = styled.img`
  width: 150px;
  height: 150px;
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
