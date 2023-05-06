import React, { useState } from 'react';

const ProductCompareList = ({ selectedProducts }) => {


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
    <button>상품 비교</button>
  </div>
  );
};

export default ProductCompareList;