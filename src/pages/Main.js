import React from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
      const confirmed = window.confirm("로그아웃 하시겠습니까?");
      
      if (confirmed) {
        localStorage.removeItem('token');
        navigate("/");
      }
    };
    return (
      <div className="Main">
          <div className="main-logo-box">
            <div className="main-logo">
              <img src="shortlogo.png" alt="로고 이미지" className="logo-image"/>
            </div>

            {isLoggedIn ? (
            // 로그인 상태: 로그아웃 버튼 표시
              <div className="logout-btn" onClick={handleLogout}>
                <img src="logout.png" alt="로그아웃" className="logout-img" />
                <div className="logout-txt">로그아웃</div>
              </div>
            ) : (
              // 비로그인 상태: 로그인 버튼 표시
              <div className="login-btn" onClick={() => navigate('/login')}>
                <img src="login.png" alt="로그인" className="login-img" />
                <div className="login-txt">로그인</div>
              </div>
            )}
          </div>

          <div className="main-text">
            <span>For Better Purchase</span><br/>
            <span>For Better Healthy Life</span><br/>
            <span className="korean"><span className="korean" style={{ color: "#A1BFEB", fontFamily: "GB"}}>퍼피해븐</span>은 애견인들을 위해 최선을 다하겠습니다.</span>
          </div>
      
          <div className="main-btn-box">
            <button className="main-btn" onClick={()=>navigate('/map')}> <img src="map.gif" alt="map" /> <span>PUPPY MAP</span> </button>
            <button className="main-btn" onClick={()=>navigate('/shop')}> <img src="shop.gif" alt="GIF 이미지" /> <span>PUPPY SHOP</span></button>
          </div>
      </div>
    );
};

export default Main;