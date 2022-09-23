import React from "react";
import styled from "styled-components";
import { WishItem } from "./WishItem";

export const WishList = () => {
  return (
    <StyledList>
      <WishItem />
    </StyledList>
  );
};

const StyledList = styled.div``;
