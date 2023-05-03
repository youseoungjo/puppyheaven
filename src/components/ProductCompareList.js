import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProductList from './ProductList';
import PriceCompare from './PriceCompare';

const ProductCompareList = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const navigate = useNavigate();
  const handleCompareClick = () => {
    // 상품 비교 사이트로 이동하는 코드
    navigate('/PriceCompare');
    return <PriceCompare selectedProducts={selectedProducts} />;
  };

  return (
    <div className="ProductCompareList">
      <h4>상품 비교</h4>
      <ProductList setSelectedProducts={setSelectedProducts} />

      {selectedProducts.length > 0 && (
        <table>
          <thead>
            <tr>
              {selectedProducts.map((product) => (
                <th key={product.id}>{product.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {selectedProducts.map((product) => (
                <td key={product.id}><img src={product.image} alt={product.name} /></td>
              ))}
            </tr>
            <tr>
              {selectedProducts.map((product) => (
                <td key={product.id}>{product.weight}</td>
              ))}
            </tr>
            <tr>
              {selectedProducts.map((product) => (
                <td key={product.id}>{product.price}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      <button onClick={handleCompareClick}>상품 비교</button>
    </div>
  );
};

export default ProductCompareList;