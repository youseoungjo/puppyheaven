import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
  const [productdatas, setProductdatas] = useState([]);
  const [originalProductdatas, setOriginalProductdatas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductdatas = async () => {
      const response = await axios.get('http://localhost:3001/productdata');
      setProductdatas(response.data);
      setOriginalProductdatas(response.data);
    };
    getProductdatas();
  }, []);

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
            </div>
          </div>

          <div className="price-compare">

                  {productdata.map((product) => (
                    <div key={product.id}>
                      <div className="compare-title">{product.name}</div>
                      <div className="compare-left">
                        <img src={product.image} alt={product.name} className="compare-img" />
                      </div>
                    </div>
                    ))}

                  <div className="compare-right">

                    <table>
                      <tr>
                        <td>
                          <span className="row-price-title">최저가</span>
                        </td>
                        <td className="row-price">
                          <a href={lowestPriceUrl}>{getTotalPrice()}원</a>
                        </td>
                        <td>
                          <button className="row-price-btn" onClick={() => {if(lowestPriceUrl){window.location.href=lowestPriceUrl;}}}>최저가 구매하기</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="deliveryfee" colSpan={"3"}>
                          <label>
                            &nbsp;<input type="checkbox" checked={includeDelivery} onChange={() => setIncludeDelivery(!includeDelivery)} />&nbsp;
                            배송비 포함
                          </label>
                        </td>
                      </tr>
                      {sortedProducts.map((product) => (
                      <tr>
                        <td className="shop-img"><img src={product.image} alt="쇼핑몰 로고"/></td>
                        <td>{includeDelivery ? <a href={product.url}>{product.price + product.deliveryFee}원</a> : <a href={product.url}>{product.price}원</a>}</td>
                        <td>{product.deliveryFee === 0 ? '무료배송' : `${product.deliveryFee}원`}</td>
                      </tr>
                      ))}
                    </table>

                  </div>    
        </div>
      </div>
    </div>
  );
};

export default PriceCompare;