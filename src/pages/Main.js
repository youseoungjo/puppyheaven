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
          <div className="main-logo-box">
            <div className="main-logo">
              <img src="shortlogo.png" alt="로고 이미지" className="logo-image"/>
              <span>PUPPY HEAVEN</span>
            </div>

            <div className="logout-btn" onClick={handleLogout}>
              <img src="logout.png" alt="로그아웃" className="logout-img" />
              <div className="logout-txt">로그아웃</div>
            </div>
          </div>

          <div className="main-text">
            <span>For Better Purchase</span><br/>
            <span>For Better Healthy Life</span><br/>
            <span className="korean">퍼피해븐은 애견인들을 위해 최선을 다하겠습니다.</span>
          </div>
      
          <div className="main-btn-box">
            <button className="main-btn" onClick={()=>navigate('/map')}> <img src="map.gif" alt="map" /> <span>PUPPY MAP</span> </button>
            <button className="main-btn" onClick={()=>navigate('/shop')}> <img src="shop.gif" alt="GIF 이미지" /> <span>PUPPY SHOP</span></button>
          </div>
      </div>
    );
};

export default Main;