import styled from "styled-components";

export const MyCallenge = ({ showChallenge, closeChallenge }) => {



  return (
    <StyledModalBackground
      onClick={closeChallenge}
      style={!showChallenge ? { display: "none" } : null}
    >
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledModal>
          <StyledMyBadges>
            <h3>나의 도전과제</h3>
            <StyledGridBox>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/firstPost.png")}
                  alt="첫게시글"
                />
                <div>첫 게시글</div>
                <StyledAltHover>첫게시글 등록</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/localMerchant.png")}
                  alt="게시글5개이상"
                />
                <div>우리동네 렌탈업자</div>
                <StyledAltHover>게시글5개이상</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/firstTrade.png")}
                  alt="렌트예약 첫 등록"
                />
                <div>첫 거래</div>
                <StyledAltHover>렌트예약 첫 등록</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/manyTrader.png")}
                  alt="빌린 물건 5회"
                />
                <div>빌려볼리티</div>
                <StyledAltHover>빌린 물건 5회</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/manners.png")}
                  alt="매너온도 37도 이상"
                />
                <div>매너러블</div>
                <StyledAltHover>매너온도 37.5도 이상</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/hardTalker.png")}
                  alt="채팅50회 이상"
                />
                <div>달변가</div>
                 <StyledAltHover>채팅50회 이상</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/rentOrNot.png")}
                  alt=""
                />
                <div>빌릴까말까</div>
                <StyledAltHover>찜 10개 이상</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/reporter.png")}
                  alt=""
                />
                <div>투철한 신고정신</div>
                <StyledAltHover>신고 1회</StyledAltHover>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/photographer.png")}
                  alt=""
                />
                <div>열정사진사</div>
                <StyledAltHover>한 게시물에 10개 이상의 사진</StyledAltHover>
              </StyleditemWrap>
            </StyledGridBox>
          </StyledMyBadges>
        </StyledModal>
      </StyledModalContainer>
    </StyledModalBackground>
  );
};

const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  animation: badge 0.6s;
  & {
    @keyframes badge {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
`;

const StyledModal = styled.div`
  width: 400px;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
`;

const StyledMyBadges = styled.div``;
const StyledGridBox = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-gap:10px;
  justify-content: center;
`;
const StyleditemWrap = styled.div`
    font-size:12px;
    text-align: center;


`;
const StyledBadgeImage = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;


const StyledAltHover = styled.span`
  width:100px;
  height: 100px;
  position: relative;
  color:transparent;
  border:1px solid transparent;
  border-radius:3px;
  background-color:transparent;
  z-index:1;
  transition:0.2s;
  top:-75px;
  cursor: pointer;
  
  &:hover {
    color:gray;
    font-size:15px;
    font-weight:bold;
    border:1px solid gray;
    background-color:white;
    
  }
`;