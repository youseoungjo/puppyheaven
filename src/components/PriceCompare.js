import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const PriceCompare = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productName = searchParams.get("name");
  const productKg = searchParams.get("kg");
  const [productdata, setProductdata] = useState([]);
  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [lowestPriceUrl, setLowestPriceUrl] = useState('');
  const [includeDelivery, setIncludeDelivery] = useState(false);

  useEffect(() => {
    console.log('name:', productName);
    console.log('kg:', productKg);

    const getProductdata = async () => {
      const response = await axios.get(`http://localhost:3001/productdata`);
      setProductdata(response.data.filter((productdata) => productdata.name===productName));
    };
    getProductdata();

    const getCoupangs = async () => {
      const response = await axios.get('http://localhost:3001/coupang');
      setCoupangs(response.data.filter((coupang) => coupang.name===productName && parseInt(coupang.kg)===parseInt(productKg)));
    };
    getCoupangs();

    const getGmarkets = async () => {
      const response = await axios.get('http://localhost:3001/gmarket');
      setGmarkets(response.data.filter((gmarket) => gmarket.name===productName && parseInt(gmarket.kg)===parseInt(productKg)));
    };
    getGmarkets();

    const getElevens = async () => {
      const response = await axios.get('http://localhost:3001/eleven');
      setElevens(response.data.filter((eleven) => eleven.name===productName && parseInt(eleven.kg)===parseInt(productKg)));
    };
    getElevens();

  }, [productName, productKg]);

  const sortedCoupangs = [...coupangs].sort((a, b) => a.price - b.price);
  const sortedGmarkets = [...gmarkets].sort((a, b) => a.price - b.price);
  const sortedElevens = [...elevens].sort((a, b) => a.price - b.price);
  const sortedProducts = [...sortedCoupangs, ...sortedGmarkets, ...sortedElevens];
  sortedProducts.sort((a, b) => a.price - b.price);

  const lowestPrice = sortedProducts.length > 0 ? sortedProducts[0].price : null;
  const lowestPriceProduct = sortedProducts.length > 0 ? sortedProducts[0] : null;
  const lowestPriceProductUrl = lowestPriceProduct ? lowestPriceProduct.url : '';

  useEffect(() => {
    setLowestPriceUrl(lowestPriceProductUrl);
  }, [lowestPriceProductUrl]);

  const getTotalPrice = () => {
    let totalPrice = lowestPrice;
    if (includeDelivery && lowestPriceProduct) {
      totalPrice += lowestPriceProduct.deliveryFee;
    }
    return totalPrice;
  }

  return (
    <div className="PriceCompare">
        {productdata.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} width="400" height="400" />
        </div>
        ))}
      <div>
      <h2>최저가:<a href={lowestPriceUrl}>{getTotalPrice()}원</a></h2>
      <label>
        <input type="checkbox" checked={includeDelivery} onChange={() => setIncludeDelivery(!includeDelivery)} />
        배송비 포함
      </label>
      <button onClick={() => {if(lowestPriceUrl){window.location.href=lowestPriceUrl;}}}>최저가 구매하기</button>
      {sortedProducts.map((product) => (
        <table>
            <tr>
              <td><img src={product.image} alt="쇼핑몰 로고"/></td>
              <td>{includeDelivery ? <a href={product.url}>{product.price + product.deliveryFee}원</a> : <a href={product.url}>{product.price}원</a>}</td>
              <td>{product.deliveryFee}원</td>
            </tr>
        </table>
        ))}
      </div>
    </div>
  );
};

export default PriceCompare;