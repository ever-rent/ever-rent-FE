import { Layout } from "../components/layout/Layout";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { SelectAddress } from "../components/selectAddress/SelectAddress";

import { Desktop, Mobile } from "../Hooks/MideaQuery";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { auth } from "../server/core/instance";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { mypageAPI } from "../server/api";

export const EditUserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultImg =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcKDiD%2FbtrMtFuk9L9%2FkARIsatJxzfvNkf7H35QhK%2Fimg.png";

  // 회원정보 state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const { state } = useLocation();

  console.log(state);
  useEffect(() => {
    console.log(state);
    setEmail(state.email);
    setUserNickName(state.memberName);
    setMainAddress(state.mainAddress);
    setSubAddress(state.subAddress);
    // setCategoryInput(state.cateId);
  }, [state]);

  const [confirmStatus, setConfirmStatus] = useState(null);
  useEffect(() => {
    if (password === passwordConfirm && password.length > 0) {
      setConfirmStatus(true);
    }
    if (password !== passwordConfirm) {
      setConfirmStatus(false);
    }
  }, [password, passwordConfirm]);

  // 회원탈퇴
  const handleDeleteMember = () => {
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
      mypageAPI
        .deleteMember()
        .then(() => {
          localStorage.removeItem("email");
          localStorage.removeItem("memberId");
          localStorage.removeItem("memberName");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          if (result.value) {
            Swal.fire({
              title: "회원탈퇴가 완료되었습니다.",
              icon: "success",
              confirmButtonColor: "rgb(71, 181, 255)",
              confirmButtonText: "확인",
            }).then((result) => {
              if (result.value) {
                navigate("/");
              }
            });
          }
        })
        .catch((err) => {
          console.dir(err);
          Swal.fire({
            title: "회원탈퇴에 실패하였습니다.",
            icon: "error",
            confirmButtonColor: "rgb(71, 181, 255)",
            confirmButtonText: "확인",
          });
        });
    });
  };

  // formData
  let sendData = {
    email: email,
    password: passwordConfirm,
    memberName: userNickName,
    mainAddress: mainAddress,
    subAddress: subAddress,
    cateId: categoryInput,
  };
  console.log(sendData)

  // 회원정보 수정
  const editMyInfo = () => {
    if (
      // password === "" ||
      // passwordConfirm === "" ||
      userNickName === "" ||
      mainAddress === "" ||
      categoryInput === "" ||
      confirmStatus === false
    ) {
      Swal.fire({
        title: "회원 정보를 확인해주세요",
        icon: "warning",
        confirmButtonColor: "rgb(71, 181, 255)",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.value) {
          // 회원정보 수정 예정
        }
      });
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
          formData.append("requestDto", sendData);
          auth.put("/updateInfo", sendData);
          Swal.fire({
            title: "저장완료!",
            icon: "success",
            confirmButtonColor: "rgb(71, 181, 255)",
            confirmButtonText: "확인",
          });
        }
      });
    }
  };

  // 비밀번호 체크여부
  const [passwordCheck, setPasswordCheck] = useState(true);
  const passwordCheckChange = () => {
    passwordCheck ? setPasswordCheck(false) : setPasswordCheck(true);
    passwordCheck ? setConfirmStatus(null) : setConfirmStatus(null);
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <Layout>
      <Desktop>
        <StyledEditInfoContainer>
          <StyledAddProductForm>
            <StyledInfoTop>
              <StyledInfoEdit>회원정보수정</StyledInfoEdit>
              <StyledDeleteUser onClick={handleDeleteMember}>
                탈퇴하기
              </StyledDeleteUser>
            </StyledInfoTop>
            <StyledInfoWrap>
              <StyledInfoName>이메일</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledEditInput type="text" defaultValue={email} disabled />
                <StyledEditSubName>
                  {" "}
                  * 이메일을 변경하시려면 운영자에게 이메일을 보내주세요.
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledInfoWrap>
            <StyledInfoWrap>
              <StyledInfoName>닉네임</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledEditInput
                  type="text"
                  defaultValue={userNickName}
                  onChange={(e) => {
                    setUserNickName(e.target.value);
                  }}
                />
                <StyledEditSubName>
                  * 닉네임은 두 글자 이상 적어주세요! (최대 14자)
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledInfoWrap>
            <StyledInfoWrap>
              <StyledInfoName>비밀번호 변경</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledLabelWrap>
                  <StyledEditInput
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    disabled={passwordCheck ? true : false}
                  />
                  <StyledNonPassword htmlFor="nonPassword">
                    비밀번호 변경 x
                  </StyledNonPassword>
                  <input
                    id="nonPassword"
                    type="checkbox"
                    checked={passwordCheck}
                    onClick={passwordCheckChange}
                  />
                </StyledLabelWrap>
                <StyledEditSubName>
                  * 비밀번호는 8자리 이상 입력해주세요!
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledInfoWrap>
            <StyledInfoWrap>
              <StyledInfoName>비밀번호 확인</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledEditInput
                  type="password"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  value={passwordConfirm}
                  disabled={passwordCheck ? true : false}
                />
                <StyledEditSubName
                  style={confirmStatus === null ? null : { display: "none" }}
                >
                  * 변경할 비밀번호와 똑같이 입력해주세요
                </StyledEditSubName>
                <StyledEditSubName
                  style={
                    confirmStatus === true
                      ? { color: "#28d928" }
                      : { display: "none" }
                  }
                >
                  * 비밀번호가 일치합니다.
                </StyledEditSubName>
                <StyledEditSubName
                  style={
                    confirmStatus === false
                      ? { color: "red" }
                      : { display: "none" }
                  }
                >
                  * 비밀번호를 확인해주세요.
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledInfoWrap>
            <StyledInfoWrap>
              <StyledInfoName>주소1</StyledInfoName>
              <StyledAdressSelect>
                <SelectAddress setAddress={setMainAddress} />
              </StyledAdressSelect>
              <StyledInfoSubWrap>
                <StyledEditSubName>
                  * 주 거래지역을 입력해주세요! (필수)
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledInfoWrap>
            <StyledInfoWrap>
              <StyledInfoName>주소2</StyledInfoName>
              <StyledAdressSelect>
                <SelectAddress setAddress={setSubAddress} />
              </StyledAdressSelect>
              <StyledInfoSubWrap>
                <StyledEditSubName>
                  * 주 거래지역을 입력해주세요! (선택)
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
            </StyledInfoWrap>
            <StyledButtons>
              <StyledCancelButton>홈으로</StyledCancelButton>
              <StyledSubmitButton onClick={editMyInfo}>
                수정하기
              </StyledSubmitButton>
            </StyledButtons>
          </StyledAddProductForm>
        </StyledEditInfoContainer>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledEditInfoContainer>
          <StyledMobileAddProductForm>
            <StyledMobileInfoTop>
              <StyledInfoEdit>회원정보수정</StyledInfoEdit>
              <StyledDeleteUser onClick={handleDeleteMember}>
                탈퇴하기
              </StyledDeleteUser>
            </StyledMobileInfoTop>
            <StyledMobileInfoWrap>
              <StyledInfoName>이메일</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledMobileEditInput
                  type="text"
                  defaultValue={email}
                  disabled
                />
                <StyledEditSubName>
                  {" "}
                  * 이메일을 변경하시려면 운영자에게 이메일을 보내주세요.
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledMobileInfoWrap>
            <StyledMobileInfoWrap>
              <StyledInfoName>닉네임</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledMobileEditInput
                  type="text"
                  defaultValue={userNickName}
                  onChange={(e) => {
                    setUserNickName(e.target.value);
                  }}
                />
                <StyledEditSubName>
                  * 닉네임은 두 글자 이상 적어주세요! (최대 14자)
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledMobileInfoWrap>
            <StyledMobileInfoWrap>
              <StyledInfoName>비밀번호 변경</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledLabelWrap>
                  <StyledMobileEditInput
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    disabled={passwordCheck ? true : false}
                  />
                  <StyledNonPassword htmlFor="nonPassword">
                    비밀번호 변경 x
                  </StyledNonPassword>
                  <input
                    id="nonPassword"
                    type="checkbox"
                    checked={passwordCheck}
                    onClick={passwordCheckChange}
                  />
                </StyledLabelWrap>
                <StyledEditSubName>
                  * 비밀번호는 8자리 이상 입력해주세요!
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledMobileInfoWrap>
            <StyledMobileInfoWrap>
              <StyledInfoName>비밀번호 확인</StyledInfoName>
              <StyledInfoSubWrap>
                <StyledMobileEditInput
                  type="password"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  value={passwordConfirm}
                  disabled={passwordCheck ? true : false}
                />
                <StyledEditSubName
                  style={confirmStatus === null ? null : { display: "none" }}
                >
                  * 변경할 비밀번호와 똑같이 입력해주세요
                </StyledEditSubName>
                <StyledEditSubName
                  style={
                    confirmStatus === true
                      ? { color: "#28d928" }
                      : { display: "none" }
                  }
                >
                  * 비밀번호가 일치합니다.
                </StyledEditSubName>
                <StyledEditSubName
                  style={
                    confirmStatus === false
                      ? { color: "red" }
                      : { display: "none" }
                  }
                >
                  * 비밀번호를 확인해주세요.
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledMobileInfoWrap>
            <StyledMobileInfoWrap>
              <StyledInfoName>주소1</StyledInfoName>
              <StyledMobileAdressSelect>
                <SelectAddress setAddress={setMainAddress} />
              </StyledMobileAdressSelect>
              <StyledInfoSubWrap>
                <StyledEditSubName>
                  * 주 거래지역을 입력해주세요! (필수)
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledMobileInfoWrap>
            <StyledMobileInfoWrap>
              <StyledInfoName>주소2</StyledInfoName>
              <StyledMobileAdressSelect>
                <SelectAddress setAddress={setSubAddress} />
              </StyledMobileAdressSelect>
              <StyledInfoSubWrap>
                <StyledEditSubName>
                  * 주 거래지역을 입력해주세요! (선택)
                </StyledEditSubName>
              </StyledInfoSubWrap>
            </StyledMobileInfoWrap>
            <StyledMobileInfoWrap>
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
            </StyledMobileInfoWrap>
            <StyledButtons>
              <StyledCancelButton>홈으로</StyledCancelButton>
              <StyledSubmitButton onClick={editMyInfo}>
                수정하기
              </StyledSubmitButton>
            </StyledButtons>
          </StyledMobileAddProductForm>
        </StyledEditInfoContainer>
      </Mobile>
    </Layout>
  );
};

