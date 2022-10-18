import styled from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "../components/layout/Layout";
import { useDispatch } from "react-redux";
import { updateProducts } from "../redux/modules/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { LocationModal } from "../components/location/LocationModal";
import { RangeCalrendar } from "../components/calrendar/RangeCalrendar";
import { LocationSearch } from "../components/location/LocationSearch";
import { imgFirstString } from "../server/api";

import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";
import { Desktop, Mobile } from "../Hooks/MideaQuery";

export const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const [data, setData] = useState();
  const fetchDetail = async () => {
    console.log("패치데이터", param);
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/products/${param.id}`)
      .then((response) => {
        setData(response);
        console.log(response);
      });
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  const editDataSet = [data?.data.data];
  const editData = editDataSet?.filter((element) => element)[0];

  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";

  const [imgView, setImgView] = useState([]);
  const [sendImage, setSendImage] = useState([]);

  useEffect(() => {
    let urlArray = [];
    for (let i = 0; i < editData?.imgUrlArray.length; i++) {
      urlArray.push(`${imgFirstString}${editData?.imgUrlArray[i]}`);
    }
    console.log(urlArray);
    setImgView(urlArray);
    setSendImage(urlArray);
  }, [editData]);

  const imageLengthCheck = (e) => {
    if (imgView.length === 10) {
      e.preventDefault();
      Swal.fire({
        text: "이미 10장이예요!",
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

  // Send Data
  const [categoryInput, setCategoryInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [tradeLocation, setTradeLocation] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [disabled, setDisabled] = useState(false);

  const startEndDays = (start, end) => {
    let startDay = start;
    let endDay = end;

    let sYaer = startDay?.getFullYear();
    let sMonth = startDay?.getMonth() + 1;
    let sDay = startDay?.getDate();
    let eYaer = endDay?.getFullYear();
    let eMonth = endDay?.getMonth() + 1;
    let eDay = endDay?.getDate();

    setStartDateInput(`${sYaer}-${sMonth}-${sDay}`);
    setEndDateInput(`${eYaer}-${eMonth}-${eDay}`);
  };
  console.log(startDateInput);
  console.log(endDateInput);

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

  const locationCheck = (value) => {
    setLocation(value);
  };

  let sendData = {
    productName: title,
    content: description,
    cateId: categoryInput,
    price: priceInput,
    location: location,
    mapLocation: tradeLocation,
    rentStart: startDateInput,
    rentEnd: endDateInput,
  };
  // productId: param.id,

  const editProductData = () => {
    if (
      title === "" ||
      description === "" ||
      categoryInput === "" ||
      priceInput === "" ||
      tradeLocation === "" ||
      endDateInput === ""
    ) {
      alert("게시글을 모두 작성해주세요!");
    } else {
      Swal.fire({
        title: "변경 내용을 저장할까요?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "rgb(71, 181, 255)",
        cancelButtonColor: "rgb(184, 221, 247)",
        confirmButtonText: "수정하기",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append(
            "requestDto",
            new Blob([JSON.stringify(sendData)], { type: "application/json" })
          );

          for (let i = 0; i < sendImage.length; i++) {
            console.log(sendImage[i]);
            formData.append("multipartFiles", sendImage[i]);
          }

          dispatch(updateProducts([formData, { productId: param.id }]));
        }
      });
    }
    console.log(sendData);
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  // 위치정보 상세검색 모달창
  const [showMapSearch, setShowMapSearch] = useState(false);
  const closeSearchModal = () => {
    setShowMapSearch(false);
  };

  const searchMapInput = (value) => {
    setTradeLocation(value);
  };

  return (
    <>
      <Desktop>
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
                      fileChange(e.target.files);
                    }}
                  />
                  <StyledProductImagetWrap>
                    <SyltedImageView
                      src={imgView[0] === undefined ? defaultImg : imgView[0]}
                      alt="이미지 미리보기"
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
                  imageSource: "https://icons8.com/icon/85123/expand-arrow
                  Expand Arrow icon by https://icons8.com Icons8"
                </StyledImageSource>
                <StyledOptionInputs>
                  <div>
                    <StyledCategorySelector
                      defaultValue={categoryInput}
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
                      <StyledCategoryOptions value="2">
                        공구
                      </StyledCategoryOptions>
                      <StyledCategoryOptions value="3">
                        생활가전
                      </StyledCategoryOptions>
                      <StyledCategoryOptions value="4">
                        잡화
                      </StyledCategoryOptions>
                      <StyledCategoryOptions value="5">
                        스포츠/레저
                      </StyledCategoryOptions>
                      <StyledCategoryOptions value="6">
                        취미/게임/음반
                      </StyledCategoryOptions>
                      <StyledCategoryOptions value="7">
                        도서
                      </StyledCategoryOptions>
                      <StyledCategoryOptions value="8">
                        기타
                      </StyledCategoryOptions>
                    </StyledCategorySelector>
                    <StyledWriteOnly>*</StyledWriteOnly>
                  </div>
                  <StyledPriceWrap>
                    <StyledPriceInput
                      id="itemPrice"
                      type="text"
                      placeholder="가격"
                      defaultValue={priceInput}
                      maxlength="8"
                      onChange={(e) => {
                        setPriceInput(e.target.value);
                      }}
                    />
                    <StyledPriceLabel htmlFor="itemPrice">원</StyledPriceLabel>
                    <StyledPriceData> / 일</StyledPriceData>
                    <StyledWriteOnly>*</StyledWriteOnly>
                  </StyledPriceWrap>
                  <StyledDateWrap>
                    <RangeCalrendar startEndDays={startEndDays} />
                  </StyledDateWrap>
                </StyledOptionInputs>
              </StyledPostingHeadWrap>

              <StyledPostLocation
                type="text"
                placeholder="거래 장소를 적어주세요! (필수!)"
                defaultValue={tradeLocation}
                onClick={() => setShowMapSearch(true)}
                onChange={(e) => {
                  setTradeLocation(e.target.value);
                }}
                value={tradeLocation}
              />
              <LocationSearch
                showMapSearch={showMapSearch}
                closeSearchModal={closeSearchModal}
                location={tradeLocation}
                locationCheck={locationCheck}
                searchMapInput={searchMapInput}
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
                locationCheck={locationCheck}
              />
              <StyledPostTitle
                type="text"
                placeholder="제목은 4글자 이상 적어주세요!"
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <StyledDescription
                id=""
                cols="30"
                rows="10"
                placeholder="내용을 입력해주세요!"
                defaultValue={description}
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
                  onClick={editProductData}
                >
                  수정하기
                </StyledFormButton>
              </StyledButtonBox>
            </StyledEditProductForm>
          </StyledEditProductContainer>
        </Layout>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <Layout>
          <StyledMobileContainer>
            <StyledMobileProductForm encType="multipart/form-data">
              <StyledMobilePostHeadWrap>
                <StyledMobileFormImageInputWrap>
                  <StyledMobileImageLabel
                    htmlFor="inputFile"
                    onClick={(e) => imageLengthCheck(e)}
                  >
                    사진 업로드
                  </StyledMobileImageLabel>
                  <StyledMobileImageInput
                    id="inputFile"
                    type="file"
                    multiple="multiple"
                    maxSize={5242880}
                    onChange={(e) => {
                      fileChange(e.target.files);
                    }}
                  />
                  <StyledMobileProductImagetWrap>
                    <SyltedMobileImageView
                      src={imgView[0] === undefined ? defaultImg : imgView[0]}
                      alt="이미지 미리보기"
                      onClick={() => {
                        initImage(imgView[0], 0);
                      }}
                    />
                    <StyledMobileProductSubImageWrap>
                      {imgView[1] !== undefined
                        ? imgView
                            .filter((v, index) => index !== 0)
                            .map((item, index) => (
                              <StyledMobileProductSubImage
                                key={index}
                                src={item}
                                onClick={() => {
                                  initImage(item, index);
                                }}
                              />
                            ))
                        : null}
                    </StyledMobileProductSubImageWrap>
                    <StyledMobileDeleteImg>
                      사진을 누르면 삭제돼요!
                      <br />
                      (사진 등록 최대 10장)
                    </StyledMobileDeleteImg>
                  </StyledMobileProductImagetWrap>
                </StyledMobileFormImageInputWrap>
                <StyledImageSource>
                  imageSource: "https://icons8.com/icon/85123/expand-arrow
                  Expand Arrow icon by https://icons8.com Icons8"
                </StyledImageSource>
              </StyledMobilePostHeadWrap>
              <StyledMobileOptionInputs>
                <div>
                  <StyledMobileCategorySelector
                    defaultValue={categoryInput}
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
                    <StyledCategoryOptions value="2">
                      공구
                    </StyledCategoryOptions>
                    <StyledCategoryOptions value="3">
                      생활가전
                    </StyledCategoryOptions>
                    <StyledCategoryOptions value="4">
                      잡화
                    </StyledCategoryOptions>
                    <StyledCategoryOptions value="5">
                      스포츠/레저
                    </StyledCategoryOptions>
                    <StyledCategoryOptions value="6">
                      취미/게임/음반
                    </StyledCategoryOptions>
                    <StyledCategoryOptions value="7">
                      도서
                    </StyledCategoryOptions>
                    <StyledCategoryOptions value="8">
                      기타
                    </StyledCategoryOptions>
                  </StyledMobileCategorySelector>
                  <StyledWriteOnly>*</StyledWriteOnly>
                </div>
                <StyledPriceWrap>
                  <StyledMobilePriceInput
                    id="itemPrice"
                    type="text"
                    placeholder="가격"
                    defaultValue={priceInput}
                    maxlength="8"
                    onChange={(e) => {
                      setPriceInput(e.target.value);
                    }}
                  />
                  <StyledMobilePriceLabel htmlFor="itemPrice">
                    원
                  </StyledMobilePriceLabel>
                  <StyledMobilePriceData> / 일</StyledMobilePriceData>
                  <StyledWriteOnly>*</StyledWriteOnly>
                </StyledPriceWrap>
                <StyledDateWrap>
                  <RangeCalrendar startEndDays={startEndDays} />
                </StyledDateWrap>
              </StyledMobileOptionInputs>

              <StyledMobilePostLocation
                type="text"
                placeholder="거래 장소를 적어주세요!"
                defaultValue={tradeLocation}
                onClick={() => setShowMapSearch(true)}
                onChange={(e) => {
                  setTradeLocation(e.target.value);
                }}
                value={tradeLocation}
              />
              <LocationSearch
                showMapSearch={showMapSearch}
                closeSearchModal={closeSearchModal}
                location={tradeLocation}
                locationCheck={locationCheck}
                searchMapInput={searchMapInput}
              />
              <StyledMobileLocationBtn
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                위치확인
              </StyledMobileLocationBtn>
              <p style={{ fontSize: "12px" }}>
                지도에 나온 장소가 원하는 곳이 아닌 경우, 도로명 주소로
                입력해보세요!
              </p>
              <LocationModal
                showModal={showModal}
                closeModal={closeModal}
                location={tradeLocation}
                locationCheck={locationCheck}
              />
              <StyledMobilePostTitle
                type="text"
                placeholder="제목은 4글자 이상 적어주세요!"
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <StyledMobileDescription
                id=""
                cols="30"
                rows="10"
                placeholder="내용을 입력해주세요!"
                defaultValue={description}
                maxLength={500}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <StyledMobileButtonBox>
                <StyledMobileGoBackButton
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  홈으로
                </StyledMobileGoBackButton>
                <StyledMobileFormButton
                  disabled={disabled}
                  type="button"
                  onClick={editProductData}
                >
                  수정하기
                </StyledMobileFormButton>
              </StyledMobileButtonBox>
            </StyledMobileProductForm>
          </StyledMobileContainer>
        </Layout>
      </Mobile>
    </>
  );
};

const StyledEditProductContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;

  animation: editProductFadein 1.5s;
  & {
    @keyframes editProductFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledEditProductForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 700px;

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
`;

const StyledCategorySelector = styled.select`
  width: 250px;

  appearance: none;
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDVyUU%2FbtrMqr4wuGA%2FezDgk3FguiKztDPowbkwB0%2Fimg.png")
    no-repeat 95% 50%;
  padding: 10px;
  padding-right: 20px;
  margin-top: 150px;
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

const StyledPostLocation = styled.input`
  margin-top: 320px;
  padding: 10px;
  width: 250px;
  height: 30px;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;

  &:focus {
    outline: 1px solid rgb(71, 181, 255);
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
  margin-left:25px;
  margin-right: 25px;
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
  margin-left:25px;
  margin-right: 25px;
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

const StyledWriteOnly = styled.span`
  margin-left: 10px;
  color: red;
`;

// for Mobile

const StyledMobileContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;

  animation: editProductFadein 1.5s;
  & {
    @keyframes editProductFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledMobileProductForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;

  padding: 40px;
  /* box-shadow: 1px 1px 5px 1px rgb(71, 181, 255); */
  border-radius: 10px;
  margin-bottom: 50px;
`;

const StyledMobilePostHeadWrap = styled.div`
  display: flex;
  justify-content: space-around;

  height: 250px;
`;

const StyledMobileFormImageInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;

const StyledMobileImageLabel = styled.label`
  width: 120px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: rgb(71, 181, 255);
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;

const StyledMobileImageInput = styled.input`
  display: none;
`;

const StyledMobileProductImagetWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 450px;
`;

const SyltedMobileImageView = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 300px;
`;

const StyledMobileProductSubImageWrap = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px;
  grid-gap: 10px;
  justify-items: center;
`;
const StyledMobileProductSubImage = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledMobileDeleteImg = styled.span`
  margin-top: 20px;
  width: 200px;
  height: 25px;
  line-height: 25px;

  color: rgb(71, 181, 255);
  border-radius: 10px;

  text-align: center;
`;

const StyledMobileOptionInputs = styled.div`
  margin-top: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledMobileCategorySelector = styled.select`
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
const StyledMobileImageSource = styled.span`
  display: none;
`;
const StyledMobileCategoryOptions = styled.option``;

const StyledMobilePriceWrap = styled.div``;
const StyledMobilePriceData = styled.span`
  margin-right: 10px;
`;
const StyledMobilePriceInput = styled.input`
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
const StyledMobilePriceLabel = styled.label`
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const StyledMobileDateWrap = styled.div``;
const StyledMobileStartLabel = styled.label``;
const StyledMobileEndLabel = styled.label``;
const StyledMobileDateInput = styled.input`
  margin-top: 40px;
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

const StyledMobilePostLocation = styled.input`
  margin-top: 50px;
  padding: 10px;
  width: 250px;
  height: 30px;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;

  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }
`;
const StyledMobileLocationBtn = styled.button`
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

const StyledMobilePostTitle = styled.input`
  margin-top: 30px;
  padding: 10px;
  width: 300px;
  height: 30px;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;

  &:focus {
    outline: 1px solid rgb(71, 181, 255);
  }
`;

const StyledMobileDescription = styled.textarea`
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

const StyledMobileButtonBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  margin-top: 50px;
`;

const StyledMobileGoBackButton = styled.button`
  width: 150px;
  height: 40px;
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

const StyledMobileFormButton = styled.button`
  width: 150px;
  height: 40px;
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
