import React from 'react';
import { useNavigate } from "react-router-dom";

const ProductCompareList = ({ selectedProducts }) => {

  const navigate = useNavigate();
  const handleCompareClick = () => {
    navigate('/productcompare');
  };

  return (
    <div className="ProductCompareList">

      <div className="pcl-title">상품 비교</div>

      <div className="pcl-product">
        {selectedProducts.length === 0 && (
          <div className="product-zero">
            <img src="checkv2.png" alt="발바닥" className="check-image"/>
            <div>체크박스를 눌러서 상품 비교를 해주세요</div>
          </div>
        )}
        {selectedProducts.length > 0 && (
          <table>
            <tbody>
            {selectedProducts.map((product) => (
              <tr>
                <td style={{ height: '120px' }}><img src={product.image} alt={product.name} width="120" height="100" style={{ borderRadius: '10%' }} /></td>
                <td style={{ width: '281px' }}>{product.name}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pcl-btn-box">
        <button className="pcl-btn" onClick={handleCompareClick}>상품 비교</button>
      </div>

    </div>
  );
};

export default ProductCompareList;