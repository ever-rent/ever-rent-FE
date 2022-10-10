import React from "react";
import styled from "styled-components";
import { BestProductItem } from "./BestProductItem";

export const BestProducts = () => {
  return (
    <>
      <StyledContainer>
        <StyledGridBox>
          <BestProductItem />
          <BestProductItem />
          <BestProductItem />
          <BestProductItem />
        </StyledGridBox>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  border: 1px solid green;
  max-width: 1024px;
  margin: 30px auto 70px auto;
`;

const StyledGridBox = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  width: 1024px;
  margin: auto;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  /* column-gap: 40px; */
`;
