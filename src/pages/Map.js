import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import MapContainer from '../components/MapContainer'
import MapSearchResults from '../components/MapSearchResults';

function Map() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')
  const [addresses, setAddresses] = useState([]);
  const [isHospitalChecked, setIsHospitalChecked] = useState(true);

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
      const confirmed = window.confirm("로그아웃 하시겠습니까?");

      if (confirmed) {
        localStorage.removeItem('token');
        navigate("/shop");
      }
  };


  useEffect(() => {
    const getAddresses = async () => {
      const response = await axios.get('http://localhost:3001/geocode');
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      setAddresses(response.data.filter((address) => address.id===userId));
    };
    getAddresses();
  }, [])

  const addressList = addresses.filter((address) => address.address).map((address) => address.address);

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  const handleHospitalClick = () => {
    setIsHospitalChecked(true);
  };

  const handleParkClick = () => {
    setIsHospitalChecked(false);
  };

  console.log(InputText)
  console.log(Place)
  return (
    <div className="Map">
      <div className="Logo">
        <div className='title-logo' onClick={() => navigate('/')}>
          <img src="shortlogo4.png" alt="로고 이미지" className="logo-image"/>
        </div>
        <div>
          <img src="puppylogo2.png" alt="배경 이미지" className="banner"/>
        </div>

        {isLoggedIn ? (
          <div>
            <div className="logout-btn2" onClick={handleLogout}>
              <img src="logout.png" alt="로그아웃" className="logout-img" />
              <div className="logout-txt">로그아웃</div>
            </div>
          </div>
          ) : (
            <div className="login-btn2" onClick={() => navigate('/login')}>
              <img src="login.png" alt="로그인" className="login-img" />
              <div className="login-txt">로그인</div>
            </div>
              
            )}
          </div>

      <div className="search_wrapper">
        <div className="btn-group-md" role="group">
          <input
            type="radio"
            className="btn-check"
            id="btn1"
            name="options"
            autoComplete="off"
            defaultChecked={!isHospitalChecked}
            onClick={handleHospitalClick}
          />
          <label className={`btn ${!isHospitalChecked ? 'active' : ''}`}
          htmlFor="btn1">
            동물병원
          </label>
          <input
            type="radio"
            className="btn-check"
            id="btn2"
            name="options"
            autoComplete="off"
            defaultChecked={isHospitalChecked}
            onClick={handleParkClick}
          />
          <label className={`btn ${isHospitalChecked ? 'active' : ''}`}
           htmlFor="btn2">
            산책로
          </label>
        </div>

        <div className="search_bar">
          <>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input className='search_input' placeholder=" 검색어를 입력하세요" onChange={onChange} value={InputText} />
              <button className='searchBtn' type="submit">검색</button>
            </form>
          </>
        </div>

        <div className="search_results">
          <MapSearchResults searchPlace={Place} addressList={addressList} isHospitalChecked={isHospitalChecked}/>
        </div>
      </div>

      <div className="map_wrapper">
        <MapContainer searchPlace={Place} addressList={addressList} isHospitalChecked={isHospitalChecked}/>
      </div>
    </div>
  );
}

export default Map;
