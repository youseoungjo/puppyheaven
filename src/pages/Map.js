import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Map = () => {

  const navigate = useNavigate();

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
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=APP_KEY&libraries=services,clusterer,drawing&autoload=false`;
    script.onload = loadScript;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      // document.cookie = "cookieName=cookieValue; SameSite=Strict; Secure";
    };
  }, []);

  return (
    <div className="Map">

      <div className="Logo">
        <img src="shortlogo.png" alt="로고 이미지" className="logo-image"></img>
      </div>

      <div className="search_wrapper">

        {/* <div className="btn-toolbar" role="toolbar"> */}

        <div className="btn-group-md" role="group">
          <input type="radio" className="btn-check" id="mainbtn" autoComplete="off"/>
            <label className="btn btn-outline-dark" htmlFor="mainbtn" onClick={() => navigate('/main')}>
              Main
            </label>
          <input type="radio" className="btn-check" id="btn1" name="options" autoComplete="off" defaultChecked />
          <label className="btn btn-outline-dark" htmlFor="btn1">동물병원</label>
          <input type="radio" className="btn-check" id="btn2" name="options" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="btn2">산책로</label>
        </div>
        {/* </div> */}

        <div className="search_bar">
          <input type="text" autoComplete="off" className="searchBar"/>
          <button className="searchBtn">검색</button>
        </div>

        <div className="search_results">
          <div>

          </div>
        </div>

      </div>

      <div className="map_wrapper">
        <div id="map" style={{ width: "92%", height: "90%", marginLeft: "60px", marginTop: "45px" }}/>
      </div>




    </div>
  );
};

export default Map;
