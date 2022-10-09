import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { mypageAPI } from "../../server/api";
import { WishItem } from "./WishItem";

export const WishList = () => {
  const { data: wishData } = useQuery("getWishList", mypageAPI.getWishList);
  const wishList = wishData?.data.data;
  console.log(wishList);

  return (
    <StyledList>
      {wishList?.map((item) => {
        return <WishItem key={item.id} item={item} />;
      })}
    </StyledList>
  );
};

const StyledList = styled.div``;
