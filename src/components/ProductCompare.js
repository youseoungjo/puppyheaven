import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCompare = () => {
  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

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


  useEffect(() => {
    const savedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
    if (savedSelectedProducts) {
      setSelectedProducts(savedSelectedProducts);
    }
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

  return (
    <div className="Shop">

          <div className="Logo">
            <div onClick={() => navigate('/')}>
              <img src="shortlogo2.png" alt="로고 이미지" className="logo-image"/>
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

      <div className="Shop-content">
          <div className="Category">
            <div className="list-group list-group-flush">
              <div style={{margin: "10px"}}/>
              <button type="button" className="list-group-item" onClick={() => navigate('/shop')}>계속 쇼핑하기</button>
              <div style={{margin: "30px"}}/>
            </div>
          </div>
          <div className="product-compare">
            <div className="pc-title">상품 비교</div>
            <div className="pc-product">
              {selectedProducts.map((product) => (
                <div className="pc-info" key={product.name}>
                    <div className="pc-img-box"><img src={product.image} alt={product.name} className="pc-img" style={{ borderRadius: '10%' }}/></div>
                    <div className="pc-name">{product.name}</div>
                    <div className="pc-price-box">
                    {uniqueSortedProducts.map((uniqueProduct) => (
                      <div key={uniqueProduct.kg} className="pc-price">
                        {uniqueProduct.kg === 0 ? (
                          <a href={`/pricecompare?name=${encodeURIComponent(product.name)}&kg=${uniqueProduct.kg}`}>
                            {getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                              <>{getPrice(product.name, uniqueProduct.kg)}원</>
                            )}
                          </a>
                        ) : (
                          <a href={`/pricecompare?name=${encodeURIComponent(product.name)}&kg=${uniqueProduct.kg}`}>
                            {getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                              <>{uniqueProduct.kg}kg {getPrice(product.name, uniqueProduct.kg)}원</>
                            )}
                          </a>
                        )}
                      </div>
                    ))}
                    </div>
                    <div div className="pc-age">{product.age}</div>
                    <div div className="pc-maker">{product.maker}</div>
                  </div>
              ))}
            </div>         
          </div>
      </div>
    </div>
  );
};

export default ProductCompare;
