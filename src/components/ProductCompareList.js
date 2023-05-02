// import React, { useState } from 'react';
// import ProductList from './ProductList';

// function App() {
//   const [checkedProducts, setCheckedProducts] = useState([]);

//   function handleAddToCompare(productName, kg) {
//     const newCheckedProduct = {name: productName, kg: kg};
//     setCheckedProducts([...checkedProducts, newCheckedProduct]);
//   }

//   function handleRemoveFromCompare(productName, kg) {
//     const newCheckedProduct = {name: productName, kg: kg};
//     setCheckedProducts(checkedProducts.filter(product => JSON.stringify(product) !== JSON.stringify(newCheckedProduct)));
//   }

//   return (
//     <div className="ProductCompareList">
//       <div className="product-compare-list">
//         <h2>상품 비교</h2>
//         <ul>
//           {checkedProducts.map(product => (
//             <li key={`${product.name}-${product.kg}`}>
//               <img src={getProductImage(product.name)} alt={product.name} width="120" height="100" />
//               {product.kg === 0 ? (
//                 <div>{getPrice(product.name, product.kg)}원</div>
//               ) : (
//                 <div>{product.kg}kg {getPrice(product.name, product.kg)}원</div>
//               )}
//               <button onClick={() => handleRemoveFromCompare(product.name, product.kg)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <ProductList productData={products} addCart={handleAddCart} addToCompare={handleAddToCompare} removeFromCompare={handleRemoveFromCompare} />
//     </div>
//   );
// }

// export default ProductCompareList ;