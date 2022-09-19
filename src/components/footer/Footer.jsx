import React from "react";
import styled from "styled-components";

export const Footer = () => {

  

  return (
    <StyledFooter>
      <h1>Footer</h1>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  margin-top: 250px;
  background-color: #F7F9FA;
  width: 100%;
  height: 150px;
  position: relative;
  bottom: 0;
  left: 0;
`;
