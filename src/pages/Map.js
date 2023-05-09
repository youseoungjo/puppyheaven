import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const loadScript = () => {
      const intervalId = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(intervalId);
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(37.5832206, 127.0103893),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);
        }
      }, 100);
    };

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d83083b50f9507f8339837fca3e0149f&libraries=services,clusterer,drawing&autoload=false`;
    script.onload = loadScript;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="Map">
      <div className="search_wrapper">
        <div className="btn-group-lg" role="group">
          <div type="radio" className="btn-check" id="btn1" autoComplete="off" checked />
          <label className="btn btn-outline-dark" htmlFor="btn1">산책코스</label>

          <div type="radio" className="btn-check" id="btn2" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="btn2">동물병원</label>

          <div type="radio" className="btn-check" id="btn3" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="btn3">부동산</label>
        </div>

        <div className="search_bar">
          <input type="text" className="searchBar"/>
          <button className="searchBtn">검색</button>
        </div>

        <div className="search_results">
          <div>
            {/* 검색 결과를 표시할 컴포넌트 */}
          </div>
        </div>
      </div>

      <div className="map_wrapper">
        <div id="map" style={{ width: "90%", height: "90%", marginLeft: "60px", marginTop: "45px" }}/>
      </div>
    </div>
  );
};

export default Map;
