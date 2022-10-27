import React from "react";
import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { BorrowCommonItem } from "./BorrowCommonItem";

export const BorrowCommonList = (props) => {
  const list = props.props;
  const index = props.index;

  // console.log("props>>", props);
  // console.log("props.props>>", props.props);
  // console.log("index", index);
  return (
    <>
      <Desktop>
        <StyledListContainer>
          {list?.map((item) => {
            return <BorrowCommonItem item={item} key={item.id} index={index} />;
          })}
        </StyledListContainer>
      </Desktop>

      <Mobile>
        <StyledMobileListContainer>
          {list?.map((item) => {
            return <BorrowCommonItem item={item} key={item.id} index={index} />;
          })}
        </StyledMobileListContainer>
      </Mobile>
    </>
  );
};

const StyledListContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 80px;
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

const StyledMobileListContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 80px;
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
