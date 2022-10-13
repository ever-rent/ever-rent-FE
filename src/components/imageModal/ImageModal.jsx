import { useState } from "react";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";

export const ImageModal = ({
  showImages,
  imageArray,
  imageIndex,
  closeImage,
}) => {
  console.log(imageIndex);
  console.log(imageArray);

  const [imageNum, setImageNum] = useState(imageIndex);

  const [idxPersent, setIdxPersent] = useState(0);

  let idxRight = -1 * (100 / imageArray?.length);
  let idxLeft = idxRight * -1;
  console.log("idx퍼센트", idxPersent);
  console.log("idx라이트", idxRight);
  console.log("idx레프트", idxLeft);

  const imageChange = (index) => {
    setImageNum(index);
    setIdxPersent(idxRight * imageNum);
  };
  console.log(imageNum);

  const goPrev = (e) => {
    e.stopPropagation();
    if (imageNum !== 0) {
      imageNum !== 0
        ? setImageNum(imageNum - 1)
        : setImageNum(imageArray.length - 1);
      setIdxPersent(idxPersent + idxLeft);
    }
  };
  const goNext = (e) => {
    e.stopPropagation();
    if (imageNum !== imageArray.length - 1) {
      imageNum !== imageArray.length - 1
        ? setImageNum(imageNum + 1)
        : setImageNum(0);

      setIdxPersent(idxPersent + idxRight);
    }
  };

  return (
    <StyledBackground
      style={!showImages ? { display: "none" } : null}
      onClick={closeImage}
    >
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledSlideBox
          style={{
            width: `${imageArray?.length * 100}%`,
            // transform: `translateX(${(imageArray?.length*50)})`
            transform: `translateX(${idxPersent}%)`,
          }}
        >
          {imageArray?.map((item, index) => (
            <img key={index} src={`${imgFirstString}${item}`} alt="slideImg" />
          ))}
        </StyledSlideBox>
      </StyledModalContainer>
      <StyledPrevNext
        className="prev"
        onClick={(e) => {
          goPrev(e);
        }}
      >
        {"<"}
      </StyledPrevNext>
      <StyledPrevNext
        className="next"
        onClick={(e) => {
          goNext(e);
        }}
      >
        {">"}
      </StyledPrevNext>
      <StyledSubContainer onClick={(e) => e.stopPropagation()}>
        <ul>
          {imageArray?.map((item, index) => {
            if (index === imageNum) {
              return (
                <li
                  key={index}
                  onClick={() => {
                    imageChange(index);
                  }}
                >
                  <img
                    className="checkedImg"
                    src={`${imgFirstString}${item}`}
                    alt="현재 이미지"
                  />
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  onClick={() => {
                    imageChange(index);
                  }}
                >
                  <img src={`${imgFirstString}${item}`} alt="현재 이미지" />
                </li>
              );
            }
          })}
        </ul>
      </StyledSubContainer>
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;

  & ul,
  li {
    list-style: none;
  }
`;

const StyledModalContainer = styled.div`
  width: 50vw;
  height: 50vh;
  border-radius: 10px;
  overflow: hidden;

  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;

const StyledSlideBox = styled.div`
  display: flex;
  transition: 0.4s;

  & img {
    width: 50vw;
    height: 50vh;
    border: 2px solid rgb(150, 212, 253);
    border-radius: 10px;
    text-align: center;
  }
`;

const StyledPrevNext = styled.button`
  width: 4vw;
  height: 4vh;
  border-radius: 50%;
  border: 1px solid rgb(150, 212, 253);
  color: white;
  font-size: 1.8rem;
  background-color: rgb(150, 212, 253);

  position: fixed;
  left: 18%;
  top: 40%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  transition: 0.3s ease-in;

  &.next {
    position: fixed;
    left: 82%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    background-color: rgb(71, 181, 255);
  }
  &:active {
    animation: prevNext 0.6s;
    @keyframes prevNext {
      from {
        width: 3.9vw;
        height: 3.9vh;
      }
      to {
        width: 4vw;
        height: 4vh;
      }
    }
  }
`;

const StyledSubContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  & ul {
    display: flex;
    align-items: center;
  }
  & .checkedImg {
    border: 3px solid rgb(71, 181, 255);
  }
  & img {
    width: 7vw;
    height: 7vh;
    margin-right: 1vw;
    border-radius: 10px;
  }
`;
