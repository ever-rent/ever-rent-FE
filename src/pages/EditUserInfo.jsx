import { Layout } from "../components/layout/Layout";
import { useState } from "react";
import styled from "styled-components";

import Swal from "sweetalert2";

export const EditUserInfo = () => {
  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";

  // 회원정보 state
  const [userNickName, setUserNickName] = useState("닉네임");
  const [userLocation, setUserLocation] = useState("주소1");
  const [userSubLocation, setUserSubLocation] = useState("주소2");
  const [categoryInput, setCategoryInput] = useState("");

  // 이미지 처리
  const [imgView, setImgView] = useState();
  const [sendImage, setSendImage] = useState();

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

  // 회원탈퇴
  const deleteUser = () => {
    Swal.fire({
      title: "정말 탈퇴하실건가요?",
      text: "탈퇴한 정보는 다시 복구시킬 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "#d33",
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        // 탈퇴처리 예정
      }
    });
  };

  // formData
  let sendData = {
    testcode: "testcode",
  };

  // 회원정보 수정
  const editMyInfo = () => {
    Swal.fire({
      title: "변경 내용을 저장할까요?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "rgb(184, 221, 247)",
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        // 회원정보 수정 예정
      }
    });
  };

  return (
    <Layout>
      <StyledEditInfoContainer>
        <StyledAddProductForm>
          <StyledInfoTop>
            <StyledInfoEdit>회원정보수정</StyledInfoEdit>
            <StyledDeleteUser onClick={deleteUser}>탈퇴하기</StyledDeleteUser>
          </StyledInfoTop>
          <StyledInfoWrap>
            <StyledInfoName>이메일</StyledInfoName>
            <StyledInfoSubWrap>
              <StyledEditInput
                type="text"
                defaultValue="이메일디폴트자리"
                disabled
              />
              <StyledEditSubName>
                {" "}
                * 이메일을 변경하시려면 운영자에게 이메일을 보내주세요.
              </StyledEditSubName>
            </StyledInfoSubWrap>
          </StyledInfoWrap>
          <StyledInfoWrap>
            <StyledInfoName
              defaultValue={userNickName}
              onClick={(e) => {
                setUserNickName(e.target.value);
              }}
            >
              닉네임
            </StyledInfoName>
            <StyledInfoSubWrap>
              <StyledEditInput type="text" />
              <StyledEditSubName>
                * 닉네임은 두 글자 이상 적어주세요!
              </StyledEditSubName>
            </StyledInfoSubWrap>
          </StyledInfoWrap>
          <StyledInfoWrap>
            <StyledInfoName
              defaultValue={userLocation}
              onClick={(e) => {
                setUserLocation(e.target.value);
              }}
            >
              주소1
            </StyledInfoName>
            <StyledInfoSubWrap>
              <StyledEditInput type="text" />
              <StyledEditSubName>
                * 주 거래지역을 입력해주세요!
              </StyledEditSubName>
            </StyledInfoSubWrap>
          </StyledInfoWrap>
          <StyledInfoWrap>
            <StyledInfoName
              defaultValue={userSubLocation}
              onClick={(e) => {
                setUserSubLocation(e.target.value);
              }}
            >
              주소2
            </StyledInfoName>
            <StyledInfoSubWrap>
              <StyledEditInput type="text" />
              <StyledEditSubName>
                * 주 거래지역을 입력해주세요!
              </StyledEditSubName>
            </StyledInfoSubWrap>
          </StyledInfoWrap>
          <StyledInfoWrap>
            <StyledInfoName>관심카테고리</StyledInfoName>
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
              <StyledCategoryOptions value="3">생활가전</StyledCategoryOptions>
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
          </StyledInfoWrap>
          <StyledInfoWrap>
            <StyledInfoName>프로필 이미지</StyledInfoName>
            <StyledInfoSubWrap>
              <StyledImageLabel htmlFor="inputFile">
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
              <SyltedImageView
                src={imgView === undefined ? defaultImg : imgView}
                alt="이미지 미리보기"
              />
            </StyledInfoSubWrap>
          </StyledInfoWrap>
          <StyledButtons>
            <StyledCancelButton>홈으로</StyledCancelButton>
            <StyledSubmitButton onClick={editMyInfo}>
              수정하기
            </StyledSubmitButton>
          </StyledButtons>
        </StyledAddProductForm>
      </StyledEditInfoContainer>
    </Layout>
  );
};

const StyledEditInfoContainer = styled.section`
  margin-top: 100px;
  margin-bottom:100px;
  display: flex;
  justify-content: center;
`;

const StyledAddProductForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;

  padding: 40px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  border-radius: 10px;
`;

const StyledInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledInfoEdit = styled.h2``;
const StyledDeleteUser = styled.span`
  color: #b8b8b8;
  text-decoration-line: underline;
  cursor: pointer;
`;

const StyledInfoWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const StyledInfoName = styled.span`
  margin-right: 20px;
`;
const StyledEditSubName = styled.span`
  color: #a8a8a8;
  font-size: 12px;
`;
const StyledInfoSubWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledEditInput = styled.input`
  width: 250px;
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

const StyledCategoryOptions = styled.option``;

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
const SyltedImageView = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 250px;
  height: 250px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCancelButton = styled.button`
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
const StyledSubmitButton = styled.button`
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
