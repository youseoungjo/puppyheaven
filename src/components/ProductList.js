import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
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
            <td><img src={productdata.image} alt={productdata.name} width="120" height="100" /></td>
            <td><a href="/price">{productdata.name}</a></td>
            <td>
            {uniqueSortedProducts.map((product) => (
            <tr>
              {product.kg === 0 ? (
                getPrice(productdata.name, product.kg) === Infinity ? null : <a href="/price">{getPrice(productdata.name, product.kg)}원<input type="checkbox"/></a>
              ) : (
                getPrice(productdata.name, product.kg) === Infinity ? null : <a href="/price">{product.kg}kg {getPrice(productdata.name, product.kg)}원<input type="checkbox"/></a>
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
export default App;
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