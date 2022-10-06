import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "../components/layout/Layout";
import { RentalBar } from "../components/myPage/RentalBar";
import { Profile } from "../components/myPage/Profile";
import { MyLikeList } from "../components/myPage/MyLikeList";

export const MyPage = () => {
  const [like, setLike] = useState(false);
  console.log(like);

  return (
    // <Layout>
    //   <StyledGridBox>
    //     <Profile like={like} setLike={setLike} />
    //     {like ? (
    //       <StyledLikeList>
    //         <MyLikeList />
    //       </StyledLikeList>
    //     ) : (
    //       <RentalBar />
    //     )}
    //   </StyledGridBox>
    // </Layout>
    //mobile
    <Layout>
      <StyledFlexBox>
        <Profile like={like} setLike={setLike} />
        {like ? (
          <StyledLikeList>
            <MyLikeList />
          </StyledLikeList>
        ) : (
          <RentalBar />
        )}
      </StyledFlexBox>
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
  @media only screen and (max-width: 767px) {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const StyledFlexBox = styled.div`
  border: 1px solid red;
  display: flex;
  margin: auto;
  width: 480px;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
`;
const StyledLikeList = styled.div`
  grid-row: 1/4;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
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
