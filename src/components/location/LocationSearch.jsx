import styled from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export const LocationSearch = ({
  showMapSearch,
  closeSearchModal,
  location,
  locationCheck,
  searchMapInput,
}) => {
  // 거래장소 props 추가 예정
  const { kakao } = window;

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  const [searchLocatoun, setSearchLocatoun] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const [recommandPlace, setRecommandPlace] = useState([]);
  console.log(recommandPlace);

  useEffect(() => {
    if (!map) return;
    const places = new kakao.maps.services.Places();

    // 검색결과 데이터의 첫 번째 위치 정보 호출
    places.keywordSearch(searchLocatoun, (data, status, _pagination) => {
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

        // 추천장소
        setRecommandPlace([
          data[1].place_name,
          data[2].place_name,
          data[3].place_name,
        ]);
      }

      // 법정주소 필터
      getAddr(data[0].y, data[0].x);
    });
  }, [map, searchResult,searchLocatoun]);


  const getAddr = (lat, lng) => {
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
  };

  return (
    <div>
      {showMapSearch ? (
        <StyledBackground onClick={closeSearchModal}>
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
            <StyledSearch>
              <h3>거래 장소 찾기</h3>
              <StyledSearchBox>
                <StyledSearchForm
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <StyledSearchInput
                    type="text"
                    placeholder="주소나 특정 위치로 검색해보세요!"
                    onChange={(e) => setSearchLocatoun(e.target.value)}
                    value={searchLocatoun}
                  />
                  <StyledSearchButton
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchResult(searchLocatoun);
                    }}
                  />
                  <span style={{ display: "none" }}>
                    이미지출처: https://icons8.com/icon/59878/search
                    https://icons8.com Icons8
                  </span>
                </StyledSearchForm>
                <StyledSubPlace>
                  <div style={{textAlign:"center"}}>이런 장소는 어떨까요?</div>
                  <StyledSubItemBox>

                  {
                    recommandPlace.map((item,index)=>{
                      if(item!==undefined){
                        return(
                          <StyledSubItem 
                          key={index}
                          onClick={()=>{setSearchLocatoun(item)}}
                          
                          >{item}</StyledSubItem>
                        )
                      }
                    })
                  }
                  </StyledSubItemBox>
                </StyledSubPlace>
                {
                  <Map
                    center={{
                      lat: 37.566826,
                      lng: 126.9786567,
                    }}
                    style={{ width: "400px", height: "400px" }}
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
                          <div>{marker.content}</div>
                        )}
                      </MapMarker>
                    ))}
                  </Map>
                }
                <StyledSelectButton
                  type="button"
                  onClick={() => {
                    searchMapInput(searchResult);
                    closeSearchModal();
                  }}
                >
                  이 장소에서 거래할래요!
                </StyledSelectButton>
              </StyledSearchBox>
            </StyledSearch>
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
  .myMap {
    border-radius: 20px;
    box-shadow: 1px 1px 10px 1px rgb(71, 181, 255);
  }
`;

const StyledSearch = styled.div`
  width: 420px;
  height: 700px;
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 2px solid rgb(71, 181, 255);
`;

const StyledSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSearchForm = styled.form`
  margin: 10px 0 20px 0;
  display: flex;
  align-items: center;
`;

const StyledSearchInput = styled.input`
  width: 220px;
  height: 20px;
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid black;
  transition: 0.3s;

  &:focus {
    border: 1px solid rgb(71, 181, 255);
    border-radius: 10px;
    outline: 1px solid rgb(71, 181, 255);
  }
`;

const StyledSearchButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeAy66g%2FbtrMjWY3xqU%2Fm1EZ0SnIuAjUklSkeWYRqk%2Fimg.png")
    no-repeat 95% 50%;
  cursor: pointer;
  border-radius: 10px;
  &:focus {
    border: 1px solid rgb(71, 181, 255);
    outline: 1px solid rgb(71, 181, 255);
  }
  &:hover {
    background-color: #f3f3f3;
  }
`;

const StyledSubPlace = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledSubItemBox = styled.div`
  display: flex;
  
  
`
const StyledSubItem = styled.div`
  font-size:12px;
  margin-top:15px;
  margin-left:10px;
  margin-right:10px;
  text-align:center;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color:rgb(71, 181, 255);
  }
`


const StyledSelectButton = styled.button`
  margin-top: 20px;
  display: flex;
  width: 220px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  background-color: rgb(71, 181, 255);
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: rgb(15, 159, 255);
  }
`;
