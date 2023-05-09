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
        <div>
            <div><button onClick={handleLogout}>로그 아웃</button></div>
            <div className="Main">
                <button onClick={()=>navigate('/map')}>지도 보기</button>
                <button onClick={()=>navigate('/shop')}>상점 보기</button>
            </div>
        </div>
    );
};

export default Main;
