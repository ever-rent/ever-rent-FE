import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  prevPageText,
  nextPageText,
  handlePageChange,
}) => {
  const pagingArray = Array.from(
    { length: parseInt(totalItemsCount / itemsCountPerPage + 1) },
    (item, index) => {
      return index;
    }
  );

  return (
    <>
      <Desktop>
        <StyledPageList>
          <li
            onClick={() => {
              if (activePage !== 1) {
                handlePageChange(activePage - 1);
              }
            }}
            style={activePage === 1 ? { backgroundColor: "#e9e9e9" } : null}
          >
            {prevPageText}
          </li>
          {pagingArray.map((i, index) => {
            if (index + 1 === activePage) {
              return (
                <li key={i} id={index + 1} className="activePage">
                  {index + 1}
                </li>
              );
            } else {
              return (
                <li
                  key={i}
                  id={index + 1}
                  onClick={() => {
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </li>
              );
            }
          })}
          <li
            onClick={() => {
              if (activePage !== pagingArray.length) {
                handlePageChange(activePage + 1);
              }
            }}
            style={
              activePage === pagingArray.length
                ? { backgroundColor: "#e9e9e9" }
                : null
            }
          >
            {nextPageText}
          </li>
        </StyledPageList>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile></Mobile>
    </>
  );
};

const StyledPageList = styled.ul`
  margin: auto;
  margin-top: 50px;
  width: 300px;
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  & ul,
  li {
    list-style: none;
  }
  & li {
    width: 35px;
    height: 35px;
    text-align: center;
    font-size: 25px;
    border-radius: 5px;
    background-color: rgb(216, 236, 252);
    transition: 0.6s;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: rgb(60, 177, 255);
    }
  }
  & .activePage {
    color: white;
    background-color: rgb(60, 177, 255);
  }

  & li:first-child,
  li:last-child {
    background-color: rgb(162, 214, 253);
    &:hover {
      background-color: rgb(60, 177, 255);
    }
  }
`;
