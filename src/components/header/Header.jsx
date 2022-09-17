import React from "react";
import styled from "styled-components";


export const Header = () => {
  return (
    <StyledHeaderTop>
      <div>
      <StyledLogoImg src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcIaEmP%2FbtrMnmILkqF%2FTxtrB71zUMzMY9Z2iiHqcK%2Fimg.png" />
      </div>
    </StyledHeaderTop>
  );
};

const StyledHeaderTop = styled.header`
  position: absolute;
  top: 0px;
  left: 0px;
  
  width: 100%;
  height:78px;


  
`;

const StyledLogoImg = styled.img`
  width:300px;
  height:80px;
`