import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList  = (props) => {

  const [selectedProducts, setSelectedProducts] = useState([]);
  
    function handleCheckboxChange(event, product) {
      if (event.target.checked) {
        if (!selectedProducts.find(p => p.id === product.id)) {
          setSelectedProducts([...selectedProducts, product]);
        }
      } else {
        setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
      }
    }

  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [productdatas, setProductdatas] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
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

  const handleFavoriteClick = (id) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          isFavorited: !product.isFavorited,
        };
      } else {
        return product;
      }
    });

    setProducts(newProducts);
  };
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
        {productdatas.map((productdata) => (
          <tr>
            <td><a href={`/ProductCompare?id=${productdata.id}`}><img src={productdata.image} alt={productdata.name} width="120" height="100" /></a></td>
            <td><a href={`/ProductCompare?id=${productdata.id}`}>{productdata.name}</a></td>
            <td>
            {uniqueSortedProducts.map((product) => (
            <tr>
              {product.kg === 0 ? (
                getPrice(productdata.name, product.kg) === Infinity ? null : <a href={`/ProductCompare?id=${productdata.id}`}>{getPrice(productdata.name, product.kg)}원<input type="checkbox"/></a>
              ) : (
                getPrice(productdata.name, product.kg) === Infinity ? null : <a href={`/ProductCompare?id=${productdata.id}`}>{product.kg}kg {getPrice(productdata.name, product.kg)}원
                <input type="checkbox" onChange={event => handleCheckboxChange(event, product)} /></a>
              )}
            </tr>
            ))}
            </td>
            <td onClick={() => handleFavoriteClick(productdata.id)} style={{cursor: "pointer" }}>{productdata.isFavorited ? '❤️' : '🤍'}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    );
}; 



export default ProductList ;