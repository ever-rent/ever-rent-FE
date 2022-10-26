import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putMyProfileImage } from "../../redux/modules/mypageSlice";
import Swal from "sweetalert2";

export const ProfileImg = ({ showProfile, closeProfileimgFix, profileImg }) => {
  const dispatch = useDispatch();

  // 이미지 처리
  const [imgView, setImgView] = useState();
  const [sendImage, setSendImage] = useState();
  const [sendImageCheck, setSendImageCheck] = useState(true);

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

  useEffect(() => {
    sendImage !== undefined
      ? setSendImageCheck(false)
      : setSendImageCheck(true);
  }, [sendImage]);

  const editProfileImage = () => {
    let formData = new FormData();
    Swal.fire({
      title: "저장할까요?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "rgb(184, 221, 247)",
      confirmButtonText: "저장하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        formData.append("multipartFile", sendImage);
        dispatch(putMyProfileImage(formData));
      }
      Swal.fire({
        title: "저장완료!",
        icon: "success",
        confirmButtonColor: "rgb(71, 181, 255)",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.value) {
          setSendImage();
          closeProfileimgFix();
        }
      });
    });
  };

  return (
    <StyledModalBackground
      onClick={closeProfileimgFix}
      style={!showProfile ? { display: "none" } : null}
    >
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledModal>
          <h3>프로필 수정</h3>
          <StyledInfoSubWrap>
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
              src={sendImage === undefined ? profileImg : imgView}
              alt="이미지 미리보기"
            />
            <StyledImageLabel htmlFor="inputFile">이미지 선택</StyledImageLabel>
          </StyledInfoSubWrap>
          <StyledButtonsWrap>
            <StyledSubButtons
              className="cancle"
              onClick={() => {
                setSendImage();
                closeProfileimgFix();
              }}
            >
              변경취소
            </StyledSubButtons>
            <StyledSubButtons
              onClick={editProfileImage}
              disabled={sendImageCheck}
            >
              수정하기
            </StyledSubButtons>
          </StyledButtonsWrap>
        </StyledModal>
      </StyledModalContainer>
    </StyledModalBackground>
  );
};

const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  animation: profileImgFadein 0.6s;
  & {
    @keyframes profileImgFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  cursor: auto;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 350px;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

const StyledInfoSubWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  transition: 0.6s;

  &:hover {
    background-color: rgb(28, 164, 255);
  }
`;

const StyledImageInput = styled.input`
  display: none;
`;
const SyltedImageView = styled.img`
  margin-bottom: 20px;

  width: 200px;
  height: 200px;
  border-radius: 70%;
  cursor: pointer;
  overflow: hidden;
  ::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StyledButtonsWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 350px;

  & .cancle {
    width: 100px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: white;
    color: rgb(71, 181, 255);
    border: 1px solid rgb(71, 181, 255);
    cursor: pointer;
    border-radius: 10px;
    transition: 0.6s;
    &:hover {
      color: white;
      background-color: rgb(71, 181, 255);
    }
  }
`;
const StyledSubButtons = styled.button`
  width: 100px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: rgb(71, 181, 255);
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  transition: 0.6s;

  &:disabled {
    background-color: #dadada;
    &:hover {
      background-color: #dadada;
    }
  }

  &:hover {
    background-color: rgb(28, 164, 255);
  }
`;
