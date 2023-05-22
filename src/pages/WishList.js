import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const WishList = () => {

    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        const confirmed = window.confirm("로그아웃 하시겠습니까?");
  
        if (confirmed) {
          localStorage.removeItem('token');
          navigate("/shop");
        }
    };

    const [coupangs, setCoupangs] = useState([]);
    const [gmarkets, setGmarkets] = useState([]);
    const [elevens, setElevens] = useState([]);
    const [wishItems, setWishItems] = useState([]);
    const [productdatas, setProductdatas] = useState([]);

    useEffect(() => {
        const getWishItems = async () => {
          const response = await axios.get('http://localhost:3001/wishitem');
          const token = localStorage.getItem('token');
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.id;
          setWishItems(response.data.filter((wishitem) => wishitem.userId===userId));
        };
        getWishItems();

        const getProductdatas = async () => {
          const response = await axios.get('http://localhost:3001/productdata');
          setProductdatas(response.data);
        };
        getProductdatas();

        const getCoupangs = async () => {
          const response = await axios.get('http://localhost:3001/coupang');
          setCoupangs(response.data);
        };
        getCoupangs();
    
        const getGmarkets = async () => {
          const response = await axios.get('http://localhost:3001/gmarket');
          setGmarkets(response.data);
        };
        getGmarkets();
    
        const getElevens = async () => {
          const response = await axios.get('http://localhost:3001/eleven');
          setElevens(response.data);
        };
        getElevens();
    
      }, []);
    
    
      const sortedCoupangs = [...coupangs].sort((a, b) => a.price - b.price);
      const sortedGmarkets = [...gmarkets].sort((a, b) => a.price - b.price);
      const sortedElevens = [...elevens].sort((a, b) => a.price - b.price);
      const sortedProducts = [...sortedCoupangs, ...sortedGmarkets, ...sortedElevens];
    
      const uniqueProducts = {};
      sortedProducts.forEach((product) => {
        if (!uniqueProducts[product.kg]) {
          uniqueProducts[product.kg] = product;
        } else if (product.price < uniqueProducts[product.kg].price) {
          uniqueProducts[product.kg] = product;
        }
      });
    
      const uniqueSortedProducts = Object.values(uniqueProducts).sort((a, b) => a.price - b.price);
    
      const getPrice = (name, kg) => {
        let minPrice = Infinity;
    
        // 쿠팡에서 가격 찾기
        coupangs.forEach((product) => {
          if (product.name === name && product.kg === kg && product.price < minPrice) {
            minPrice = product.price;
          }
        });
    
        // 지마켓에서 가격 찾기
        gmarkets.forEach((product) => {
          if (product.name === name && product.kg === kg && product.price < minPrice) {
            minPrice = product.price;
          }
        });
    
        // 11번가에서 가격 찾기
        elevens.forEach((product) => {
          if (product.name === name && product.kg === kg && product.price < minPrice) {
            minPrice = product.price;
          }
        });
    
        return minPrice;
      };

    const matchedItems = productdatas.filter((product) => {
      return wishItems.some((wishitem) => wishitem.productId === product.id);
    });
    
    const handleRemoveWish = (id) => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      const productId = id;
      axios.post('http://localhost:3001/delete', { userId, productId })
      .then((response) => {
        console.log(response.data);
        setWishItems(wishItems.filter((wishitem) => wishitem.productId !== productId));
      })
      .catch((error) => {
        console.error("error");
      });
    };
  

    const showWishItem = () => {
        return matchedItems.map(item => (

              <React.Fragment key={item.id}>
                <tr>
                  <td rowSpan="2" style={{ width: "150px", height: "150px" }}><img src={process.env.PUBLIC_URL + item.image} alt={item.name} width="120" height="100"/></td>
                  <td rowSpan="2" style={{ width: "200px", height: "150px" }}>{item.name}</td>
                  <td>
                    {uniqueSortedProducts.map((uniqueProduct) => (
                        <tr key={uniqueProduct.kg}>
                            {uniqueProduct.kg === 0 ? (
                                <a href={`/pricecompare?name=${encodeURIComponent(item.name)}&kg=${uniqueProduct.kg}`}>
                                    {getPrice(item.name, uniqueProduct.kg) === Infinity ? null : (
                                        <>
                                            {getPrice(item.name, uniqueProduct.kg)}원
                                        </>
                                    )}
                                </a>
                            ) : (
                                <a href={`/pricecompare?name=${encodeURIComponent(item.name)}&kg=${uniqueProduct.kg}`}>
                                    {getPrice(item.name, uniqueProduct.kg) === Infinity ? null : (
                                        <>
                                            {uniqueProduct.kg}kg {getPrice(item.name, uniqueProduct.kg)}원
                                        </>
                                    )}
                                </a>
                            )}
                        </tr>
                    ))}
                  </td>
                  <td className="cart" style={{ width: "150px", height: "75px" }}><button onClick={()=>handleRemoveWish(item.id)}>제거</button></td>
                </tr>
              </React.Fragment>
            ))
    }


    return (
        <div className="WishList">

          <div className="Logo">
            <div onClick={() => navigate('/')}>
              <img src="shortlogo2.png" alt="로고 이미지" className="logo-image"/>
            </div>
            <div>
              <img src="puppylogo.png" alt="배경 이미지" className="logo-box"/>
            </div>

            {isLoggedIn ? (
            // 로그인 상태: 로그아웃 버튼 표시
              <div className="logout-btn2" onClick={handleLogout}>
                <img src="logout.png" alt="로그아웃" className="logout-img" />
                <div className="logout-txt">로그아웃</div>
              </div>
            ) : (
              // 비로그인 상태: 로그인 버튼 표시
              <div className="login-btn2" onClick={() => navigate('/login')}>
                <img src="login.png" alt="로그인" className="login-img" />
                <div className="login-txt">로그인</div>
              </div>
            )}
          </div>

          <div className="wish_content">

            <div className="Category">
                <div className="list-group list-group-flush">
                    <div style={{margin: "10px"}}/>
                    <button type="button" className="list-group-item" onClick={()=>navigate('/')}>메인화면</button>
                    <button type="button" className="list-group-item" onClick={()=>navigate('/shop')}>계속 쇼핑하기</button>
                    <div style={{margin: "30px"}}/>
                </div>
            </div>

            <div className="edit_wish">
                <header style={{margin:"15px"}}>위시리스트</header>


                

                <div className="col-md-9">
                    <div className="row">

                        {matchedItems.length > 0 ? showWishItem() : <p>비어있음</p>}


                    </div>
                </div>

            </div>

            </div>
        </div>
    )
}

export default WishList;
