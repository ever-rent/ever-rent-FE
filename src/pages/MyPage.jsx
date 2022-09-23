import React from "react";
import styled from "styled-components";
import { Layout } from "../components/layout/Layout";
import { RentalBar } from "../components/myPage/RentalBar";
import { Profile } from "../components/myPage/Profile";

export const MyPage = () => {
  return (
    <Layout>
      <StyledGridBox>
        <StyledProfileBox>
          <Profile />
        </StyledProfileBox>
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
  grid-template-columns: 250px 670px;
  justify-content: space-between;
  /* align-items: center; */
`;

const StyledProfileBox = styled.div`
  /* border: 1px solid red; */
  /* background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee12 100%); */
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 30px 0 0 0;
  height: 400px;
  grid-row: 1/3;
`;
