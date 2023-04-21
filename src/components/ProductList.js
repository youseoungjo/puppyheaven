import { useEffect, useState } from 'react';
import React from 'react';
import ProductData from '../ProductData';

const ProductList = ({productData, addCart}) => {



  const [products, setProducts] = useState(ProductData);

  const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  });

  // category

  useEffect(() => {
    setProducts(productData);
  }, [productData]);

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


  return (
    <div className="ProductList">

      <table>
        <tbody>
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <tr>
              <td rowSpan="2" style={{ width: "150px", height: "150px" }}><img src={process.env.PUBLIC_URL + product.image} alt={product.name} width="120" height="100"/></td>
              <td rowSpan="2" style={{ width: "200px", height: "150px" }}>{product.name}</td>
              <td rowSpan="2" style={{ width: "100px", height: "150px" }}>{formatter.format(product.price)}</td>
              <td className="cart" style={{ width: "150px", height: "75px" }}><button onClick={()=>addCart(product)}>카트에 담기</button></td>
              <td rowSpan="2" onClick={() => handleFavoriteClick(product.id)} style={{ width: "100px", height: "75px", cursor: "pointer" }}>
                  {product.isFavorited ? '❤️' : '🤍'}
              </td>
            </tr>
            <tr>
              <td className="compare" style={{ width: "150", height: "75px" }}><button>가격 비교</button></td>
            </tr>
          </React.Fragment>
        ))}
        </tbody>
      </table>

    </div>
  );
};

export default ProductList;