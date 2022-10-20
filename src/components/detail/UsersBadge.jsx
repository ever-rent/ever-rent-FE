import styled from "styled-components";

export const UsersBadge = () => {
  return (
    <>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/firstPost.png")}
          alt="첫게시글"
        />
        <StyledAltHover>첫게시글</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/localMerchant.png")}
          alt="게시글5개이상"
        />
        <StyledAltHover>게시글5개이상</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/firstTrade.png")}
          alt="렌트예약 첫 등록"
        />
        <StyledAltHover>렌트예약 첫 등록</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/manyTrader.png")}
          alt="빌린 물건 5회"
        />
        <StyledAltHover>빌린 물건 5회</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/manners.png")}
          alt="매너온도 37.5도 이상"
        />
        <StyledAltHover>매너온도 37.5도 이상</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/hardTalker.png")}
          alt="채팅50회 이상"
        />
        <StyledAltHover>채팅50회 이상</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/rentOrNot.png")}
          alt="찜 10개 이상"
        />
        <StyledAltHover>찜 10개 이상</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/reporter.png")}
          alt="신고 1회"
        />
        <StyledAltHover>신고 1회</StyledAltHover>
      </StyleditemWrap>
      <StyleditemWrap>
        <StyledBadgeImage
          src={require("../../image/photographer.png")}
          alt="한 게시물에 10개 이상의 사진"
        />
        <StyledAltHover>한 게시물에 10개 이상의 사진</StyledAltHover>
      </StyleditemWrap>
    </>
  );
};

const StyleditemWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`;
const StyledBadgeImage = styled.img`
  width: 50px;
  height: 50px;
`;
const StyledAltHover = styled.span`
  position: absolute;
  color:transparent;
  border:1px solid transparent;
  border-radius:3px;
  background-color:transparent;
  transform: translate(-5%, -50%);
  z-index:1;
  transition:0.4s;
  &:hover {
    color:gray;
    font-size:15px;
    font-weight:bold;
    border:1px solid gray;
    background-color:white;
  }
`;
