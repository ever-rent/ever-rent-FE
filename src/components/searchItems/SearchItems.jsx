import styled from "styled-components";

import { Layout } from "../layout/Layout";
import { Skeleton } from "../skeleton/Skeleton";
import { ProductsItem } from "../main/products/ProductsItem";
import { Pagination } from "./Pagination";

import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productAPI } from "../../server/api";

export const SearchItems = () => {
  const navigate = useNavigate();
  const param = useParams();

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

  const [isLoading, setIsLoading] = useState(false);
  const [categoryNumber, setCategoryNumber] = useState(0);
  const [priceNumber, setPriceNumber] = useState(0);

  // 패치 데이터
  const [searchData, setSearchData] = useState([]);
  // 필터 데이터
  const [filterData, setFilterData] = useState([]);
  // map용 데이터
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    await productAPI.getSearch(param.id).then((response) => {
      setSearchData(response.data.data);
      setFilterData(response.data.data);
    });
  };

  // 렌더링시 데이터 패치
  useEffect(() => {
    initOptions();
    setIsLoading(true);
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [param.id]);
  console.log("패치", searchData);

  const categoryHandler = (e) => {
    setCategoryNumber(e.target.value);
  };
  const priceHandler = (e) => {
    setPriceNumber(e.target.value);
  };

  //검색조건 초기화
  const initOptions = () => {
    setCategoryNumber(0);
    setPriceNumber(0);
    setProducts(searchData);
  };

  // 카테고리, 가격 필터
  useEffect(() => {
    setIsLoading(true);
    let cateFilter = searchData?.filter((element) =>
      categoryNumber === 0 ? element : element.cateId === categoryNumber
    );
    // let priceFilter = cateFilter.filter((element)=>element);
    let priceFilter = cateFilter?.filter((element) => {
      if (priceNumber === 0) {
        return element;
        // === 값으로 조건 설정시 5만원 이상 데이터 비정상 동기화
        // == 조건 값으로 대체
      }
      if (priceNumber == 1) {
        return element.price < 10000;
      }
      if (priceNumber == 6) {
        return element.price >= 50000;
      }
      if (priceNumber !== 0 || priceNumber !== 1 || priceNumber !== 6) {
        return (
          (element.price < priceNumber * 10000) &
          (element.price >= priceNumber * 10000 - 10000)
        );
      }
    });
    setFilterData(priceFilter);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [categoryNumber, priceNumber, searchData]);

  // pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  let indexArray = Array.from({ length: 12 }, (item, index) => {
    return index;
  });
  let pageIndex = [];
  pageIndex =
    page === 1 ? indexArray : indexArray.map((item) => item + (page - 1) * 12);

  const pagingFetching = () => {
    let pagingData = [];
    for (let i = 0; i < indexArray.length; i++) {
      if (filterData?.[pageIndex[i]] === undefined) {
        break;
      } else {
        pagingData.push(filterData?.[pageIndex[i]]);
      }
    }
    setProducts(pagingData);
  };

  useEffect(() => {
    pagingFetching();
  }, [page, searchData, filterData]);

  return (
    <>
      <Desktop>
        <Layout>
          <StyledProductsContainer>
            <StyledSelectBox>
              <StyledSelect
                onChange={(e) => categoryHandler(e)}
                defaultChecked={0}
                value={categoryNumber}
              >
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
              <StyledSelect
                onChange={(e) => priceHandler(e)}
                defaultChecked={0}
                value={`${priceNumber}`}
                // 가격 필터 임시 제거
                //###############################
                // style={{ display: "none" }}
              >
                {priceList?.map((option) => {
                  if (option.value === 0) {
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
              <StyledInitSpan onClick={initOptions}>
                검색조건 초기화
              </StyledInitSpan>
            </StyledSelectBox>
            <span>다음으로 검색된 목록 : {param.id}</span>
            {isLoading ? (
              <>
                <Skeleton />
              </>
            ) : (
              <StyledProductsGrid>
                {products?.map((product) => {
                  return <ProductsItem {...product} key={product.id} />;
                })}
              </StyledProductsGrid>
            )}
            <Pagination
              activePage={page}
              itemsCountPerPage={12}
              totalItemsCount={
                filterData?.length === undefined ? 1 : filterData?.length
              }
              prevPageText={"<"}
              nextPageText={">"}
              handlePageChange={handlePageChange}
            />
          </StyledProductsContainer>
        </Layout>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
      <Layout>
          <StyledMobileContainer>
            <StyledSelectBox>
              <StyledSelect
                onChange={(e) => categoryHandler(e)}
                defaultChecked={0}
                value={categoryNumber}
              >
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
              <StyledSelect
                onChange={(e) => priceHandler(e)}
                defaultChecked={0}
                value={`${priceNumber}`}
                // 가격 필터 임시 제거
                //###############################
                // style={{ display: "none" }}
              >
                {priceList?.map((option) => {
                  if (option.value === 0) {
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
              <StyledInitSpan onClick={initOptions}>
                검색조건 초기화
              </StyledInitSpan>
            </StyledSelectBox>
            <span>다음으로 검색된 목록 : {param.id}</span>
            {isLoading ? (
              <>
                <Skeleton />
              </>
            ) : (
              <StyledMobileProducts>
                {products?.map((product) => {
                  return <ProductsItem {...product} key={product.id} />;
                })}
              </StyledMobileProducts>
            )}
            <Pagination
              activePage={page}
              itemsCountPerPage={12}
              totalItemsCount={
                filterData?.length === undefined ? 1 : filterData?.length
              }
              prevPageText={"<"}
              nextPageText={">"}
              handlePageChange={handlePageChange}
            />
          </StyledMobileContainer>
        </Layout>
      </Mobile>
    </>
  );
};

const StyledProductsContainer = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  margin-top: 30px;
  gap: 50px 40px;
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

const StyledInitSpan = styled.span`
  color: gray;
  font-size: 16px;
  cursor: pointer;
`;

// for Mobile
const StyledMobileContainer = styled.div`
  /* border: 1px solid red; */
  max-width: 400px;
  margin: auto;
  margin-bottom: 90px;
  padding: 20px;
`;

const StyledMobileProducts = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
