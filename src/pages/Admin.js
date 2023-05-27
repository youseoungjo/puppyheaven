import React from 'react'
import AdminProductInfo from '../components/AdminProductInfo';
import AdminShoppingMall from '../components/AdminShoppingMall';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate();

    
    const handleLogout = () => {
        const confirmed = window.confirm("로그아웃 하시겠습니까?");
  
        if (confirmed) {
          navigate("/shop");
        }
    };

    return (
    <div className="Admin">

        <div className="Logo">
        <div onClick={() => navigate('/')}>
            <img src="shortlogo4.png" alt="로고 이미지" className="logo-image"/>
        </div>
        <div>
            <img src="puppylogo.png" alt="배경 이미지" className="logo-box"/>
        </div>

        <div>
            <div className="logout-btn2" onClick={handleLogout}>
            <img src="logout.png" alt="로그아웃" className="logout-img" />
            <div className="logout-txt">로그아웃</div>
            </div>
        </div>

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