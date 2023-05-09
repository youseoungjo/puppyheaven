import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';

const ProductCompare = () => {
  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productdatas, setProductdatas] = useState([]);
  const [originalProductdatas, setOriginalProductdatas] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getProductdatas = async () => {
      const response = await axios.get('http://localhost:3001/productdata');
      setProductdatas(response.data);
      setOriginalProductdatas(response.data);
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

  const categoryFilterResult = (category) => {
    if (category === 'all') {
      setProductdatas(originalProductdatas);
    } else {
      const filteredProducts = originalProductdatas.filter((productdata) => productdata.categoryid === parseInt(category));
      setProductdatas(filteredProducts);
    }
  };

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
                <button type="button" className="list-group-item" onClick={() => categoryFilterResult('all')}>All</button>
                <button type="button" className="list-group-item" onClick={() => categoryFilterResult('1')}>애견 사료</button>
                <button type="button" className="list-group-item" onClick={() => categoryFilterResult('2')}>애견 장난감</button>
              </section> 
            </div>
          </div>

          <div className="product-compare">
            <h4>상품 비교</h4>

            {selectedProducts && selectedProducts.length > 0 && (
              <table>
                <tbody>
                {selectedProducts.map((product) => (
                  <td>
                    <tr><img src={product.image} alt={product.name} width="120" height="100"/></tr>
                    <tr>{product.name}</tr>
                    {uniqueSortedProducts.map((uniqueProduct) => (
                      <tr key={uniqueProduct.kg}>
                        {uniqueProduct.kg === 0 ? (
                          <a href={`/pricecompare?name=${encodeURIComponent(product.name)}&kg=${uniqueProduct.kg}`}>
                            {getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                              <>
                                {getPrice(product.name, uniqueProduct.kg)}원
                              </>
                            )}
                          </a>
                        ) : (
                          <a href={`/pricecompare?name=${encodeURIComponent(product.name)}&kg=${uniqueProduct.kg}`}>
                            {getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                              <>
                                {uniqueProduct.kg}kg {getPrice(product.name, uniqueProduct.kg)}원
                              </>
                            )}
                          </a>
                        )}
                      </tr>
                    ))}
                    <tr>{product.age}</tr>
                    <tr>{product.maker}</tr>
                  </td>
                ))}
                </tbody>
              </table>
            )}
          </div>
      </div>
    </div>
  );
};

export default ProductCompare;
