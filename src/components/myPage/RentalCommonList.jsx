import React from "react";
import styled from "styled-components";
import { RentalCommonItem } from "./RentalCommonItem";

export const RentalCommonList = (props) => {
  const list = props.props;
  const index = props.index;

  // console.log("props>>", props);
  // console.log("props.props>>", props.props);
  // console.log("index", index);

  return (
    <StyledListContainer>
      {list?.map((item) => {
        return <RentalCommonItem item={item} key={item.id} index={index} />;
      })}
    </StyledListContainer>
  );
};

const StyledListContainer = styled.div`
  /* border: 1px solid red; */
  margin-top: 20px;
  animation: fadein 0.8s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
