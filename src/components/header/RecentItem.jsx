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

  const [pageAll, setPageAll] = useState(1);

  useEffect(() => {
    pagingFetching();
    setPageAll(Math.ceil(recentItem?.length / 3));
  }, [page, recentItem]);
  console.log(pageItem);

  return (
    <StyledRecentItemContainer>
      <StyledContentBox>
        <StyledTitle>
          최근본상품
          <StyledEggWrap href="https://main.stocks-talk.site/" target="_blank">
            <StyledEasterEgg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fq430v%2FbtrPJppwWkD%2Fe9ownmqNNJ7sZvnVPbwa3k%2Fimg.png"
              alt="이스터에그"
            />
          </StyledEggWrap>
        </StyledTitle>
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
        <StyledPage>
          {page} / {pageAll}
        </StyledPage>
      </StyledContentBox>
      <StyledPagingBox>
        <RecentPaging
          activePage={page}
          itemsCountPerPage={3}
          totalItemsCount={recentItem?.length}
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
  position: absolute;
  position: fixed;
  /* right: 2vw; */
  /* top: 30%; */
  top: 300px;
  right: calc(50% - 710px);
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
  cursor: pointer;
`;

const StyledPage = styled.span`
  position: absolute;
  bottom: 0;
  font-size: 15px;
`;

// easter egg
const StyledEggWrap = styled.a`
  width: 120px;
  position: absolute;
  right: 0px;
  top: 0px;

  & img {
    opacity: 0;
    transition: 0.2s;
  }
  &:hover {
    & img {
      opacity: 1;
    }
  }
`;
const StyledEasterEgg = styled.img`
  width: 120px;
  position: absolute;
  right: -10px;
  top: 0px;
`;
