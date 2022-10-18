import { useState } from "react";
import { StyledSelectAddress } from "./styled";

export const SelectAddress = ({ setAddress }) => {
  const addressList = [
    { id: 0, value: "지역 선택" },
    { id: 1, value: "서울특별시" },
    { id: 2, value: "부산광역시" },
    { id: 3, value: "대구광역시" },
    { id: 4, value: "인천광역시" },
    { id: 5, value: "광주광역시" },
    { id: 6, value: "대전광역시" },
    { id: 7, value: "울산광역시" },
    { id: 8, value: "세종특별자치시" },
    { id: 9, value: "경기도" },
    { id: 10, value: "강원도" },
    { id: 11, value: "충청북도" },
    { id: 12, value: "충청남도" },
    { id: 13, value: "전라북도" },
    { id: 14, value: "전라남도" },
    { id: 15, value: "경상북도" },
    { id: 16, value: "경상남도" },
    { id: 17, value: "제주특별자치도" },
  ];

  // 서울특별시
  const address1 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "강남구" },
    { id: 2, value: "강동구" },
    { id: 3, value: "강북구" },
    { id: 4, value: "강서구" },
    { id: 5, value: "관악구" },
    { id: 6, value: "광진구" },
    { id: 7, value: "구로구" },
    { id: 8, value: "금천구" },
    { id: 9, value: "노원구" },
    { id: 10, value: "도봉구" },
    { id: 11, value: "동대문구" },
    { id: 12, value: "동작구" },
    { id: 13, value: "마포구" },
    { id: 14, value: "서대문구" },
    { id: 15, value: "서초구" },
    { id: 16, value: "성동구" },
    { id: 17, value: "성북구" },
    { id: 18, value: "송파구" },
    { id: 19, value: "양천구" },
    { id: 20, value: "영등포구" },
    { id: 21, value: "용산구" },
    { id: 22, value: "은평구" },
    { id: 23, value: "종로구" },
    { id: 24, value: "중구" },
    { id: 25, value: "중랑구" },
  ];

  // 부산광역시
  const address2 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "강서구" },
    { id: 2, value: "금정구" },
    { id: 3, value: "기장군" },
    { id: 4, value: "남구" },
    { id: 5, value: "동구" },
    { id: 6, value: "동래구" },
    { id: 7, value: "부산진구" },
    { id: 8, value: "북구" },
    { id: 9, value: "사상구" },
    { id: 10, value: "사하구" },
    { id: 11, value: "서구" },
    { id: 12, value: "수영구" },
    { id: 13, value: "연제구" },
    { id: 14, value: "영도구" },
    { id: 15, value: "중구" },
    { id: 16, value: "해운대구" },
  ];

  // 대구광역시
  const address3 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "남구" },
    { id: 2, value: "달서구" },
    { id: 3, value: "달성군" },
    { id: 4, value: "동구" },
    { id: 5, value: "북구" },
    { id: 6, value: "서구" },
    { id: 7, value: "수성구" },
    { id: 8, value: "중구" },
  ];

  // 인천광역시
  const address4 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "강화군" },
    { id: 2, value: "계양구" },
    { id: 3, value: "남구" },
    { id: 4, value: "남동구" },
    { id: 5, value: "동구" },
    { id: 6, value: "부평구" },
    { id: 7, value: "서구" },
    { id: 8, value: "연수구" },
    { id: 9, value: "옹진군" },
    { id: 10, value: "중구" },
  ];

  // 광주광역시
  const address5 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "광산구" },
    { id: 2, value: "남구" },
    { id: 3, value: "동구" },
    { id: 4, value: "북구" },
    { id: 5, value: "서구" },
  ];

  // 대전광역시
  const address6 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "대덕구" },
    { id: 2, value: "동구" },
    { id: 3, value: "서구" },
    { id: 4, value: "유성구" },
    { id: 5, value: "중구" },
  ];

  // 울산광역시
  const address7 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "남구" },
    { id: 2, value: "동구" },
    { id: 3, value: "북구" },
    { id: 4, value: "울주군" },
    { id: 5, value: "중구" },
  ];

  // 세종시는 시/군/구가 없어서 제외
  // const address8 = [{ id: 0, value: "시/군/구 선택" }];

  // 경기도
  const address9 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "가평군" },
    { id: 2, value: "고양시 덕양구" },
    { id: 3, value: "고양시 일산동구" },
    { id: 4, value: "고양시 일산서구" },
    { id: 5, value: "과천시" },
    { id: 6, value: "광명시" },
    { id: 7, value: "광주시" },
    { id: 8, value: "구리시" },
    { id: 9, value: "군포시" },
    { id: 10, value: "김포시" },
    { id: 11, value: "남양주시" },
    { id: 12, value: "동두천시" },
    { id: 13, value: "부천시" },
    { id: 14, value: "성남시 분당구" },
    { id: 15, value: "성남시 수정구" },
    { id: 16, value: "성남시 중원구" },
    { id: 17, value: "수원시 권선구" },
    { id: 18, value: "수원시 영통구" },
    { id: 19, value: "수원시 장안구" },
    { id: 20, value: "수원시 팔달구" },
    { id: 21, value: "시흥시" },
    { id: 22, value: "안산시 단원구" },
    { id: 23, value: "안산시 상록구" },
    { id: 24, value: "안성시" },
    { id: 25, value: "안양시 동안구" },
    { id: 26, value: "안양시 만안구" },
    { id: 27, value: "양주시" },
    { id: 28, value: "양평군" },
    { id: 29, value: "여주시" },
    { id: 30, value: "연천군" },
    { id: 31, value: "오산시" },
    { id: 32, value: "용인시 기흥구" },
    { id: 33, value: "용인시 수지구" },
    { id: 34, value: "용인시 처인구" },
    { id: 35, value: "의왕시" },
    { id: 36, value: "의정부시" },
    { id: 37, value: "이천시" },
    { id: 38, value: "파주시" },
    { id: 39, value: "평택시" },
    { id: 40, value: "포천시" },
    { id: 41, value: "하남시" },
    { id: 42, value: "화성시" },
  ];

  // 강원도
  const address10 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "강릉시" },
    { id: 2, value: "고성군" },
    { id: 3, value: "동해시" },
    { id: 4, value: "삼척시" },
    { id: 5, value: "속초시" },
    { id: 6, value: "양구군" },
    { id: 7, value: "양양군" },
    { id: 8, value: "영월군" },
    { id: 9, value: "원주시" },
    { id: 10, value: "인제군" },
    { id: 11, value: "정선군" },
    { id: 12, value: "철원군" },
    { id: 13, value: "춘천시" },
    { id: 14, value: "태백시" },
    { id: 15, value: "평창군" },
    { id: 16, value: "홍천군" },
    { id: 17, value: "화천군" },
    { id: 18, value: "횡성군" },
  ];

  // 충청북도
  const address11 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "괴산군" },
    { id: 2, value: "단양군" },
    { id: 3, value: "보은군" },
    { id: 4, value: "영동군" },
    { id: 5, value: "옥천군" },
    { id: 6, value: "음성군" },
    { id: 7, value: "제천시" },
    { id: 8, value: "증평군" },
    { id: 9, value: "진천군" },
    { id: 10, value: "청주시 상당구" },
    { id: 11, value: "청주시 서원구" },
    { id: 12, value: "청주시 청원구" },
    { id: 13, value: "청주시 흥덕구" },
    { id: 14, value: "충주시" },
  ];

  // 충청남도
  const address12 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "계룡시" },
    { id: 2, value: "공주시" },
    { id: 3, value: "금산군" },
    { id: 4, value: "논산시" },
    { id: 5, value: "당진시" },
    { id: 6, value: "보령시" },
    { id: 7, value: "부여군" },
    { id: 8, value: "서산시" },
    { id: 9, value: "서천군" },
    { id: 10, value: "아산시" },
    { id: 11, value: "예산군" },
    { id: 12, value: "천안시 동남구" },
    { id: 13, value: "천안시 서북구" },
    { id: 14, value: "청양군" },
    { id: 15, value: "태안군" },
    { id: 16, value: "홍성군" },
  ];

  // 전라북도
  const address13 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "고창군" },
    { id: 2, value: "군산시" },
    { id: 3, value: "김제시" },
    { id: 4, value: "남원시" },
    { id: 5, value: "무주군" },
    { id: 6, value: "부안군" },
    { id: 7, value: "순창군" },
    { id: 8, value: "완주군" },
    { id: 9, value: "익산시" },
    { id: 10, value: "임실군" },
    { id: 11, value: "장수군" },
    { id: 12, value: "전주시 덕진구" },
    { id: 13, value: "전주시 완산구" },
    { id: 14, value: "정읍시" },
    { id: 15, value: "진안군" },
  ];

  // 전라남도
  const address14 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "강진군" },
    { id: 2, value: "고흥군" },
    { id: 3, value: "곡성군" },
    { id: 4, value: "광양시" },
    { id: 5, value: "구례군" },
    { id: 6, value: "나주시" },
    { id: 7, value: "담양군" },
    { id: 8, value: "목포시" },
    { id: 9, value: "무안군" },
    { id: 10, value: "보성군" },
    { id: 11, value: "순천시" },
    { id: 12, value: "신안군" },
    { id: 13, value: "여수시" },
    { id: 14, value: "영광군" },
    { id: 15, value: "영암군" },
    { id: 16, value: "완도군" },
    { id: 17, value: "장성군" },
    { id: 18, value: "장흥군" },
    { id: 19, value: "진도군" },
    { id: 20, value: "함평군" },
    { id: 21, value: "해남군" },
    { id: 22, value: "화순군" },
  ];

  // 경상북도
  const address15 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "경산시" },
    { id: 2, value: "경주시" },
    { id: 3, value: "고령군" },
    { id: 4, value: "구미시" },
    { id: 5, value: "군위군" },
    { id: 6, value: "김천시" },
    { id: 7, value: "문경시" },
    { id: 8, value: "봉화군" },
    { id: 9, value: "상주시" },
    { id: 10, value: "성주군" },
    { id: 11, value: "안동시" },
    { id: 12, value: "영덕군" },
    { id: 13, value: "영양군" },
    { id: 14, value: "영주시" },
    { id: 15, value: "영천시" },
    { id: 16, value: "예천군" },
    { id: 17, value: "울릉군" },
    { id: 18, value: "울진군" },
    { id: 19, value: "의성군" },
    { id: 20, value: "청도군" },
    { id: 21, value: "청송군" },
    { id: 22, value: "칠곡군" },
    { id: 23, value: "포항시 남구" },
    { id: 24, value: "포항시 북구" },
  ];

  // 경상남도
  const address16 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "거제시" },
    { id: 2, value: "거창군" },
    { id: 3, value: "고성군" },
    { id: 4, value: "김해시" },
    { id: 5, value: "남해군" },
    { id: 6, value: "밀양시" },
    { id: 7, value: "사천시" },
    { id: 8, value: "산청군" },
    { id: 9, value: "양산시" },
    { id: 10, value: "의령군" },
    { id: 11, value: "진주시" },
    { id: 12, value: "창녕군" },
    { id: 13, value: "창원시 마산합포구" },
    { id: 14, value: "창원시 마산회원구" },
    { id: 15, value: "창원시 성산구" },
    { id: 16, value: "창원시 의창구" },
    { id: 17, value: "창원시 진해구" },
    { id: 18, value: "통영시" },
    { id: 19, value: "하동군" },
    { id: 20, value: "함안군" },
    { id: 21, value: "함양군" },
    { id: 22, value: "합천군" },
  ];

  // 제주도
  const address17 = [
    { id: 0, value: "시/군/구 선택" },
    { id: 1, value: "서귀포시" },
    { id: 2, value: "제주시" },
  ];

  const [select1, setSelect1] = useState("");

  const hendleSelect1 = (e) => {
    if (e.target.value === "세종특별자치시") {
      setAddress(e.target.value);
    }
    setSelect1(e.target.value);
  };

  const hendleSelect2 = (e) => {
    setAddress(select1 + " " + e.target.value);
  };

  return (
    <StyledSelectAddress>
      <div>
        <select onChange={hendleSelect1} value={select1}>
          {addressList.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;
        {select1 === "서울특별시" && (
          <select onChange={hendleSelect2}>
            {address1.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "부산광역시" && (
          <select onChange={hendleSelect2}>
            {address2.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "대구광역시" && (
          <select onChange={hendleSelect2}>
            {address3.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "인천광역시" && (
          <select onChange={hendleSelect2}>
            {address4.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "광주광역시" && (
          <select onChange={hendleSelect2}>
            {address5.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "대전광역시" && (
          <select onChange={hendleSelect2}>
            {address6.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "울산광역시" && (
          <select onChange={hendleSelect2}>
            {address7.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "경기도" && (
          <select onChange={hendleSelect2}>
            {address9.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "강원도" && (
          <select onChange={hendleSelect2}>
            {address10.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "충청북도" && (
          <select onChange={hendleSelect2}>
            {address11.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "충청남도" && (
          <select onChange={hendleSelect2}>
            {address12.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "전라북도" && (
          <select onChange={hendleSelect2}>
            {address13.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "전라남도" && (
          <select onChange={hendleSelect2}>
            {address14.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "경상북도" && (
          <select onChange={hendleSelect2}>
            {address15.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "경상남도" && (
          <select onChange={hendleSelect2}>
            {address16.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        {select1 === "제주특별자치도" && (
          <select onChange={hendleSelect2}>
            {address17.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
      </div>
      <br />
    </StyledSelectAddress>
  );
};