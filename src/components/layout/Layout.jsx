import React from "react";
import styled from "styled-components";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      {children}
      <Footer />
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  max-width: 1024px;
  height: 100%;
  margin: 0 auto;
`;
