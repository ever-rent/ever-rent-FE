import styled from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../redux/modules/productSlice";
import { useParams } from "react-router-dom";
import axios from "axios";


export const EditProduct = () => {
  const dispatch = useDispatch();
  const param = useParams();
  console.log(param);

  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";

  const [imgView, setImgView] = useState();
  const [sendImage, setSendImage] = useState();

  // const fileChange = (fileBlob) => {
  //   setSendImage([...sendImage].concat(fileBlob));

  //   const reader = new FileReader();
  //   for (let i = 0; i < fileBlob.length; i++) {
  //     reader.readAsDataURL(fileBlob[i]);
  //     reader.onloadend = () => {
  //       let imageSubs = reader.result;
  //       setImgView([...imgView].concat(imageSubs));
  //     };
  //   }
  // };

  const fileChange = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    console.log(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgView(reader.result);
        setSendImage(fileBlob);
        resolve();
      };
    });
  };

  const imageLengthCheck = (e) => {
    if (imgView.length === 4) {
      alert("이미 4장이네요ㅠ");
      e.preventDefault();
    }
  };

  const initImage = (item, indexNum) => {
    setImgView(imgView.filter((element) => element !== item));
    setSendImage(
      [...sendImage]
        .map((item, index) => {
          if (index !== indexNum) {
            return item;
          }
        })
        .filter((element) => element)
    );
  };

  const [categoryInput, setCategoryInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [disabled, setDisabled] = useState(true);

  const categoryChange = (value) => {
    setCategoryInput(value);
  };
  const priceChange = (value) => {
    setPriceInput(value);
  };
  const startDateChange = (value) => {
    setStartDateInput(value);
  };
  const endDateChange = (value) => {
    setEndDateInput(value);
  };
  const titleChange = (value) => {
    setTitle(value);
  };
  const discriptionChange = (value) => {
    setDescription(value);
  };
  const checkPost = () => {
    if (title.length > 3 && description.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  useEffect(() => {
    checkPost();
  });

  let sendData = {
    productName: title,
    content: description,
    cateId: categoryInput,
    price: priceInput,
    rentStart: startDateInput,
    rentEnd: endDateInput,
  };
  // productId: param.id,

  const editProductData = () => {
    if (title === "" || description === "") {
      alert("제목/내용을 적어주세요!");
    } else {
      let formData = new FormData();
      formData.append(
        "requestDto",
        new Blob([JSON.stringify(sendData)], { type: "application/json" })
      );
      formData.append("multipartFile", sendImage);
        console.log(sendData)
        console.log(formData)
      dispatch(updateProducts([formData,{productId:param.id}]));
    };
  };

  return (
    <Layout>
      <StyledEditProductContainer>
        <StyledEditProductForm encType="multipart/form-data">
          <StyledPostingHeadWrap>
            <StyledFormImageInputWrap>
              <StyledImageLabel
                htmlFor="inputFile"
                onClick={(e) => imageLengthCheck(e)}
              >
                사진 업로드
              </StyledImageLabel>
              <StyledImageInput
                id="inputFile"
                type="file"
                multiple="multiple"
                maxSize={5242880}
                onChange={(e) => {
                  fileChange(e.target.files[0]);
                }}
              />
              <StyledProductImagetWrap>
                <SyltedImageView
                  src={imgView === undefined ? defaultImg : imgView}
                  alt="이미지 미리보기"
                  onClick={() => {
                    initImage(imgView[0], 0);
                  }}
                />
                {/* <StyledProductSubImageWrap>
                  {imgView.map((item, index) => {
                    if (index !== 0) {
                      return (
                        <StyledProductSubImage
                          key={index}
                          src={item}
                          onClick={() => {
                            initImage(item, index);
                          }}
                        />
                      );
                    }
                  })}
                </StyledProductSubImageWrap> */}
                <StyledDeleteImg>
                  사진을 누르면 삭제돼요!
                  <br />
                  (사진 등록 최대 4장)
                </StyledDeleteImg>
              </StyledProductImagetWrap>
            </StyledFormImageInputWrap>
            <StyledImageSource>
              imageSource: "https://icons8.com/icon/85123/expand-arrow Expand
              Arrow icon by https://icons8.com Icons8"
            </StyledImageSource>
            <StyledOptionInputs>
              <StyledCategorySelector
                defaultValue="noneData"
                onChange={(e) => {
                  categoryChange(e.target.value);
                }}
              >
                <StyledCategoryOptions value="noneData" disabled>
                  상품 종류를 골라주세요!
                </StyledCategoryOptions>
                <StyledCategoryOptions value="1">
                  디지털기기
                </StyledCategoryOptions>
                <StyledCategoryOptions value="2">공구</StyledCategoryOptions>
                <StyledCategoryOptions value="3">
                  생활가전
                </StyledCategoryOptions>
                <StyledCategoryOptions value="4">잡화</StyledCategoryOptions>
                <StyledCategoryOptions value="5">
                  스포츠/레저
                </StyledCategoryOptions>
                <StyledCategoryOptions value="6">
                  취미/게임/음반
                </StyledCategoryOptions>
                <StyledCategoryOptions value="7">도서</StyledCategoryOptions>
                <StyledCategoryOptions value="8">기타</StyledCategoryOptions>
              </StyledCategorySelector>
              <StyledPriceWrap>
                <StyledPriceInput
                  id="itemPrice"
                  type="number"
                  placeholder="가격"
                  maxlength="8"
                  onChange={(e) => {
                    priceChange(e.target.value);
                  }}
                />
                <StyledPriceLabel htmlFor="itemPrice">원</StyledPriceLabel>
              </StyledPriceWrap>
              <StyledDateWrap>
                <StyledStartLabel htmlFor="">렌탈시작일 : </StyledStartLabel>
                <StyledDateInput
                  type="date"
                  onChange={(e) => {
                    startDateChange(e.target.value);
                  }}
                />
              </StyledDateWrap>
              <StyledDateWrap>
                <StyledEndLabel htmlFor="">렌탈마감일 : </StyledEndLabel>
                <StyledDateInput
                  type="date"
                  onChange={(e) => {
                    endDateChange(e.target.value);
                  }}
                />
              </StyledDateWrap>
            </StyledOptionInputs>
          </StyledPostingHeadWrap>

          <StyledPostTitle
            type="text"
            placeholder="제목은 4글자 이상 적어주세요!"
            onChange={(e) => {
              titleChange(e.target.value);
            }}
          />
          <StyledDescription
            id=""
            cols="30"
            rows="10"
            placeholder="내용을 입력해주세요!"
            onChange={(e) => {
              discriptionChange(e.target.value);
            }}
          />
          <StyledButtonBox>
            <StyledGoBackButton>뒤로가기</StyledGoBackButton>
            <StyledFormButton
              disabled={disabled}
              type="button"
              onClick={editProductData}
            >
              수정하기
            </StyledFormButton>
          </StyledButtonBox>
        </StyledEditProductForm>
      </StyledEditProductContainer>
    </Layout>
  );
};

const StyledEditProductContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const StyledEditProductForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 900px;

  padding: 40px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  border-radius: 10px;
`;

const StyledPostingHeadWrap = styled.div`
  display: flex;
  justify-content: space-around;

  height: 250px;
`;

const StyledFormImageInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;

const StyledImageLabel = styled.label`
  width: 120px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: rgb(71, 181, 255);
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;

const StyledImageInput = styled.input`
  display: none;
`;

const StyledProductImagetWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
`;

const SyltedImageView = styled.img`
  margin-top: 20px;
  /* margin-right: 70px; */

  width: 250px;
  height: 250px;
`;

const StyledProductSubImageWrap = styled.div``;
const StyledProductSubImage = styled.img`
  width: 150px;
  height: 150px;
`;

const StyledDeleteImg = styled.span`
  margin-top: 20px;
  width: 80px;
  height: 25px;
  line-height: 25px;

  color: rgb(71, 181, 255);
  cursor: pointer;
  border-radius: 10px;

  text-align: center;
`;

const StyledOptionInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledCategorySelector = styled.select`
  width: 250px;

  appearance: none;
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDVyUU%2FbtrMqr4wuGA%2FezDgk3FguiKztDPowbkwB0%2Fimg.png")
    no-repeat 95% 50%;
  padding: 10px;
  padding-right: 20px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 16px;
  border-radius: 10px;

  border: 1px solid rgb(71, 181, 255);
  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }
`;
const StyledImageSource = styled.span`
  display: none;
`;
const StyledCategoryOptions = styled.option``;

const StyledPriceWrap = styled.div``;
const StyledPriceInput = styled.input`
  border: 1px solid rgb(71, 181, 255);
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }
`;
const StyledPriceLabel = styled.label`
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const StyledDateWrap = styled.div``;
const StyledStartLabel = styled.label``;
const StyledEndLabel = styled.label``;
const StyledDateInput = styled.input`
  color: rgb(40, 108, 153);
  border-color: rgb(71, 181, 255);
  border-radius: 5px;

  &::-webkit-clear-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
  &::-webkit-calender-picker-indicator {
    color: red;
  }
`;

const StyledPostTitle = styled.input`
  margin-top: 170px;
  padding: 10px;
  width: 400px;
  height: 30px;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;

  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }
`;
const StyledDescription = styled.textarea`
  margin-top: 30px;
  padding: 15px;
  height: 300px;
  overflow: hidden;
  resize: none;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;

  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const StyledGoBackButton = styled.button`
  width: 150px;
  height: 40px;
  margin-right: 50px;
  background-color: white;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;
  color: rgb(71, 181, 255);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: rgb(71, 181, 255);
    transition: color 0.1s ease-in-out 0s;
    transition: background-color 0.1s ease-in-out 0s;
  }
`;

const StyledFormButton = styled.button`
  width: 150px;
  height: 40px;
  margin-right: 50px;
  background-color: rgb(71, 181, 255);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: #317eb139;
    cursor: default;
  }
`;
