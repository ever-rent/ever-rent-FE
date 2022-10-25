import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";
export const SlideShow = () => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 2500;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      <Desktop>
        <StyledSlideshow className="slideshow">
          <StyledSlideShowSlider
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {colors.map((backgroundColor, index) => (
              <StyledSlide
                className="slide"
                key={index}
                style={{ backgroundColor }}
              />
            ))}
          </StyledSlideShowSlider>
          <StyledSlideShowDots className="slideshowDots">
            {colors.map((_, idx) => (
              <StyledSlideShowDot
                key={idx}
                className={index === idx ? "active" : ""}
                onClick={() => {
                  setIndex(idx);
                }}
              ></StyledSlideShowDot>
            ))}
          </StyledSlideShowDots>
        </StyledSlideshow>
      </Desktop>

      <Mobile>
        <StyledMobileSlideshow className="slideshow">
          <StyledSlideShowSlider
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {colors.map((backgroundColor, index) => (
              <StyledMobileSlide
                className="slide"
                key={index}
                style={{ backgroundColor }}
              />
            ))}
          </StyledSlideShowSlider>
          <StyledSlideShowDots className="slideshowDots">
            {colors.map((_, idx) => (
              <StyledSlideShowDot
                key={idx}
                className={index === idx ? "active" : ""}
                onClick={() => {
                  setIndex(idx);
                }}
              ></StyledSlideShowDot>
            ))}
          </StyledSlideShowDots>
        </StyledMobileSlideshow>
      </Mobile>
    </>
  );
};

const StyledSlideshow = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 1000px;
  margin-bottom: 50px;
`;

const StyledSlideShowSlider = styled.div`
  transition: ease 1000ms;
  white-space: nowrap;
`;

const StyledSlide = styled.div`
  display: inline-block;
  height: 300px;
  width: 100%;
  border-radius: 40px;
`;

/* Buttons */

const StyledSlideShowDots = styled.div`
  text-align: center;
`;

const StyledSlideShowDot = styled.div`
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin: 15px 7px 0px;
  background-color: #c4c4c4;
  &.active {
    background-color: #6a0dad;
  }
`;

const StyledMobileSlideshow = styled.div`
  margin: 30px auto;
  overflow: hidden;
  max-width: 480px;
`;

const StyledMobileSlide = styled.div`
  display: inline-block;
  height: 190px;
  width: 100%;
  border-radius: 40px;
`;
