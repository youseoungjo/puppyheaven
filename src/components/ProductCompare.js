import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCompare = () => {
  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

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
    <div className="ProductCompare">
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
  );
};

export default ProductCompare;
