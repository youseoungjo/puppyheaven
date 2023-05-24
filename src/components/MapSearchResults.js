import React, { useEffect, useState } from 'react'

const { kakao } = window

const MapSearchResults = ({ searchPlace, addressList, isHospitalChecked }) => {

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  let [drawingFlag, setDrawingFlag] = useState(false);
  let [moveLine, setMoveLine] = useState(null);
  let [clickLine, setClickLine] = useState(null);
  let [distanceOverlay, setDistanceOverlay] = useState(null);
  let [dots, setDots] = useState([]);

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
            const LatLng = await geocodeAddress(addressList[i]);
            console.log(LatLng);
            setCenter(new kakao.maps.LatLng(LatLng[0], LatLng[1]));
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setCenter(new kakao.maps.LatLng(37.5832206, 127.0103893));
      }
    };
    addLatLng();
  }, [addressList]);

  const [center, setCenter] = useState(new kakao.maps.LatLng(37.5832206, 127.0103893));
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = document.getElementById('myMap')
    const options = {
      center: center,
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    
    ps.keywordSearch(searchPlace ? (isHospitalChecked ? searchPlace + '동물병원' : searchPlace + '공원') : (isHospitalChecked ? addressList + '동물병원' : addressList + '공원'), placesSearchCB);
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
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

    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
 
      var clickPosition = mouseEvent.latLng;
  
      if (!drawingFlag) {
          drawingFlag = true;
          deleteClickLine();
          deleteDistnce();
          deleteCircleDot();
          clickLine = new kakao.maps.Polyline({map: map,  path: [clickPosition],strokeWeight: 3, strokeColor: '#db4040',strokeOpacity: 1, strokeStyle: 'solid' });
         
          moveLine = new kakao.maps.Polyline({strokeWeight: 3, strokeColor: '#db4040',strokeOpacity: 0.5,  strokeStyle: 'solid' });
          displayCircleDot(clickPosition, 0);
      } else {
          var path = clickLine.getPath();
          path.push(clickPosition);
          clickLine.setPath(path);
  
          var distance = Math.round(clickLine.getLength());
          displayCircleDot(clickPosition, distance);
      }
  });
  kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent) {

    if (drawingFlag){
     
        var mousePosition = mouseEvent.latLng;
        var path = clickLine.getPath();
        var movepath = [path[path.length-1], mousePosition];
        moveLine.setPath(movepath);    
        moveLine.setMap(map);
        
        var distance = Math.round(clickLine.getLength() + moveLine.getLength()), content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>'; showDistance(content, mousePosition);   
    }             
});              

kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {

  if (drawingFlag) {
      moveLine.setMap(null);
      moveLine = null;  
      var path = clickLine.getPath();
      if (path.length > 1) {
          if (dots[dots.length-1].distance) {
              dots[dots.length-1].distance.setMap(null);
              dots[dots.length-1].distance = null;    
          }

          var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
              content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다
              
          showDistance(content, path[path.length-1]);  
           
      } else {

          deleteClickLine();
          deleteCircleDot(); 
          deleteDistnce();

      }
      
      drawingFlag = false;          
  }  
});    

function deleteClickLine() {
  if (clickLine) {
      clickLine.setMap(null);    
      clickLine = null;        
  }
}
function showDistance(content, position) {
    
  if (distanceOverlay) { 
   
      distanceOverlay.setPosition(position);
      distanceOverlay.setContent(content);
      
  } else { 

      distanceOverlay = new kakao.maps.CustomOverlay({
          map: map, // 커스텀오버레이를 표시할 지도입니다
          content: content,  // 커스텀오버레이에 표시할 내용입니다
          position: position, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3  
      });      
  }
}
function deleteDistnce () {
  if (distanceOverlay) {
      distanceOverlay.setMap(null);
      distanceOverlay = null;
  }
}
function displayCircleDot(position, distance) {

  // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
  var circleOverlay = new kakao.maps.CustomOverlay({
      content: '<span class="dot"></span>',
      position: position,
      zIndex: 1
  });

  // 지도에 표시합니다
  circleOverlay.setMap(map);

  if (distance > 0) {
      // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
      var distanceOverlay = new kakao.maps.CustomOverlay({
          content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
          position: position,
          yAnchor: 1,
          zIndex: 2
      });

      // 지도에 표시합니다
      distanceOverlay.setMap(map);
  }

  // 배열에 추가합니다
  dots.push({circle:circleOverlay, distance: distanceOverlay});
}

// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
function deleteCircleDot() {
  var i;

  for ( i = 0; i < dots.length; i++ ){
      if (dots[i].circle) { 
          dots[i].circle.setMap(null);
      }

      if (dots[i].distance) {
          dots[i].distance.setMap(null);
      }
  }

  dots = [];
}
function getTimeHTML(distance) {

  // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
  var walkkTime = distance / 67 | 0;
  var walkHour = '', walkMin = '';

  // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
  if (walkkTime > 60) {
      walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
  }
  walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

  // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
  var bycicleTime = distance / 227 | 0;
  var bycicleHour = '', bycicleMin = '';

  // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
  if (bycicleTime > 60) {
      bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
  }
  bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

  // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
  var content = '<ul class="dotOverlay distanceInfo">';
  content += '    <li>';
  content += '        <span class="label">총거리</span><span class="number">' + distance + '</span>m';
  content += '    </li>';
  content += '    <li>';
  content += '        <span class="label">도보</span>' + walkHour + walkMin;
  content += '    </li>';
  content += '    <li>';
  content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
  content += '    </li>';
  content += '</ul>'

  return content;
}
  }, [center, searchPlace, isHospitalChecked, addressList])

  return (

    <div>
      <div className="search_results" style={{ maxHeight: '550px', overflowY: 'auto'}}>
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default MapSearchResults;
