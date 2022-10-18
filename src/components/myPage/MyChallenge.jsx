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
                <span>첫 게시글</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/localMerchant.png")}
                  alt="게시글5개이상"
                />
                <span>우리동네 렌탈업자</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/firstTrade.png")}
                  alt="렌트예약 첫 등록"
                />
                <span>첫 거래</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/manyTrader.png")}
                  alt="빌린 물건 5회"
                />
                <span>빌려볼리티</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/manners.png")}
                  alt="매너온도 37도 이상"
                />
                <span>매너러블</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/hardTalker.png")}
                  alt="채팅50회 이상"
                />
                <span>달변가</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/rentOrNot.png")}
                  alt=""
                />
                <span>빌릴까말까</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/reporter.png")}
                  alt=""
                />
                <span>투철한 신고정신</span>
              </StyleditemWrap>
              <StyleditemWrap>
                <StyledBadgeImage
                  src={require("../../image/photographer.png")}
                  alt=""
                />
                <span>열정사진사</span>
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
  height: 500px;
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
`;
