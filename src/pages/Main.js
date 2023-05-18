import React from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

      const handleLogout = () => {
        // localStorage에서 token 삭제
        localStorage.removeItem('token');
        // 로그인 페이지로 이동합니다.
        navigate("/");
    };
    return (
      <div className="Main">
          <div className="main-logo">
            <img src="shortlogo.png" alt="로고 이미지" className="logo-image"/>
            <div className="logout-btn" onClick={handleLogout}>
              <img src="logoutv2.png" alt="로그아웃" className="logout-img" />
              <span>로그 아웃</span>
            </div>
          </div>
      
          <div>
            <button className="main-btn" onClick={()=>navigate('/map')}> <img src="map.gif" alt="map" /> <span>PUPPY MAP</span> </button>
            <button className="main-btn" onClick={()=>navigate('/shop')}> <img src="shop.gif" alt="GIF 이미지" /> <span>PUPPY SHOP</span></button>
          </div>
      </div>
    );
};

export default Main;