import React from 'react'
import AdminProductInfo from '../components/AdminProductInfo';
import AdminShoppingMall from '../components/AdminShoppingMall';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    return (
    <div className="Admin">

        <div className="Logo">
        <div onClick={() => navigate('/')}>
            <img src="shortlogo4.png" alt="로고 이미지" className="logo-image"/>
        </div>
        <div>
            <img src="puppylogo.png" alt="배경 이미지" className="logo-box"/>
        </div>

        {isLoggedIn ? (
        // 로그인 상태: 로그아웃 버튼 표시
        <div>
            <div className="logout-btn2" onClick={handleLogout}>
            <img src="logout.png" alt="로그아웃" className="logout-img" />
            <div className="logout-txt">로그아웃</div>
            </div>
            <div className="wish-btn" onClick={() => navigate('/wish')}>
            <img src="wishlist.png" alt="장바구니" className="wish-img" />
            <div className="wish-txt">장바구니</div>
            </div>
        </div>
        ) : (
            // 비로그인 상태: 로그인 버튼 표시
            <div className="login-btn2" onClick={() => navigate('/login')}>
            <img src="login.png" alt="로그인" className="login-img" />
            <div className="login-txt">로그인</div>
            </div>
        )}
        </div>

        <div className="admin_content">
            {/* <div className="Category">
            <div className="list-group list-group-flush">
                <div style={{margin: "10px"}}/>
                    <button type="button" className="list-group-item" onClick={() => navigate('/shop')}>계속 쇼핑하기</button>
                    <div style={{margin: "30px"}}/>
            </div>
        </div> */}

            <div className='product_info'>
                <AdminProductInfo/>
            </div>

            <div className='shopping_mall'>
                <AdminShoppingMall/>
            </div>


        </div>    
    </div>
    )
}

export default Admin;