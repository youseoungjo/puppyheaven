import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchPlaces, setSearchPlaces] = useState([]);

  useEffect(() => {
    const loadScript = () => {
      if (window.kakao && window.kakao.maps) {
        setScriptLoaded(true);
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5832206, 127.0103893),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
        setMarker(null);
      } else {
        setTimeout(loadScript, 100);
      }
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

  const displayPlaces = (places) => {
    removeAllMarkers();

    const bounds = new window.kakao.maps.LatLngBounds();
    places.forEach((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      marker.setMap(map);
      bounds.extend(marker.getPosition());

      setSearchPlaces((prevPlaces) => [...prevPlaces, marker]);
    });

    map.setBounds(bounds);
  };

  const removeAllMarkers = () => {
    searchPlaces.forEach((marker) => {
      marker.setMap(null);
    });
    setSearchPlaces([]);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressSearch = (e) => {
    e.preventDefault();
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert('지도를 로드 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    
    const places = new window.kakao.maps.services.Places(map);
    places.keywordSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(result);
      } else {
        alert("검색 결과를 찾을 수 없습니다. 다른 키워드를 입력해 주세요.");
      }
    });
  };

  return (
    <div className="Map">
      <div className="Logo">
        <img
          src="shortlogo.png"
          alt="로고 이미지"
          className="logo-image"
        ></img>
      </div>

      <div className="search_wrapper">
        <div className="btn-group-md" role="group">
          <input
            type="radio"
            className="btn-check"
            id="mainbtn"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-dark"
            htmlFor="mainbtn"
            onClick={() => navigate("/main")}
          >
            Main
          </label>
          <input
            type="radio"
            className="btn-check"
            id="btn1"
            name="options"
            autoComplete="off"
            defaultChecked
          />
          <label className="btn btn-outline-dark" htmlFor="btn1">
            동물병원
          </label>
          <input
            type="radio"
            className="btn-check"
            id="btn2"
            name="options"
            autoComplete="off"
          />
          <label className="btn btn-outline-dark" htmlFor="btn2">
            산책로
          </label>
        </div>

        <div className="search_bar">
        <form onSubmit={handleAddressSearch}>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            autoComplete="off"
            className="searchBar"
            placeholder="키워드 검색"
          />
          <button type="submit" className="searchBtn">
            검색
          </button>
        </form>
      </div>

        <div className="search_results">
          <div></div>
        </div>
      </div>

      <div className="map_wrapper">
        <div
          id="map"
          style={{
            width: "92%",
            height: "90%",
            marginLeft: "60px",
            marginTop: "45px",
          }}
        />
      </div>
    </div>
  );
};

export default Map;