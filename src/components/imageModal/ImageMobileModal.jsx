import { useEffect, useState } from "react";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";

export const ImageMobileModal = ({
  showImages,
  imageArray,
  imageIndex,
  closeImage,
}) => {
  console.log(imageIndex);
  console.log(imageArray);

  let idxIndex = imageArray?.length + 2;
  let idxRight = 370;

  const [imageNum, setImageNum] = useState(imageIndex);
  const [idxPx, setIdxPx] = useState(0);
  const [idxInit, setIdxInit] = useState(0.25);

  console.log("idx픽셀", idxPx);
  console.log("idx라이트", idxRight);

  useEffect(() => {
    setTimeout(() => {
      setIdxPx(idxPx - idxRight);
    }, 200);
  }, []);

  const imageChange = (index) => {
    setImageNum(index);

    setIdxPx(-idxRight * (imageNum + 1));
  };
  console.log(imageNum);

  const goPrev = (e) => {
    e.stopPropagation();
    if (imageNum !== 0) {
      setImageNum(imageNum - 1);
      setIdxPx(idxPx + idxRight);
    } else {
      setImageNum(imageArray.length - 1);
      setIdxPx(idxPx + idxRight);
      setTimeout(() => {
        setIdxInit(0);
        setIdxPx(imageArray.length * -idxRight);
      }, 300);
    }
    setIdxInit(0.25);
  };
  const goNext = (e) => {
    e.stopPropagation();
    if (imageNum !== imageArray.length - 1) {
      setImageNum(imageNum + 1);
      setIdxPx(idxPx - idxRight);
    } else {
      setImageNum(0);
      setIdxPx(idxPx - idxRight);
      setTimeout(() => {
        setIdxInit(0);
        setIdxPx(idxRight * -1);
      }, 300);
    }
    setIdxInit(0.25);
  };

  return (
    <StyledBackground
      style={!showImages ? { display: "none" } : null}
      onClick={closeImage}
    >
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledSlideBox
          style={{
            width: `${idxIndex * 370}px`,
            transform: `translateX(${idxPx}px)`,
            transition: `${idxInit}s`,
          }}
        >
          <img
            src={`${imgFirstString}${
              imageArray?.filter(
                (e, index) => index === imageArray?.length - 1
              )[0]
            }`}
            alt="cloneEnd"
          />
          {imageArray?.map((item, index) => (
            <img key={index} src={`${imgFirstString}${item}`} alt="slideImg" />
          ))}
          <img
            src={`${imgFirstString}${
              imageArray?.filter((e, index) => index === 0)[0]
            }`}
            alt="cloneStart"
          />
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
    padding-left: 4px;
  }
`;

const StyledModalContainer = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;

  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;

const StyledSlideBox = styled.div`
  display: flex;

  & img {
    width: 350px;
    height: 350px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    text-align: center;
  }
`;

const StyledPrevNext = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgb(150, 212, 253);
  color: white;
  font-size: 1.8rem;
  background-color: rgb(150, 212, 253);

  position: fixed;
  left: 7%;
  top: 40%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  transition: 0.3s ease-in;

  &.next {
    position: fixed;
    left: 93%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  &:active {
    animation: prevNext 0.6s;
    @keyframes prevNext {
      from {
        width: 38px;
        height: 38px;
      }
      to {
        width: 38px;
        height: 38px;
      }
    }
  }
`;

const StyledSubContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 75%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  & ul {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-gap: 10px;
    grid-template-columns: 50px 50px 50px 50px 50px;
  }
  & .checkedImg {
    border: 3px solid rgb(71, 181, 255);
  }
  & img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 10px;
  }
`;
