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
          {/* <div>나의 찜목록</div> */}
          <div>
            {likeList?.map((item) => {
              return <MyWishItem item={item} key={item.id} />;
            })}
          </div>
        </StyledItem>
      </Desktop>

      <Mobile>
        <div>
          {/* <div>나의 찜목록</div> */}
          <div>
            {likeList?.map((item) => {
              return <MyWishItem item={item} key={item.id} />;
            })}
          </div>
        </div>
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
  padding-top: 10px;
`;
