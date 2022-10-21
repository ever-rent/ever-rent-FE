import styled from "styled-components";
import { badgeObject } from "../../util/badgeObject";
import { Desktop,Mobile } from "../../Hooks/MideaQuery";

export const UsersBadge = ({ badgeArray }) => {
  return (
    <>
    
    <Desktop>
      {badgeObject.map((item, index) => {
        return (
          <StyleditemWrap
            style={badgeArray[index] ? null : { display: "none" }}
          >
            <StyledBadgeImage src={item.src} alt={item.alt} />
            <StyledAltHover>{item.content}</StyledAltHover>
          </StyleditemWrap>
        );
      })}
    </Desktop>
    <Mobile>
      <StyledMobileGrid>

    {badgeObject.map((item, index) => {
        return (
          <StyledMobileitemWrap
            style={badgeArray[index] ? null : { display: "none" }}
          >
            <StyledMobileBadgeImage src={item.src} alt={item.alt} />
            <StyledMobileAltHover>{item.content}</StyledMobileAltHover>
          </StyledMobileitemWrap>
        );
      })}
      </StyledMobileGrid>
    </Mobile>
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
  color: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: transparent;
  transform: translate(-5%, -50%);
  z-index: 1;
  transition: 0.4s;
  &:hover {
    color: gray;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid gray;
    background-color: white;
  }
`;

// for Mobile

const StyledMobileGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px; 
`

const StyledMobileitemWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
  cursor: pointer;

  
`;
const StyledMobileBadgeImage = styled.img`
  width: 50px;
  height: 50px;
`;
const StyledMobileAltHover = styled.span`
  position: absolute;
  color: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: transparent;
  transform: translate(-5%, -50%);
  z-index: 1;
  transition: 0.4s;
  &:hover {
    color: gray;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid gray;
    background-color: white;
  }
`;
