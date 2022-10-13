import React, { useEffect } from "react";
import styled from "styled-components";

export const RecentItem = () => {
  let get_local = JSON.parse(localStorage.getItem("recentItem"));

  // useEffect(() => {
  //   get_local === null ? localStorage.setItem("recentItem", JSON.stringify([])) : null;
  // }, []);

  return (
    <StyledRecentItemContainer>
      <div></div>
    </StyledRecentItemContainer>
  );
};

const StyledRecentItemContainer = styled.div`
  position: absolute;
  right: 0;
`;
