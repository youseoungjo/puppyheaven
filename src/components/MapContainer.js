import React, { useState, useEffect } from 'react'

const { kakao } = window

const MapContainer = ({ searchPlace, addressList, isHospitalChecked }) => {




  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve([result[0].y, result[0].x]);
        } else {
          reject(status);
        }
      });
    });
  };

  useEffect(() => {
    const addLatLng = async () => {
      if (addressList.length > 0) {
        for (let i = 0; i < addressList.length; i++) {
          try {
            const LatLng = geocodeAddress(addressList[i]);
            console.log(LatLng);
            setCenter(new kakao.maps.LatLng(LatLng[0], LatLng[1]));
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        console.log('error');
      }
    };
    addLatLng();
  }, [addressList])
  
  const [center, setCenter] = useState(new kakao.maps.LatLng(37.5832206, 127.0103893)); 

  useEffect(() => {
  // 검색결과 배열에 담아줌
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

    const container = document.getElementById('myMap')
    const options = {
      center: center,
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace ? (isHospitalChecked ? searchPlace + '동물병원' : searchPlace + '공원') : '서울특별시 중구 세종대로 110', placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }

    
}, [center, searchPlace, addressList, isHospitalChecked])

  return (

    <div>

      <div
        id="myMap"
        style={{
          width: "65vw", height: "90%", marginLeft: "60px", marginTop: "45px", marginRight: "60px", marginBottom: "45px"
        }}
      > 

    </div>
  </div>
  )
}

export default MapContainer
