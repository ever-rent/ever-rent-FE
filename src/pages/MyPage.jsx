import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "../components/layout/Layout";
import { RentalBar } from "../components/myPage/RentalBar";
import { Profile } from "../components/myPage/Profile";
import { MyWishList } from "../components/myPage/MyWishList";
import { Desktop, Mobile } from "../Hooks/MideaQuery";
import { Footer } from "../components/footer/Footer";

export const MyPage = () => {
  //찜목록, 렌탈목록 토글.
  const [like, setLike] = useState(false);
  console.log(like);

  return (
    <>
      <Desktop>
        <Layout>
          <StyledGridBox>
            <Profile like={like} setLike={setLike} />
            {like ? (
              <StyledLikeList>
                <MyWishList />
              </StyledLikeList>
            ) : (
              <StyledFadeBox>
                <RentalBar />
              </StyledFadeBox>
            )}
          </StyledGridBox>
        </Layout>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledFlexBox>
          <Profile like={like} setLike={setLike} />
          {like ? (
            <StyledMobileLikeList>
              <MyWishList />
            </StyledMobileLikeList>
          ) : (
            <RentalBar />
          )}
        </StyledFlexBox>
        <Footer />
      </Mobile>
    </>
  );
};

const StyledGridBox = styled.div`
  /* border: 1px solid blue; */
  width: 1000px;
  height: 100%;
  margin: 60px auto;
  display: grid;
  /* position: relative; */
  grid-template-columns: 250px 660px;
  justify-content: space-between;
  /* align-items: center; */
  animation: fadein 0.6s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledFlexBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  margin: 50px auto;
  width: 480px;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledLikeList = styled.div`
  grid-row: 1/4;
  width: 430px;
  height: 100%;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  animation: fadein 0.6s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledFadeBox = styled.div`
  animation: FadeBox 0.6s;
  @keyframes FadeBox {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledMobileLikeList = styled.div`
  grid-row: 1/4;
  /* box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px; */
  animation: fadein 0.6s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
