import React from 'react';
import { useNavigate } from "react-router-dom";

const ProductCompareList = ({ selectedProducts }) => {

  const navigate = useNavigate();

  const handleCompareClick = () => {
    navigate('/productcompare');
  };

  return (
    <div className="ProductCompareList">
      <h4>상품 비교</h4>

      {selectedProducts.length > 0 && (
        <table>
          <tbody>
          {selectedProducts.map((product) => (
            <tr>
              <td><img src={product.image} alt={product.name} width="120" height="100"/></td>
              <td>{product.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
      <button onClick={handleCompareClick}>상품 비교</button>
    </div>
  );
};

export default ProductCompareList;