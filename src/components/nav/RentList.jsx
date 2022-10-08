import React, { useRef } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { mypageAPI } from "../../server/api";
import { RentItem } from "./RentItem";
import { Scrollbars } from "react-custom-scrollbars";

export const RentList = () => {
  const scrollRef = useRef(null);

  const { data: productData } = useQuery("getProductList", () =>
    mypageAPI.getMyPageList()
  );
  const { data: lendData } = useQuery("getLendList", () =>
    mypageAPI.getMyPageConfirm()
  );
  const { data: borrowData } = useQuery("getBorrowList", () =>
    mypageAPI.getBorrowList()
  );

  const productList = productData?.data.data;
  const lendList = lendData?.data.data;
  const borrowList = borrowData?.data.data;

  return (
    <StyledProductList>
      <Scrollbars autoHide ref={scrollRef}>
        {productList?.map((item) => {
          return <RentItem key={item.id} item={item} />;
        })}
      </Scrollbars>
    </StyledProductList>
  );
};

const StyledProductList = styled.div`
  height: 100%;
`;
