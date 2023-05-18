import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import MapContainer from '../components/MapContainer'
import MapSearchResults from '../components/MapSearchResults'

function Map() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

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
          <>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
              <button type="submit">검색</button>
            </form>
          </>
        </div>

        <div className="search_results">
          <MapSearchResults searchPlace={Place} />
        </div>
      </div>

      <div className="map_wrapper">
        <MapContainer searchPlace={Place} />
      </div>
    </div>
  );
}

export default Map

