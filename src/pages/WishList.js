import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ProductCompareList from '../components/ProductCompareList';
import { RiDeleteBin2Fill } from 'react-icons/ri';

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

    const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxClick = (product) => {
    if (selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) {
      // 이미 선택된 상품인 경우, 선택 해제
      const newSelectedProducts = selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id);
      setSelectedProducts(newSelectedProducts);
      localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts));
    } else {
      // 선택되지 않은 상품인 경우, 선택
      const newSelectedProducts = [...selectedProducts, product];
      setSelectedProducts(newSelectedProducts);
      localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts));
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
                <tr className="wish-list-box" height="160" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <td className="wish-list-img"><img src={process.env.PUBLIC_URL + item.image} alt={item.name} width="120" height="100" style={{ borderRadius: '10%' }}/></td>
                  <td className="wish-list-name">{item.name}</td>
                  <td className="wish-list-price">
                    {uniqueSortedProducts.map((uniqueProduct) => (
                        <tr key={uniqueProduct.kg}>
                            {uniqueProduct.kg === 0 ? (
                                <a href={`/pricecompare?name=${encodeURIComponent(item.name)}&kg=${uniqueProduct.kg}`}>
                                    {getPrice(item.name, uniqueProduct.kg) === Infinity ? null : (
                                        <>
                                            {getPrice(item.name, uniqueProduct.kg).toLocaleString()}원
                                        </>
                                    )}
                                </a>
                            ) : (
                                <a href={`/pricecompare?name=${encodeURIComponent(item.name)}&kg=${uniqueProduct.kg}`}>
                                    {getPrice(item.name, uniqueProduct.kg) === Infinity ? null : (
                                        <>
                                            {uniqueProduct.kg}kg {getPrice(item.name, uniqueProduct.kg).toLocaleString()}원
                                        </>
                                    )}
                                </a>
                            )}
                        </tr>
                    ))}
                  </td>
                  <td className="wish-list-delete-box"><RiDeleteBin2Fill className="wish-list-delete" onClick={()=>handleRemoveWish(item.id)}/></td>
                  <td className="wish-list-button" title="상품 비교하기"><input type="checkbox" onClick={() => handleCheckboxClick(item)} style={{ cursor: "pointer", transform: 'scale(1.4)' }} /></td>
                </tr>
              </React.Fragment>
            ))
    }


    return (
        <div className="WishList">

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
                  <img src="wishlist.png" alt="위시리스트" className="wish-img" />
                  <div className="wish-txt">위시리스트</div>
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

          <div className="wish_content">

            <div className="Category">
                <div className="list-group list-group-flush">
                    <div style={{margin: "10px"}}/>
                    <button type="button" className="list-group-item" onClick={()=>navigate('/shop')}>계속 쇼핑하기</button>
                    <div style={{margin: "30px"}}/>
                </div>
            </div>

            <div className="edit_wish">
                <div className="wish-title">위시리스트</div>
                

                <div className="wish-list">
                    <div className="row">

                        {matchedItems.length > 0 ? showWishItem() : <p>비어있음</p>}


                    </div>
                </div>

            </div>

            <div className="product-compare-list">

                <ProductCompareList
                  selectedProducts={selectedProducts}
                />

            </div>

            </div>
        </div>
    )
}

export default WishList;
