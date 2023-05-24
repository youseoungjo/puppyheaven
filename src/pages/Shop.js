import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductCompareList from '../components/ProductCompareList';
import jwt_decode from 'jwt-decode';

const Shop = () => {
  const [productdatas, setProductdatas] = useState([]);
  const [originalProductdatas, setOriginalProductdatas] = useState([]);
  const [wishItems, setWishItems] = useState([]);

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
    const getProductdatas = async () => {
      const response = await axios.get('http://localhost:3001/productdata');
      setProductdatas(response.data);
      setOriginalProductdatas(response.data);
    };
    getProductdatas();

    const getWishItems = async () => {
      const response = await axios.get('http://localhost:3001/wishitem');
      const token = localStorage.getItem('token');
      setWishItems(response.data.filter((wishitem) => String(wishitem.token)===String(token)));
    };
    getWishItems();
  }, []);
  
  const categoryFilterResult = (category) => {
    if (category === 'all') {
      setProductdatas(originalProductdatas);
    } else {
      const filteredProducts = originalProductdatas.filter((productdata) => productdata.categoryid === parseInt(category));
      setProductdatas(filteredProducts);
    }
  };

  const handleFavoriteClick = async (id) => {

    if (!isLoggedIn) {
      window.alert("로그인 후 위시리스트 등록이 가능합니다!"); // 로그인 필요 알림창
      return;
    }

    const newProductdatas = productdatas.map(async (productdata) => {
      if (productdata.id === id) {
        const isFavorited = !productdata.isFavorited;
        if (isFavorited) {
          await handleAddWish(id, isFavorited);
        } else {
          await handleRemoveWish(id);
        }
        return {
          ...productdata,
          isFavorited,
        };
      } else {
        return productdata;
      }
    });

    const updatedProductdatas = await Promise.all(newProductdatas);
    setProductdatas(updatedProductdatas);
  };

const handleAddWish = async (id, isFavorited) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.id;

  const productId = id;
  console.log(isFavorited)
  try {
    const response = await axios.post('http://localhost:3001/wishlist', { userId, productId, isFavorited });
    console.log(response.data);
    setWishItems([...wishItems, response.data]);
    // 해당 상품의 isFavorited 값을 true로 설정
    const newProductdatas = productdatas.map((productdata) => {
      if (productdata.id === id) {
        return {
          ...productdata,
          isFavorited: true,
        };
      } else {
        return productdata;
      }
    });
    setProductdatas(newProductdatas);
  } catch (error) {
    console.error(error);
  }
};

const handleRemoveWish = async (id) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.id;

  const productId = id;
  try {
    const response = await axios.post('http://localhost:3001/delete', { userId, productId });
    console.log(response.data);
    setWishItems(wishItems.filter((wishitem) => wishitem.productId !== productId));
    // 해당 상품의 isFavorited 값을 false로 설정
    const newProductdatas = productdatas.map((productdata) => {
      if (productdata.id === id) {
        return {
          ...productdata,
          isFavorited: false,
        };
      } else {
        return productdata;
      }
    });
    setProductdatas(newProductdatas);
  } catch (error) {
    console.error(error);
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

  return (
    <div className="Shop">


          <div className="Logo">
            <div onClick={() => navigate('/')}>
              <img src="shortlogo4.png" alt="로고 이미지" className="logo-image"/>
            </div>
            <div>
              <img src="puppylogo.png" alt="배경 이미지" className="logo-box"/>
            </div>

            {isLoggedIn ? (
            // 로그인 상태: 로그아웃 버튼 표시>
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

          <div className="Shop-content">
              <div className="Category">
                <div className="list-group list-group-flush">
                    <div style={{margin: "10px"}}/>
                        <button type="button" className="list-group-item" onClick={() => categoryFilterResult('all')}>All</button>
                        <button type="button" className="list-group-item" onClick={() => categoryFilterResult('1')}>애견 사료</button>
                        <button type="button" className="list-group-item" onClick={() => categoryFilterResult('2')}>애견 장난감</button>
                        <button type="button" className="list-group-item" onClick={() => categoryFilterResult('3')}>애견 용품</button>
                </div>
              </div>


              <div className="product-list">

                  <ProductList
                    productData={productdatas}
                    handleFavoriteClick={handleFavoriteClick}
                    handleCheckboxClick={handleCheckboxClick}
                  />

              </div>

              <div className="product-compare-list">

                <ProductCompareList
                  selectedProducts={selectedProducts}
                />

              </div>


          </div>
    </div>
)};

export default Shop;

