import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PriceCompare from './ProductCompare';

const ProductCompareList = ({ selectedProduct }) => {

  const navigate = useNavigate();
  const handleCompareClick = () => {
    navigate('/productcompare');
    return <PriceCompare selectedProducts={selectedProduct} />;
  };

  return (
    <div className="ProductCompareList">
    {selectedProduct ? (
      <div>
        <img src={selectedProduct.image} alt={selectedProduct.name} />
        <p>{selectedProduct.name}</p>
        <p>{selectedProduct.price}원</p>
      </div>
    ) : (
      <p>선택된 상품이 없습니다.</p>
    )}
    <button onClick={handleCompareClick}>상품 비교</button>
  </div>
  );
};

export default ProductCompareList;