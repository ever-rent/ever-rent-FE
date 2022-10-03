import styled from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout/Layout";
import { useDispatch } from "react-redux";
import { addProducts } from "../redux/modules/productSlice";
import { useNavigate } from "react-router-dom";

import { LocationModal } from "../components/location/LocationModal";

import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";

  const [imgView, setImgView] = useState([]);
  const [sendImage, setSendImage] = useState([]);

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

  const imageLengthCheck = (e) => {
    if (imgView.length === 10) {
      e.preventDefault();
      Swal.fire({
        text: "이미 10장이네요ㅠ",
        icon: "warning",
      });
    }
  };

  const fileChange = (fileBlob) => {
    console.log(fileBlob);
    actionImgCompress(fileBlob[fileBlob.length - 1]);
    const reader = new FileReader();
    for (let i = 0; i < fileBlob.length; i++) {
      reader.readAsDataURL(fileBlob[i]);
      reader.onloadend = () => {
        let imageSubs = reader.result;
        setImgView([...imgView].concat(imageSubs));
      };
    }
  };

  const actionImgCompress = async (fileSrc) => {
    console.log("압축 시작");
    console.log("압축전", fileSrc);

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(fileSrc, options);
      console.log("압축후", compressedFile);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        // 변환 완료!
        const base64data = reader.result;

        // formData 만드는 함수
        sendfileCompression(base64data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const sendfileCompression = (listItem) => {
    console.log(listItem);
    const byteString = atob(listItem.split(",")[1]);

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {
      type: "image/jpeg",
    });
    const file = new File([blob], "image.jpg");
    console.log(file);
    setSendImage([...sendImage].concat(file));
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
  const [tradeLocation, setTradeLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [disabled, setDisabled] = useState(true);

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
    // tradeLocation : tradeLocation,
    rentStart: startDateInput,
    rentEnd: endDateInput,
  };

  const addProductPost = () => {
    if (title === "" || description === "") {
      alert("제목/내용을 적어주세요!");
    } else {
      Swal.fire({
        title: "저장할래?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "rgb(71, 181, 255)",
        cancelButtonColor: "rgb(184, 221, 247)",
        confirmButtonText: "저장하기",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append(
            "requestDto",
            new Blob([JSON.stringify(sendData)], { type: "application/json" })
          );
          formData.append("multipartFile", sendImage);
          dispatch(addProducts(formData));
          navigate("/");
        }
      });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <StyledAddProductContainer>
        <StyledAddProductForm encType="multipart/form-data">
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
                  fileChange(e.target.files);
                }}
              />
              <StyledProductImagetWrap>
                <SyltedImageView
                  src={imgView[0] === undefined ? defaultImg : imgView[0]}
                  alt="메인이미지 미리보기"
                  onClick={() => {
                    initImage(imgView[0], 0);
                  }}
                />
                <StyledProductSubImageWrap>
                  {imgView[1] !== undefined
                    ? imgView
                        .filter((v, index) => index !== 0)
                        .map((item, index) => (
                          <StyledProductSubImage
                            key={index}
                            src={item}
                            onClick={() => {
                              initImage(item, index);
                            }}
                          />
                        ))
                    : null}
                </StyledProductSubImageWrap>
                <StyledDeleteImg>
                  사진을 누르면 삭제돼요!
                  <br />
                  (사진 등록 최대 10장)
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
                  setCategoryInput(e.target.value);
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
                  type="text"
                  placeholder="가격"
                  maxlength="8"
                  onChange={(e) => {
                    setPriceInput(e.target.value);
                  }}
                />
                <StyledPriceLabel htmlFor="itemPrice">원</StyledPriceLabel>
                <StyledPriceData> / 일</StyledPriceData>
              </StyledPriceWrap>
              <StyledDateWrap>
                <StyledStartLabel htmlFor="">렌탈시작일 : </StyledStartLabel>
                <StyledDateInput
                  type="date"
                  onChange={(e) => {
                    setStartDateInput(e.target.value);
                  }}
                />
              </StyledDateWrap>
              <StyledDateWrap>
                <StyledEndLabel htmlFor="">렌탈마감일 : </StyledEndLabel>
                <StyledDateInput
                  type="date"
                  onChange={(e) => {
                    setEndDateInput(e.target.value);
                  }}
                />
              </StyledDateWrap>
            </StyledOptionInputs>
          </StyledPostingHeadWrap>

          <StyledPostLocation
            type="text"
            placeholder="거래 장소를 적어주세요!"
            onChange={(e) => {
              setTradeLocation(e.target.value);
            }}
          />
          <StyledLocationBtn
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            위치확인
          </StyledLocationBtn>
          <p style={{ fontSize: "12px" }}>
            지도에 나온 장소가 원하는 곳이 아닌 경우, 도로명 주소로
            입력해보세요!
          </p>
          <LocationModal
            showModal={showModal}
            closeModal={closeModal}
            location={tradeLocation}
          />
          <StyledPostTitle
            type="text"
            placeholder="제목은 4글자 이상 적어주세요!"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <StyledDescription
            id=""
            cols="30"
            rows="10"
            placeholder="내용을 입력해주세요!"
            maxLength={500}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <StyledButtonBox>
            <StyledGoBackButton
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로
            </StyledGoBackButton>
            <StyledFormButton
              disabled={disabled}
              type="button"
              onClick={addProductPost}
            >
              작성하기
            </StyledFormButton>
          </StyledButtonBox>
        </StyledAddProductForm>
      </StyledAddProductContainer>
    </Layout>
  );
};

const StyledAddProductContainer = styled.div`
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

const StyledAddProductForm = styled.form`
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

const StyledPostingHeadWrap = styled.div`
  display: flex;
  justify-content: space-around;

  height: 250px;

  & {
    @media all and (max-width: 767px) {
      flex-direction: column;
      align-items: center;
      height: 70vh;
    }
    @media all and (max-width: 480px) {
    }
  }
`;

const StyledFormImageInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;

  & {
    @media all and (max-width: 767px) {
      height: 50vh;
    }
    @media all and (max-width: 480px) {
    }
  }
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
  width: 400px;
  height: 450px;
`;

const SyltedImageView = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 300px;
`;

const StyledProductSubImageWrap = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px;
  grid-gap: 10px;
  justify-items: center;
`;
const StyledProductSubImage = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledDeleteImg = styled.span`
  margin-top: 20px;
  width: 200px;
  height: 25px;
  line-height: 25px;

  color: rgb(71, 181, 255);
  border-radius: 10px;

  text-align: center;
`;

const StyledOptionInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & {
    @media all and (max-width: 767px) {
      margin-top: 30px;
    }
    @media all and (max-width: 480px) {
    }
  }
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
const StyledPriceData = styled.span`
  margin-right: 10px;
`;
const StyledPriceInput = styled.input`
  width: 180px;
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

const StyledDateWrap = styled.div`
  & {
    @media all and (max-width: 767px) {
      margin-top: 10px;
    }
    @media all and (max-width: 480px) {
    }
  }
`;
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

const StyledPostLocation = styled.input`
  margin-top: 250px;
  padding: 10px;
  width: 250px;
  height: 30px;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;

  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }

  & {
    @media all and (max-width: 767px) {
      margin-top: 50px;
    }
    @media all and (max-width: 480px) {
    }
  }
`;
const StyledLocationBtn = styled.button`
  margin-top: 10px;
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
`;

const StyledPostTitle = styled.input`
  margin-top: 30px;
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
  height: 200px;
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
