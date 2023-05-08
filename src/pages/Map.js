import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const loadScript = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5832206, 127.0103893),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      } else {
        setTimeout(loadScript, 100);
      }
    };

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=API_KEY&libraries=services,clusterer,drawing&autoload=false`;
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
          <div type="radio" className="btn-check" id="btn1" autocomplete="off" checked />
          <label className="btn btn-outline-dark" for="btn1">산책코스</label>

          <div type="radio" className="btn-check" id="btn1" autocomplete="off" checked />
          <label className="btn btn-outline-dark" for="btn1">동물병원</label>

          <div type="radio" className="btn-check" id="btn1" autocomplete="off" checked />
          <label className="btn btn-outline-dark" for="btn1">부동산</label>
        </div>

        <div className="search_bar">
          <input type="text" className="searchBar"/>
          <button className="searchBtn">검색</button>
        </div>

        <div className="search_results">
          <div>

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
