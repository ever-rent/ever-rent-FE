import styled from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export const LocationModal = ({
  showModal,
  closeModal,
  location,
  locationCheck,
}) => {
  // 거래장소 props 추가 예정
  const { kakao } = window;

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();


  useEffect(() => {
    if (!map) return;
    const places = new kakao.maps.services.Places();

    // 검색결과 데이터의 첫 번째 위치 정보 호출
    places.keywordSearch(location, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        markers.push({
          position: {
            lat: data[0].y,
            lng: data[0].x,
          },
          content: data[0].place_name,
        });
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        // }
        setMarkers(markers);

        map.setBounds(bounds);
      }

      // 법정주소 필터
      getAddr(data[0].y, data[0].x);
    });
  }, [map]);

  function getAddr(lat, lng) {
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
        let data = result[0].road_address.address_name.split(" ");
        console.log(data);
        locationCheck(`${data[0]} ${data[1]}`);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {showModal ? (
        <StyledBackground onClick={closeModal}>
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
            {
              <Map
                center={{
                  lat: 37.566826,
                  lng: 126.9786567,
                }}
                style={{ width: "500px", height: "500px" }}
                level={3}
                onCreate={setMap}
              >
                {markers.map((marker) => (
                  <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                  >
                    {info && info.content === marker.content && (
                      <div style={{ color: "#000" }}>{marker.content}</div>
                    )}
                  </MapMarker>
                ))}
              </Map>
            }
          </StyledModalContainer>
        </StyledBackground>
      ) : null}
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

  .myMap {
    border-radius: 20px;
    box-shadow: 1px 1px 10px 1px rgb(71, 181, 255);
  }
`;
