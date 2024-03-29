import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { useNavigate } from "react-router-dom";

const ProductList = ({ productData, handleFavoriteClick, handleCheckboxClick }) => {
  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishItems, setWishItems] = useState([]);



  useEffect(() => {
    const getWishItems = async () => {
      const response = await axios.get('http://localhost:3001/wishitem');
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      setWishItems(response.data.filter((wishitem) => wishitem.userId===userId));
    };
    getWishItems();

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

    setProducts(productData);
  }, [productData]);

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
  <div className="ProductList">
    <table>
      <tbody>
        {products.map((product) => {
          const wishItem = wishItems.find((item) => item.productId === product.id);
          const isFavorited = wishItem ? true : false;
          return (
            <tr key={product.id} className="Product-box">
              <td className="Product-img">
                <img src={product.image} alt={product.name} width="120" height="100" style={{ borderRadius: '10%' }}/>
              </td>
              <td className="Product-name">
                {product.name}
              </td>
              <td className="Product-price" title="가격 비교하기">
                {uniqueSortedProducts.map((uniqueProduct) => (
                  <tr key={uniqueProduct.kg}>
                    {uniqueProduct.kg === 0 ? (
                      <a href={`/pricecompare?name=${encodeURIComponent(product.name)}&kg=${uniqueProduct.kg}`}>
                        {getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                          <>
                            {getPrice(product.name, uniqueProduct.kg).toLocaleString()}원
                          </>
                        )}
                      </a>
                    ) : (
                      <a href={`/pricecompare?name=${encodeURIComponent(product.name)}&kg=${uniqueProduct.kg}`}>
                        {getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                          <>
                            {uniqueProduct.kg}kg {getPrice(product.name, uniqueProduct.kg).toLocaleString()}원
                          </>
                        )}
                      </a>
                    )}
                  </tr>
                ))}
              </td>
              <td className="Product-button" onClick={() => handleFavoriteClick(product.id)} style={{ cursor: "pointer", color: isFavorited ? "red" : "black", }} title="장바구니에 추가하기">
                {isFavorited ? "❤️" : "🤍"}
              </td>
              <td className="Product-button" title="상품 비교하기"><input type="checkbox" onClick={() => handleCheckboxClick(product)} style={{ cursor: "pointer", transform: 'scale(1.4)' }} /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
};

export default ProductList;
