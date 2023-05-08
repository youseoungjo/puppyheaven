import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    // useEffect(() => {
    //     // 로그인 상태를 확인합니다.
    //     const isLoggedIn = () => {
    //       const cookies = document.cookie.split("; ");
    //       for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].split("=");
    //         if (cookie[0] === "token") {
    //           return true;
    //         }
    //       }
    //       return false;
    //     };
    //     console.log("isLoggedIn", isLoggedIn());
    //     // 로그인 상태가 아니라면, 로그인 페이지로 이동합니다.
    //     if (!isLoggedIn()) {
    //       navigate("/");
    //     }
    //   }, [navigate]);

      const handleLogout = () => {
        // 쿠키를 삭제합니다.
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // 로그인 페이지로 이동합니다.
        navigate("/");
    };
    return (
        <div>
            <div><button onClick={handleLogout}>로그 아웃</button></div>
            <div className="Main">
                <button onClick={()=>navigate('/map')}>지도 보기</button>
                <button onClick={()=>navigate('/shop')}>상점 보기</button>
                <button onClick={()=>navigate('/video')}>영상 보기</button>
            </div>
        </div>
    );
};

export default Main;
