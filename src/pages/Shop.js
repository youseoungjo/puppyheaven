import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductCompareList from '../components/ProductCompareList';

const Shop = ({ wishItem, setWishItem }) => {
  const [productdatas, setProductdatas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProductdatas = async () => {
      const response = await axios.get('http://localhost:3001/productdata');
      setProductdatas(response.data);
    };
    getProductdatas();
  }, []);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  useEffect(() => {
    const savedProducts = loadFromLocalStorage('productdatas');
    const savedWishItem = loadFromLocalStorage('wishItem');
  
    if (savedProducts) {
      setProductdatas(savedProducts);
    }
  
    if (savedWishItem) {
      setWishItem(savedWishItem);
    }
  }, []);

  const categoryFilterResult = (category) => {
    if (category === 'all') {
      setProductdatas(productdatas);
    } else {
      const filteredProducts = productdatas.filter((productdata) => productdata.categoryid === category);
      setProductdatas(filteredProducts);
    }
  };

  const handleFavoriteClick = (id) => {
    const newProductdatas = productdatas.map((productdata) => {
      if (productdata.id === id) {
        return {
          ...productdata,
          isFavorited: !productdata.isFavorited,
        };
      } else {
        return productdata;
      }
    });

    setProductdatas(newProductdatas);
    saveToLocalStorage('productdatas', newProductdatas); // 로컬 스토리지에 상품 데이터 저장
    setWishItem(newProductdatas.filter((productdata) => productdata.isFavorited)); // 위시리스트 업데이트
  };
  const handleAddWish = (product) => {
    const isDuplicated = wishItem.some((item) => item.id === product.id);
  
    if (isDuplicated) {
      return;
    } else {
      const newWishItem = [...wishItem, product];
      setWishItem(newWishItem);
      saveToLocalStorage('wishItem', newWishItem); // 로컬 스토리지에 위시리스트 데이터 저장
    }
  };
  
  const handleRemoveWish = (product) => {
    const newWishItem = wishItem.filter((item) => item.id !== product.id);
    setWishItem(newWishItem);
    saveToLocalStorage('wishItem', newWishItem); // 로컬 스토리지에 위시리스트 데이터 저장
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
        <img src="shortlogo.png" alt="로고 이미지" className="logo-image"></img>
      </div>

      <div className="Shop-content">
          <div className="Category">
            <div className="list-group list-group-flush">
                <div style={{margin: "10px"}}/>
                  <button type="button" className="list-group-item" onClick={() => navigate('/main')}>메인화면</button>
                  <button type="button" className="list-group-item" onClick={() => navigate('/shop')}>계속 쇼핑하기</button>
                  <button type="button" className="list-group-item" onClick={() => navigate('/wish')}>위시리스트</button>
                <div style={{margin: "30px"}}/>
                <section>
                    <div className="list-group-item">
                      <button className="cate_btn" onClick={() => categoryFilterResult('all')}>
                      all
                      </button>
                    </div>
                    <div className="list-group-item">
                      <button className="cate_btn" onClick={() => categoryFilterResult('1')}>
                      애견 사료
                      </button>
                    </div>
                    <div className="list-group-item">
                      <button className="cate_btn" onClick={() => categoryFilterResult('2')}>
                      애견 장난감
                      </button>
                    </div>
                    <div className="list-group-item">
                      <button className="cate_btn" onClick={() => categoryFilterResult('3')}>
                      카테고리3
                      </button>
                    </div>
                    <div className="list-group-item">
                      <button className="cate_btn" onClick={() => categoryFilterResult('4')}>
                      카테고리4
                      </button>
                    </div>
                    <div className="list-group-item">
                      <button className="cate_btn" onClick={() => categoryFilterResult('5')}>
                      카테고리5
                      </button>
                    </div>
                </section>
            </div>
          </div>


          <div className="product-list">

              <ProductList
                productData={productdatas}
                handleFavoriteClick={handleFavoriteClick}
                handleAddWish={handleAddWish}
                handleRemoveWish={handleRemoveWish}
                handleCheckboxClick={handleCheckboxClick}
                wishItem={wishItem}
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

