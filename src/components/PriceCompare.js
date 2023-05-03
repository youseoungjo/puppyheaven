import React from 'react';

const PriceCompare = ({ selectedProducts }) => {

    const columns = [
        { header: '이미지', field: 'image' },
        { header: '상품명', field: 'name' },
        { header: '연령대', field: 'age' },
        { header: '제조사', field: 'maker' },
      ];
    
      return (
        <div className="Shop">
            <div className="Logo">
                <img src="shortlogo.png" alt="로고 이미지" className="logo-image"></img>
            </div>
            <h2>상품 비교</h2>
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.field}>{column.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    {columns.map((column) => (
                      <td key={column.field}>{product[column.field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      );
};

export default PriceCompare;