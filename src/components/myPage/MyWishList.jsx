import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../../redux/modules/mypageSlice";
import { MyWishItem } from "./MyWishItem";
import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const MyWishList = () => {
  const dispatch = useDispatch();
  const likeList = useSelector((state) => state.mypage.MyWish);
  console.log("MyWishList >> likeList", likeList);

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  return (
    <>
      <Desktop>
        <StyledItem>
          <StyledTitle>나의 찜목록</StyledTitle>
          <StyledList>
            {likeList?.map((item) => {
              return <MyWishItem item={item} key={item.id} />;
            })}
          </StyledList>
        </StyledItem>
      </Desktop>

      <Mobile>
        <StyledMobileItem>
          <StyledMobileTitle>나의 찜목록</StyledMobileTitle>
          <StyledMobileList>
            {likeList?.map((item) => {
              return <MyWishItem item={item} key={item.id} />;
            })}
          </StyledMobileList>
        </StyledMobileItem>
      </Mobile>
    </>
  );
};

// const StyledWishBox = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledTitle = styled.div``;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const StyledList = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const StyledTitle = styled.span`
  color: #46b5ff;
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0 0 15px;
`;

const StyledMobileItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const StyledMobileTitle = styled.span`
  color: #1b9cf2;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 0 15px;
`;

const StyledMobileList = styled.div`
  width: 100%;
  margin-top: 15px;
`;
