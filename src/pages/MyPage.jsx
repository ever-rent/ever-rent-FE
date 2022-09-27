import React from "react";
import styled from "styled-components";
import { Layout } from "../components/layout/Layout";
import { RentalBar } from "../components/myPage/RentalBar";
import { Profile } from "../components/myPage/Profile";

export const MyPage = () => {
  return (
    <Layout>
      <StyledGridBox>
        <Profile />
        <RentalBar />
      </StyledGridBox>
    </Layout>
  );
};

const StyledGridBox = styled.div`
  /* border: 1px solid blue; */
  width: 1024px;
  height: 100%;
  margin: 60px auto;
  display: grid;
  /* position: relative; */
  grid-template-columns: 250px 700px;
  justify-content: space-between;
  /* align-items: center; */
`;
