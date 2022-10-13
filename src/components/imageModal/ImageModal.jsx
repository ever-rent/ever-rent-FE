import { useEffect, useState } from "react";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { ImageMobileModal } from "./ImageMobileModal";

export const ImageModal = ({
  showImages,
  imageArray,
  imageIndex,
  closeImage,
}) => {
  console.log(imageIndex);
  console.log(imageArray);

  let idxIndex = imageArray?.length + 2;
  let idxRight = 620;

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
    <>
      <Desktop>
        <StyledBackground
          style={!showImages ? { display: "none" } : null}
          onClick={closeImage}
        >
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
            <StyledSlideBox
              style={{
                width: `${idxIndex * 620}px`,
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
                <img
                  key={index}
                  src={`${imgFirstString}${item}`}
                  alt="slideImg"
                />
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
      </Desktop>
      <Mobile>
        <ImageMobileModal
          showImages={showImages}
          imageArray={imageArray}
          imageIndex={imageIndex}
          closeImage={closeImage}
        />
      </Mobile>
    </>
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
  width: 600px;
  height: 600px;
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
    width: 600px;
    height: 600px;
    margin-left: 10px;
    margin-right: 10px;
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
  left: 25%;
  top: 40%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  transition: 0.3s ease-in;

  &.next {
    position: fixed;
    left: 76%;
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
    display: grid;
    align-items: center;
    grid-gap: 1vw;
    grid-template-columns: 7vw 7vw 7vw 7vw 7vw;
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