const StyledEditInfoContainer = styled.section`
  margin-top: 100px;
  margin-bottom: 100px;
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
  margin-left: 10px;
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

const StyledLabelWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StyledNonPassword = styled.label`
  margin-left: 20px;
  font-size: 12px;
`;

const StyledAdressSelect = styled.div`
  & select {
    width: 200px;
    height:50px;

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

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCancelButton = styled.button`
  width: 150px;
  height: 40px;
  margin-left: 25px;
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
const StyledSubmitButton = styled.button`
  width: 150px;
  height: 40px;
  margin-left: 25px;
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

// for Mobile

const StyledMobileAddProductForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;

  padding: 40px;
  border-radius: 10px;
`;

const StyledMobileInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const StyledMobileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;
`;

const StyledMobileEditInput = styled.input`
  width: 200px;
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

const StyledMobileAdressSelect = styled.div`
  & select {
    width: 120px;
    height:40px;

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
  }
`;

// const StyledCategorySelector = styled.select`
//   width: 250px;

//   appearance: none;
//   background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDVyUU%2FbtrMqr4wuGA%2FezDgk3FguiKztDPowbkwB0%2Fimg.png")
//     no-repeat 95% 50%;
//   padding: 10px;
//   padding-right: 20px;
//   margin-top: 30px;
//   margin-bottom: 15px;
//   font-size: 16px;
//   border-radius: 10px;

//   border: 1px solid rgb(71, 181, 255);
//   &:focus {
//     outline: 1px solid rgb(71, 181, 255);
//   }
// `;

// const StyledCategoryOptions = styled.option``;

// const StyledButtons = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const StyledCancelButton = styled.button`
//   width: 150px;
//   height: 40px;
//   margin-right: 50px;
//   background-color: white;
//   border: 1px solid rgb(71, 181, 255);
//   border-radius: 10px;
//   color: rgb(71, 181, 255);
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover {
//     color: white;
//     background-color: rgb(71, 181, 255);
//     transition: color 0.1s ease-in-out 0s;
//     transition: background-color 0.1s ease-in-out 0s;
//   }
// `;
// const StyledSubmitButton = styled.button`
//   width: 150px;
//   height: 40px;
//   margin-right: 50px;
//   background-color: rgb(71, 181, 255);
//   border: none;
//   border-radius: 10px;
//   color: white;
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;

//   &:disabled {
//     background-color: #317eb139;
//     cursor: default;
//   }
// `;
