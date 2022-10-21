import styled from "styled-components";
import { badgeObject } from "../../util/badgeObject";

export const MyCallenge = ({ showChallenge, closeChallenge, badgeArray }) => {
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
              {badgeObject.map((item, index) => {
                return (
                  <StyleditemWrap
                    style={badgeArray[index] ? null : { display: "none" }}
                  >
                    <StyledBadgeImage src={item.src} alt={item.alt} />
                    <div>{item.content}</div>
                    <StyledAltHover>{item.alt}</StyledAltHover>
                  </StyleditemWrap>
                );
              })}
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
  cursor: auto;
  z-index: 2;
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
  grid-gap: 10px;
  justify-content: center;
`;
const StyleditemWrap = styled.div`
  font-size: 12px;
  text-align: center;
`;
const StyledBadgeImage = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const StyledAltHover = styled.span`
  width: 100px;
  height: 100px;
  position: relative;
  color: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: transparent;
  z-index: 1;
  transition: 0.2s;
  top: -75px;
  cursor: pointer;

  &:hover {
    color: gray;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid gray;
    background-color: white;
  }
`;
