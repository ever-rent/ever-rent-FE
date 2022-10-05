import styled from "styled-components";
import Swal from "sweetalert2";

import { useState } from "react";

export const UserReport = ({ targetNicename }) => {
  // 닉네임으로 props 전달 예정
  const [showModal, setShowModal] = useState(true);

  const [sendReason, setSendReason] = useState("");

  const sendReport = (e) => {
    e.preventDefault();
  };

console.log(sendReason)

  return (
    <>
      <StyledReportAlert
        onClick={() => {
          setShowModal(true);
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
              <StyledRadioLabel htmlFor="report1" >
                <div>
                  <input onChange={(e)=>{console.log(setSendReason(e.target.value))}} id="report1" type="radio" name="report" value="타인에게 불쾌감을 주는 닉네임"/>
                </div>
                <span>타인에게 불쾌감을 주는 닉네임</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report2">
                <div>
                  <input onChange={(e)=>{console.log(setSendReason(e.target.value))}} id="report2" type="radio" name="report" value="스팸/도배 계정 의심"/>
                </div>
                <span>스팸/도배 계정 의심</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report3">
                <div>
                  <input onChange={(e)=>{console.log(setSendReason(e.target.value))}} id="report3" type="radio" name="report" value="비정상적인 거래 시도"/>
                </div>
                <span>비정상적인 거래 시도</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report4">
                <div>
                  <input onChange={(e)=>{console.log(setSendReason(e.target.value))}} id="report4" type="radio" name="report" value="부적절한 프로필 사진"/>
                </div>
                <span>부적절한 프로필 사진</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report5">
                <div>
                  <input onChange={(e)=>{console.log(setSendReason(e.target.value))}} id="report5" type="radio" name="report" value="기타"/>
                </div>
                <span>기타</span>
              </StyledRadioLabel>
              <button
                onClick={(e) => {
                  sendReport(e);
                }}
              >
                신고하기
              </button>
            </StyledReportForm>
            <button>취소</button>
          </StyledModalContainer>
        </StyledReportModal>
      )}
    </>
  );
};

const StyledReportAlert = styled.span``;

const StyledReportTitle = styled.div`
  margin-top: 30px;
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
  width: 400px;
  height: 400px;
  padding: 20px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  text-align: center;
`;

const StyledReportForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const StyledRadioLabel = styled.label`
  display: flex;
  justify-content: center;

  margin-top: 20px;

  
`;
