import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";

export const RentItem = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <StyledItem onClick={() => navigate(`/productDetail/${item.id}`)}>
      <img src={`${imgFirstString}${item.imgUrlArray[0]}`} alt="상품이미지" />
      <div className="span-div">
        <span className="title">{item.productName}</span>
        <span>
          <span className="location">{item.mapLocation}</span> ·{" "}
          {item.rentStart} ~ <span className="date">{item.rentEnd}</span>
        </span>
      </div>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  display: flex;
  position: relative;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .like {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .span-div {
    display: flex;
    flex-direction: column;
    .title {
      font-weight: 500;
    }
    .location {
      color: #999;
      font-size: 12px;
    }
    .date {
      color: red;
      font-weight: bold;
    }
  }
`;
