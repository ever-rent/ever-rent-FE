import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";

export const SlideShow = () => {
  const navigate = useNavigate();
  const eventImg = [
    require("../../../image/eventOne1.png"),
    require("../../../image/eventTwo1.png"),
  ];

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
          prevIndex === eventImg.length - 1 ? 0 : prevIndex + 1
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
            {eventImg.map((eventImg, index) => (
              <StyledSlide
                className="slide"
                key={index}
                // style={{ backgroundColor }}
                src={eventImg}
                onClick={() => navigate(`/event/${index}`)}
              />
            ))}
          </StyledSlideShowSlider>
          <StyledSlideShowDots className="slideshowDots">
            {eventImg.map((_, idx) => (
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
            {eventImg.map((eventImg, index) => (
              <StyledMobileSlide
                className="slide"
                key={index}
                // style={{ backgroundColor }}
                src={eventImg}
                onClick={() => navigate(`/event/${index}`)}
              />
            ))}
          </StyledSlideShowSlider>
          <StyledSlideShowDots className="slideshowDots">
            {eventImg.map((_, idx) => (
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

const StyledSlide = styled.img`
  display: inline-block;
  height: 300px;
  width: 100%;
  border-radius: 40px;
  cursor: pointer;
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

const StyledMobileSlide = styled.img`
  display: inline-block;
  height: 150px;
  width: 100%;
  border-radius: 20px;
  cursor: pointer;
`;
