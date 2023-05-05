import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProductList = ({ productData, handleFavoriteClick, handleAddWish, handleRemoveWish, wishItem }) => {
  const [coupangs, setCoupangs] = useState([]);
  const [gmarkets, setGmarkets] = useState([]);
  const [elevens, setElevens] = useState([]);
  const [products, setProducts] = useState([]);

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

  // const saveToLocalStorage = (key, value) => {
  //   localStorage.setItem(key, JSON.stringify(value));
  // };

  // const handleFavoriteClick = (id) => {
  //   const newProducts = products.map((product) => {
  //     if (product.id === id) {
  //       return {
  //         ...product,
  //         isFavorited: !product.isFavorited,
  //       };
  //     } else {
  //       return product;
  //     }
  //   });
  
  //   setProducts(newProducts);
  //   saveToLocalStorage('products', newProducts); // 로컬 스토리지에 상품 데이터 저장
  // };

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

  const navigate = useNavigate();

  const handlePriceCompare = (productName, productKg) => {
    navigate(`/pricecompare?name=${productName}&kg=${productKg}`);
  };

  return (
    <div className="ProductList">
      <table>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} width="120" height="100" />
              </td>
              <td>
                {product.name}
              </td>
              <td>
                {uniqueSortedProducts.map((uniqueProduct) => (
                  <tr onClick={() => handlePriceCompare(product.name, uniqueProduct.kg)}>
                    {uniqueProduct.kg === 0 ? (
                      getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                        <>
                          {getPrice(product.name, uniqueProduct.kg)}원
                          <input type="checkbox" />
                        </>
                      )
                    ) : getPrice(product.name, uniqueProduct.kg) === Infinity ? null : (
                      <>
                        {uniqueProduct.kg}kg {getPrice(product.name, uniqueProduct.kg)}원
                        <input type="checkbox" />
                      </>
                    )}
                  </tr>
                ))}
              </td>
              <td onClick={() => {
                handleFavoriteClick(product.id);
                product.isFavorited ? handleRemoveWish(product) : handleAddWish(product);
                }} style={{ cursor: 'pointer' , color: wishItem.some((item) => item.id === product.id) ? 'red' : 'black'}}>
                  {wishItem.some((item) => item.id === product.id) ? '❤️' : '🤍'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
                
// import { useEffect, useState } from 'react';
// import React from 'react';
// import ProductData from '../ProductData';

// const ProductList = ({productData, addCart}) => {



//   const [products, setProducts] = useState(ProductData);

//   const formatter = new Intl.NumberFormat('ko-KR', {
//     style: 'currency',
//     currency: 'KRW'
//   });

//   // category

//   useEffect(() => {
//     setProducts(productData);
//   }, [productData]);

//   const handleFavoriteClick = (id) => {
//     const newProducts = products.map((product) => {
//       if (product.id === id) {
//         return {
//           ...product,
//           isFavorited: !product.isFavorited,
//         };
//       } else {
//         return product;
//       }
//     });

//     setProducts(newProducts);
//   };


//   return (
//     <div className="ProductList">

//       <table>
//         <tbody>
//         {products.map((product, index) => (
//           <React.Fragment key={index}>
//             <tr>
//               <td rowSpan="2" style={{ width: "150px", height: "150px" }}><img src={process.env.PUBLIC_URL + product.image} alt={product.name} width="120" height="100"/></td>
//               <td rowSpan="2" style={{ width: "200px", height: "150px" }}>{product.name}</td>
//               <td rowSpan="2" style={{ width: "100px", height: "150px" }}>{formatter.format(product.price)}</td>
//               <td className="cart" style={{ width: "150px", height: "75px" }}><button onClick={()=>addCart(product)}>카트에 담기</button></td>
//               <td rowSpan="2" onClick={() => handleFavoriteClick(product.id)} style={{ width: "100px", height: "75px", cursor: "pointer" }}>
//                   {product.isFavorited ? '❤️' : '🤍'}
//               </td>
//             </tr>
//             <tr>
//               <td className="compare" style={{ width: "150", height: "75px" }}><button>가격 비교</button></td>
//             </tr>
//           </React.Fragment>
//         ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default ProductList;