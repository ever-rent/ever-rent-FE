import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RecentPaging } from "./RecentPaging";
import { imgFirstString } from "../../server/api";

export const RecentItem = () => {
  const navigate = useNavigate();
  const recentData = useSelector((state) => state.products.recent);
  console.log(recentData);

  const [page, setPage] = useState(1);
  const [recentItem, setRecentItem] = useState([]);
  const [pageItem, setPageItem] = useState([]);

  useEffect(() => {
    setRecentItem(recentData);
  }, []);
  console.log(recentItem);

  const handlePageChange = (page) => {
    setPage(page);
  };

  let indexArray = Array.from({ length: 3 }, (item, index) => {
    return index;
  });
  let pageIndex = [];
  pageIndex =
    page === 1 ? indexArray : indexArray.map((item) => item + (page - 1) * 3);

  const pagingFetching = () => {
    let pagingData = [];
    for (let i = 0; i < indexArray.length; i++) {
      if (recentItem?.[pageIndex[i]] === undefined) {
        break;
      } else {
        pagingData.push(recentItem?.[pageIndex[i]]);
      }
    }
    setPageItem(pagingData);
  };

  useEffect(() => {
    pagingFetching();
  }, [page, recentItem]);
  console.log(pageItem);

  return (
    <StyledRecentItemContainer>
      <StyledContentBox>
        <StyledTitle>최근본상품</StyledTitle>
        <div>---------</div>
        <StyledImgBox>
          {pageItem?.map((item, index) => {
            return (
              <StyledImg
                key={index}
                src={`${imgFirstString}${item?.imgUrlArray[0]}`}
                alt="최근본상품 미리보기"
                onClick={() => {
                  navigate(`/productDetail/${item.id}`);
                }}
              />
            );
          })}
        </StyledImgBox>
        <StyledPage>{page} / 3</StyledPage>
      </StyledContentBox>
      <StyledPagingBox>
        <RecentPaging
          activePage={page}
          itemsCountPerPage={3}
          totalItemsCount={recentData?.length}
          prevPageText={"<"}
          nextPageText={">"}
          handlePageChange={handlePageChange}
        />
      </StyledPagingBox>
    </StyledRecentItemContainer>
  );
};

const StyledRecentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 430px;
  background-color: #ffffffda;
  border: 1px solid gray;
  position: fixed;
  right: 2vw;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 99;
`;

const StyledContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 90%;
`;

const StyledTitle = styled.span`
  margin-top: 15px;
  font-weight: 600;
  color: #0e8ee3;
`;

const StyledPagingBox = styled.div`
  position: absolute;
  max-height: max-content;
  bottom: 12px;
  left: -31px;
`;

const StyledImgBox = styled.div`
  width: 100px;
  height: 100px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledPage = styled.span`
  position: absolute;
  bottom: 0;
  font-size: 15px;
`;
