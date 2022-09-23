/* global kakao */

import styled from "styled-components";
import { useEffect, useState } from "react";
import { Map , MapMarker} from "react-kakao-maps-sdk";

// const { kakao } = window;

export const LocationModal = ({ showModal, closeModal }) => {
  const [mapData, setmapData] = useState(null);
  
  // useEffect(() => {
  //   const container = document.querySelector("#myMap");
  //   const options = {
  //     center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //     level: 5,
  //   };
  //   const map = new window.kakao.maps.Map(container, options);
  //   setmapData(map);
  //   return () => {};
  // }, []);


  return (
    <div onClick={(e) => e.stopPropagation()}>
      {showModal ? (
        <StyledBackground onClick={closeModal}>
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
          <Map 
            className="myMap"
            style={{ width: "500px", height: "500px" }}
            center={{ lat: 33.5563, lng: 126.79581 }}
            level={4}
          >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000"}}>월정리에옹</div>
            </MapMarker>
          </Map>
          </StyledModalContainer>
        </StyledBackground>
      ) : null}
      ;
    </div>
  );
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
`;

const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* width: 400px;
  height: 400px;
  padding: 16px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgb(71, 181, 255);
  text-align: center; */

  .myMap{
    border-radius:20px;
    box-shadow: 1px 1px 10px 1px rgb(71, 181, 255);
  }

`;
