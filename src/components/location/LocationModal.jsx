import styled from "styled-components";
export const LocationModal = ({ showModal, closeModal }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {showModal ? (
        <Background onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <div>카카오톡 위치정보를 보여줄꺼에옹 아마도</div>
            <button onClick={closeModal}>닫혀라 얍</button>
          </ModalContainer>
        </Background>
      ) : null}
      ;
    </div>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  padding: 16px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  text-align: center;
`;
