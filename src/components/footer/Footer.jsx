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
  position: absolute;
  bottom: 0;
`;
