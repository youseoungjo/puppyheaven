import React, { useState, useEffect } from 'react';

const ProductCompare = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const savedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
    if (savedSelectedProducts) {
      setSelectedProducts(savedSelectedProducts);
    }
  }, []);

  return (
    <div className="ProductCompare">
      <h4>상품 비교</h4>

      {selectedProducts && selectedProducts.length > 0 && (
        <table>
          <tbody>
          {selectedProducts.map((product) => (
            <td>
              <tr><img src={product.image} alt={product.name} width="120" height="100"/></tr>
              <tr>{product.name}</tr>
              <tr>{product.age}</tr>
              <tr>{product.maker}</tr>
            </td>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductCompare;
