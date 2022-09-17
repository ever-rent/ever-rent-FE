import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeaderTop>
      <h1></h1>
    </StyledHeaderTop>
  );
};

const StyledHeaderTop = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: black;

  color:white;
`;
