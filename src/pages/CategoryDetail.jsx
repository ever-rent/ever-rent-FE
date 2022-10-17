import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import { DetailItem } from "../components/detail/DetailItem";
import { Skeleton } from "../components/skeleton/Skeleton";

import { useInView } from "react-intersection-observer";
import { base } from "../server/core/instance";

export const CategoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const categoryList = [
    { value: "0", name: "카테고리를 선택하세요" },
    { value: "1", name: "디지털기기" },
    { value: "2", name: "공구" },
    { value: "3", name: "생활가전" },
    { value: "4", name: "잡화" },
    { value: "5", name: "스포츠/레저" },
    { value: "6", name: "취미/게임/음반" },
    { value: "7", name: "도서" },
    { value: "8", name: "기타" },
  ];

  const priceList = [
    { value: 0, name: "가격을 선택하세요" },
    { value: 1, name: "~ 10,000원 미만" },
    { value: 2, name: "10,000원 ~ 20,000원 미만" },
    { value: 3, name: "20,000원 ~ 30,000원 미만" },
    { value: 4, name: "30,000원 ~ 40,000원 미만" },
    { value: 5, name: "40,000원 ~ 50,000원 미만" },
    { value: 6, name: "50,000원 이상" },
  ];

  const categoryHandler = (e) => {
    e.preventDefault();
    // infi
    console.log(e.target.value);
    navigate(`/categoryDetail/${e.target.value}`);
  };

  useEffect(() => {
    setCategoryId(id);
  }, []);

  const priceHandler = (e) => {
    e.preventDefault();
  };

  // infi scroll
  const [isLoading, setIsLoading] = useState(false);

  // 카테고리 id 파라미터
  const [categoryId, setCategoryId] = useState(id);

  // 현재 state 데이터 , 다음페이지 이동 여부,
  // 현재페이지, observer 뷰 교차 여부
  const [categoryItems, setCategoryItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const [ref, inView] = useInView(true);

  // 다음 구간 데이터 패치 함수
  const fetch = useCallback(async (categoryId) => {
    try {
      const { data } = await base.get(
        `${process.env.REACT_APP_SERVER_URL}/categories/${categoryId}?page=${page.current}`
      );
      if (data.data.length === 12) {
        setIsLoading(true);
        setTimeout(() => {
          setCategoryItems((prevPosts) => [...prevPosts, ...data.data]);
          setHasNextPage(data.data.length === 12);
        }, 800);
        page.current += 1;
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setCategoryItems((prevPosts) => [...prevPosts, ...data.data]);
          setHasNextPage(false);
        }, 800);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  //categoryDetail/:id 를 통해 카테고리 항목이 옮겨질 경우
  // axios 캐시 문제인지 아래의 데이터 패치 처리 Effect가 작동하지 않고
  // 이전 데이터를 그대로 반영하는 문제 확인(headers cache-control은 이미 max-age=0 )
  // 추가 headers 옵션 적용되지 않음
  // 해당 useEffect를 통해 API 요청 & 카테고리 아이템 Array & 다음 요청시 호출할 page number 초기화
  useEffect(() => {
    setCategoryId(id);
    const init = [];
    setCategoryItems(init);
    page.current = 1;
  }, [id]);

  // 데이터 패치 처리
  useEffect(() => {
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      fetch(categoryId);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [fetch, hasNextPage, inView, page]);

  return (
    <Layout>
      <StyledCategoryContainer>
        <StyledSelectBox>
          <StyledSelect onChange={categoryHandler} defaultValue={id}>
            {categoryList?.map((option, index) => {
              if (index === 0) {
                return (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={true}
                  >
                    {option.name}
                  </option>
                );
              } else {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                );
              }
            })}
          </StyledSelect>
          <StyledSelect onChange={priceHandler}>
            {priceList?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </StyledSelect>
        </StyledSelectBox>

        <StyledDetailContainer>
          {categoryItems?.map((item) => {
            return <DetailItem {...item} key={item.id} />;
          })}
        </StyledDetailContainer>
      </StyledCategoryContainer>
      {isLoading === true ? (
        <>
          <Skeleton />
          <StyledSpinner>
            <span className="spinner"></span>
          </StyledSpinner>
        </>
      ) : null}
      <div ref={ref} style={{ position: "relative" }} />
    </Layout>
  );
};

const StyledCategoryContainer = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const StyledDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  margin-top: 30px;
  gap: 50px 40px;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;
const StyledSelectBox = styled.div`
  margin: 10px 0;
`;
const StyledSelect = styled.select`
  border: 2px solid #5fafe4;
  width: 200px;
  padding: 7px;
  margin: 15px 30px 30px 0;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 3px 0 rgb(71, 181, 255);
    transition: box-shadow 0.1s ease-in-out 0s;
  }
`;

const StyledSpinner = styled.div`
  /* display: none; */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  & .spinner {
    box-sizing: border-box;
    position: fixed;
    bottom: 200px;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: rgb(71, 181, 255);
    border-bottom-color: rgb(71, 181, 255);
    animation: spinner 0.7s ease infinite;

    @keyframes spinner {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
