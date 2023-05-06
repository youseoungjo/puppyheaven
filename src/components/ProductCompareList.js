import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PriceCompare from './ProductCompare';

const ProductCompareList = ({ selectedProducts }) => {

  const navigate = useNavigate();

  const handleCompareClick = () => {
    navigate('/productcompare');
    return <PriceCompare selectedProducts={selectedProducts} />;
  };

  return (
    <div className="ProductCompareList">
    {selectedProducts.length === 0 ? (
      <p>선택된 상품이 없습니다.</p>
    ) : (
      <div>
        {selectedProducts.map((product) => (
          <div key={`${product.name}-${product.kg}`}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}원</p>
          </div>
        ))}
      </div>
    )}
    <button onClick={handleCompareClick}>상품 비교</button>
  </div>
  );
};

export default ProductCompareList;