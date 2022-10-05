import styled from "styled-components";
import Swal from "sweetalert2";

import { useState } from "react";

export const PostReport = ({ prodictId }) => {
  // 닉네임으로 props 전달 예정
  const [showModal, setShowModal] = useState(true);

  const [sendReason, setSendReason] = useState("");
  const [etcDisabled, setEtcDisabled] = useState(true);

  const etcCheck = ()=>{
    etcDisabled===true?setEtcDisabled(false):setEtcDisabled(true)
    
  }

  const sendReport = (e) => {
    e.preventDefault();
    console.log(sendReason);
    Swal.fire({
        title: '해당 게시글의 신고 접수가 완료되었습니다.',
        icon: 'success',
      })
  };


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
                    value="선정적/폭력적인 게시글"
                  />
                </div>
                <span>선정적/폭력적인 게시글</span>
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
                    value="부적절한 사진"
                  />
                </div>
                <span>부적절한 사진</span>
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
                    value="부적절한 프로필 사진"
                  />
                </div>
                <span>반인륜적인 게시글</span>
              </StyledRadioLabel>
              <StyledRadioLabel htmlFor="report5" >
                <div>
                  <input
                    onChange={etcCheck}
                    id="report5"
                    type="radio"
                    name="report"
                    value="기타"
                  />
                </div>
                <span>기타</span>
                <input type="text" disabled={etcDisabled}/>
              </StyledRadioLabel>
            </StyledReportForm>
            <StyledButtonWrap>
              <StyledReportButton
                onClick={(e) => {
                  sendReport(e);
                }}
              >
                신고하기
              </StyledReportButton>
              <StyledCancelButton onClick={()=>{setShowModal(false)}}>취소</StyledCancelButton>
            </StyledButtonWrap>
          </StyledModalContainer>
        </StyledReportModal>
      )}
    </>
  );
};

const StyledReportAlert = styled.span`
    cursor: pointer;
`;

const StyledReportTitle = styled.div`
  margin-top: 30px;
  font-size:20px;
  font-weight:bold;
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

  & {

  }
`;

const StyledRadioLabel = styled.label`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;




const StyledButtonWrap = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top:40px;
`

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

  &:hover{
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
