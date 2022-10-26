import styled from "styled-components";
import { badgeObject } from "../../util/badgeObject";

export const OtherProfile = ({
  showProfile,
  closeProfile,
  detailData,
  userImage,
  badgeArray,
}) => {
  return (
    <StyledModalBackground
      onClick={closeProfile}
      style={showProfile ? null : { display: "none" }}
    >
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledModal>
          <div>
            <StyledInfoHeader>
              <StyledProfileImage src={userImage} alt="프로필사진" />
              <h4>{detailData?.memberName}</h4>
            </StyledInfoHeader>
            <h3 style={{ textAlign: "center" }}>보유중인 뱃지</h3>
            <StyledBadgeGrid>
              {badgeObject.map((item, index) => {
                return (
                  <StyleditemWrap
                    style={badgeArray[index] ? null : { display: "none" }}
                  >
                    <StyledBadgeImage src={item.src} alt={item.alt} />
                    <StyledAltHover>첫게시글</StyledAltHover>
                  </StyleditemWrap>
                );
              })}
            </StyledBadgeGrid>
          </div>
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

  animation: badgeFadein 0.6s;
  & {
    @keyframes badgeFadein {
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
  padding: 20px;
  width: 400px;
  height: 480px;
  background-color: white;
  border-radius: 15px;
`;

const StyledInfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledProfileImage = styled.img`
  width: 100px;
  height: 100px;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledBadgeGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 80px 80px 80px;
  grid-gap: 25px;
`;

const StyleditemWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`;
const StyledBadgeImage = styled.img`
  width: 80px;
  height: 80px;
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
