
import React , { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductData from "../ProductData";
import { ListGroupItem } from "react-bootstrap";

import ProductList from '../components/ProductList';
// import SignUpForm from '../components/SignUpForm';

const Shop = ({cartItem, setCartItem}) => {


  const [data, setData] = useState([]);


  const navigate = useNavigate();



  const [products, setProducts] = useState(ProductData);


    // category

    const [categoryProducts, setCategoryProducts] = useState(ProductData);

    const categoryFilterResult = (category) => {
      if (category === 'all') {
        setProducts(ProductData);
      } else {
        const filteredProducts = ProductData.filter(product => product.category === category);
        setProducts(filteredProducts);
      }
    };
 

  // Cart


  
  const [quantity, setQuantity] = useState(1);


  const handleQuantity = (type) => {
    if (type === 'plus') {
        setQuantity(quantity + 1)
    } else {
        if (quantity === 1) return;
        setQuantity(quantity - 1)
    }
  }


  console.log(cartItem);

  const handleAddCart = (product) => {
    setCartItem([...cartItem, product]);
}

const handleRemoveCart = (product) => {
    const newCartItem = cartItem.filter(item => item.id !== product.id);
    setCartItem(newCartItem);
}

const showCartItem = () => {
    return cartItem.map(item => (
        <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button onClick={()=> handleRemoveCart(item)}>삭제</button>
        </div>
    ));
}




  return (
    <div className="Shop">


        <div className="Logo">
          <img src="shortlogo.png" alt="로고 이미지" className="logo-image"></img>
        </div>

        <div className="Shop-content">
            <div className="Category">
              <div className="list-group list-group-flush">
                  <div style={{margin: "10px"}}/>
                  <button type="button" className="list-group-item" onClick={()=>navigate('/main')}>메인화면</button>
                  <button type="button" className="list-group-item" onClick={()=>navigate('/shop')}>계속 쇼핑하기</button>
                  <button type="button" className="list-group-item" onClick={()=>navigate('/cart')}>장바구니</button>
                  <div style={{margin: "30px"}}/>
                  <section>
                      <div className="list-group-item"><button className="cate_btn" onClick={()=>categoryFilterResult('all')}>all</button></div>
                      <div className="list-group-item"><button className="cate_btn" onClick={()=>categoryFilterResult('category1')}>카테고리1</button></div>
                      <div className="list-group-item"><button className="cate_btn" onClick={()=>categoryFilterResult('category2')}>카테고리2</button></div>
                      <div className="list-group-item"><button className="cate_btn" onClick={()=>categoryFilterResult('category3')}>카테고리3</button></div>
                      <div className="list-group-item"><button className="cate_btn" onClick={()=>categoryFilterResult('category4')}>카테고리4</button></div>
                      <div className="list-group-item"><button className="cate_btn" onClick={()=>categoryFilterResult('category5')}>카테고리5</button></div>
                  </section>
                </div>
            </div>


            <div className="product-list">

              <ProductList productData={products} addCart={handleAddCart} />

            </div>

            <div className="product-compare-list">

              {/* <ProductCompareList /> */}

            </div>
        </div>
    </div>

  )
}

export default Shop;
