import styled from "styled-components";
import Swal from "sweetalert2";

import { useState, useEffect } from "react";

export const PostReport = ({ prodictId }) => {
  // props 전달 예정
  const [showModal, setShowModal] = useState(false);

  const [sendReason, setSendReason] = useState("도배/광고성 게시글");
  const [etcDisabled, setEtcDisabled] = useState(true);

  const [isLogedIn, setIsLogedIn] = useState(true);

  // 로그인 처리 예정
  // useEffect(() => {
  //  if(localStorage.getItem("accessToken")!==null){
  //   setIsLogedIn(true);
  //  }
  // }, []);

  const loginCheck = () => {
    isLogedIn !== true
      ? Swal.fire({
          title: "로그인 먼저 해주세요!",
          icon: "warning",
        })
      : setShowModal(true);
  };
  const etcCheck = () => {
    setEtcDisabled(true);
  };
  const etcOn = () => {
    setEtcDisabled(false);
    setSendReason("");
  };

  const sendReport = (e) => {
    e.preventDefault();
    console.log(sendReason);
    if (sendReason === "") {
      Swal.fire({
        title: "신고 사유를 입력해주세요",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "해당 유저의 신고 접수가 완료되었습니다.",
        icon: "success",
      });
      setShowModal(false);
    }
  };

  return (
    <>
      <StyledReportAlert
        onClick={() => {
          loginCheck();
          setSendReason("도배/광고성 게시글");
        }}
      >
        신고하기
      </StyledReportAlert>
      {showModal !== true ? null : (
        <StyledReportModal
          onClick={() => {
            setShowModal(false);
          }}
        >
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
            <StyledReportTitle>신고 사유를 선택해주세요</StyledReportTitle>
            <StyledReportForm className="reportData">
              <StyledRadioLabel htmlFor="report1">
                <div>
                  <input
                    onClick={etcCheck}
                    onChange={(e) => {
                      console.log(setSendReason(e.target.value));
                    }}
                    id="report1"
                    type="radio"
                    name="report"
                    value="도배/광고성 게시글"
                    defaultChecked={true}
                  />
                </div>
                <span>도배/광고성 게시글</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report2">
                <div>
                  <input
                    onClick={etcCheck}
                    onChange={(e) => {
                      console.log(setSendReason(e.target.value));
                    }}
                    id="report2"
                    type="radio"
                    name="report"
                    value="폭력적, 선정적 게시글"
                  />
                </div>
                <span>폭력적, 선정적 게시글</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report3">
                <div>
                  <input
                    onClick={etcCheck}
                    onChange={(e) => {
                      console.log(setSendReason(e.target.value));
                    }}
                    id="report3"
                    type="radio"
                    name="report"
                    value="비정상적인 거래 시도"
                  />
                </div>
                <span>비정상적인 거래 시도</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report4">
                <div>
                  <input
                    onClick={etcCheck}
                    onChange={(e) => {
                      console.log(setSendReason(e.target.value));
                    }}
                    id="report4"
                    type="radio"
                    name="report"
                    value="렌탈거래와 무관한 게시글"
                  />
                </div>
                <span>렌탈거래와 무관한 게시글</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report5">
                <div>
                  <input
                    onClick={etcOn}
                    id="report5"
                    type="radio"
                    name="report"
                    // value="기타"
                  />
                </div>
                <span>기타</span>
                <StyledEtcInput
                  onChange={(e) => {
                    setSendReason(e.target.value);
                  }}
                  type="text"
                  disabled={etcDisabled}
                />
              </StyledRadioLabel>
            </StyledReportForm>
            <StyledButtonWrap>
              <StyledReportButton
                type="button"
                onClick={(e) => {
                  sendReport(e);
                }}
              >
                신고하기
              </StyledReportButton>
              <StyledCancelButton
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                취소
              </StyledCancelButton>
            </StyledButtonWrap>
          </StyledModalContainer>
        </StyledReportModal>
      )}
    </>
  );
};

const StyledReportAlert = styled.span`
  font-size: 14px;
  color: gray;
  cursor: pointer;

  
`;

const StyledReportTitle = styled.div`
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
`;

const StyledReportModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
`;

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 400px;
  padding: 20px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  text-align: center;

  animation: reportFadein 0.5s;
  &{
    @keyframes reportFadein {
      from{
        opacity:0;
      }
      to{
        opacity:1;
      }
    }
  }
`;

const StyledReportForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;

  & label {
    width: 280px;
  }
`;

const StyledRadioLabel = styled.label`
  display: flex;
  justify-content: center;
  justify-content: flex-start;
  margin-top: 15px;


  & input[type="radio"],
  input[type="radio"]:checked {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin-right: 10px;
  }
  & input[type="radio"] {
    border: 2px solid rgb(71, 181, 255);
  }
  & input[type="radio"]:checked {
    background-color: rgb(71, 181, 255);
  }
  & span{
    margin-right:10px;
  }
`;

const StyledEtcInput = styled.input`
  border-radius:5px;
  border:1px solid rgb(71, 181, 255);
  &:focus{
    outline-color:rgb(71, 181, 255);
  }
`

const StyledButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const StyledReportButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: rgb(255, 83, 83);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: rgb(255, 0, 0);
  }
`;
const StyledCancelButton = styled.button`
  width: 100px;
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
