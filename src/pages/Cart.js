
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductData from "../ProductData";
import { ListGroupItem } from "react-bootstrap";




const Cart = ({cartItem, setCartItem}) => {

    const [data, setData] = useState([]);


    const navigate = useNavigate();
    const filterResult = (catName) => {
        const result = ProductData.filter((curData)=>{
            return curData.category === catName;
        });
        setData(result);
    }

    const formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
      });
    
    const handleRemoveCart = (product) => {
        const newCartItem = cartItem.filter(item => item.id !== product.id);
        setCartItem(newCartItem);
    }


    const showCartItem = () => {
        return cartItem.map(item => (

              <React.Fragment key={item.id}>
                <tr>
                  <td rowSpan="2" style={{ width: "150px", height: "150px" }}><img src={process.env.PUBLIC_URL + item.image} alt={item.name} width="120" height="100"/></td>
                  <td rowSpan="2" style={{ width: "200px", height: "150px" }}>{item.name}</td>
                  <td rowSpan="2" style={{ width: "100px", height: "150px" }}>{formatter.format(item.price)}</td>
                  <td className="cart" style={{ width: "150px", height: "75px" }}><button onClick={()=>handleRemoveCart(item)}>제거</button></td>
                  <td rowSpan="2" onClick={() => handleFavoriteClick(item.id)} style={{ width: "100px", height: "75px", cursor: "pointer" }}>
                      {item.isFavorited ? '❤️' : '🤍'}
                  </td>
                </tr>
              </React.Fragment>
            ))
    }

    
    const handleQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            if (quantity === 1) return;
            setQuantity(quantity - 1)
        }
    }



    return (
        <div className="Cart">

            <div className="Category">
                <div className="list-group list-group-flush">
                    <div style={{margin: "10px"}}/>
                    <button type="button" className="list-group-item" onClick={()=>navigate('/main')}>메인화면</button>
                    <button type="button" className="list-group-item" onClick={()=>navigate('/shop')}>계속 쇼핑하기</button>
                    <button type="button" className="list-group-item" onClick={()=>navigate('/cart')}>장바구니</button>
                    <div style={{margin: "30px"}}/>
                    <section>
                        <div className="list-group-item"><button className="cate_btn" onClick={()=>{navigate("/shop"); setData(ProductData);}}>all</button></div>
                        <div className="list-group-item"><button className="cate_btn" onClick={()=>{navigate("/shop"); filterResult('category1');}}>카테고리1</button></div>
                        <div className="list-group-item"><button className="cate_btn" onClick={()=>{navigate("/shop"); filterResult('category2');}}>카테고리2</button></div>
                        <div className="list-group-item"><button className="cate_btn" onClick={()=>{navigate("/shop"); filterResult('category3');}}>카테고리3</button></div>
                        <div className="list-group-item"><button className="cate_btn" onClick={()=>{navigate("/shop"); filterResult('category4');}}>카테고리4</button></div>
                        <div className="list-group-item"><button className="cate_btn" onClick={()=>{navigate("/shop"); filterResult('category5');}}>카테고리5</button></div>

                    </section>
                </div>
            </div>

            <div className="edit_cart">
                <header style={{margin:"15px"}}>장바구니에 담은 상품</header>


                

                <div className="col-md-9">
                    <div className="row">

                        {cartItem.length > 0 ? showCartItem() : <p>비어있음</p>}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart;
