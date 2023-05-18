import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const WishList = ({wishItem, setWishItem}) => {

    const navigate = useNavigate();

    const [coupangs, setCoupangs] = useState([]);
    const [gmarkets, setGmarkets] = useState([]);
    const [elevens, setElevens] = useState([]);

    useEffect(() => {
        const getCoupangs = async () => {
          const response = await axios.get('http://localhost:3001/coupang');
          setCoupangs(response.data);
        };
        getCoupangs();
    
        const getGmarkets = async () => {
          const response = await axios.get('http://localhost:3001/gmarket');
          setGmarkets(response.data);
        };
        getGmarkets();
    
        const getElevens = async () => {
          const response = await axios.get('http://localhost:3001/eleven');
          setElevens(response.data);
        };
        getElevens();
    
      }, []);
    
    
      const sortedCoupangs = [...coupangs].sort((a, b) => a.price - b.price);
      const sortedGmarkets = [...gmarkets].sort((a, b) => a.price - b.price);
      const sortedElevens = [...elevens].sort((a, b) => a.price - b.price);
      const sortedProducts = [...sortedCoupangs, ...sortedGmarkets, ...sortedElevens];
    
      const uniqueProducts = {};
      sortedProducts.forEach((product) => {
        if (!uniqueProducts[product.kg]) {
          uniqueProducts[product.kg] = product;
        } else if (product.price < uniqueProducts[product.kg].price) {
          uniqueProducts[product.kg] = product;
        }
      });
    
      const uniqueSortedProducts = Object.values(uniqueProducts).sort((a, b) => a.price - b.price);
    
      const getPrice = (name, kg) => {
        let minPrice = Infinity;
    
        // 쿠팡에서 가격 찾기
        coupangs.forEach((product) => {
          if (product.name === name && product.kg === kg && product.price < minPrice) {
            minPrice = product.price;
          }
        });
    
        // 지마켓에서 가격 찾기
        gmarkets.forEach((product) => {
          if (product.name === name && product.kg === kg && product.price < minPrice) {
            minPrice = product.price;
          }
        });
    
        // 11번가에서 가격 찾기
        elevens.forEach((product) => {
          if (product.name === name && product.kg === kg && product.price < minPrice) {
            minPrice = product.price;
          }
        });
    
        return minPrice;
      };
    
    const handleRemoveWish = (product) => {
        const newWishItem = wishItem.filter(item => item.id !== product.id);
        setWishItem(newWishItem);
    }
    console.log(wishItem);


    const showWishItem = () => {
        return wishItem.map(item => (

              <React.Fragment key={item.id}>
                <tr>
                  <td rowSpan="2" style={{ width: "150px", height: "150px" }}><img src={process.env.PUBLIC_URL + item.image} alt={item.name} width="120" height="100"/></td>
                  <td rowSpan="2" style={{ width: "200px", height: "150px" }}>{item.name}</td>
                  <td>
                    {uniqueSortedProducts.map((uniqueProduct) => (
                        <tr key={uniqueProduct.kg}>
                            {uniqueProduct.kg === 0 ? (
                                <a href={`/pricecompare?name=${encodeURIComponent(item.name)}&kg=${uniqueProduct.kg}`}>
                                    {getPrice(item.name, uniqueProduct.kg) === Infinity ? null : (
                                        <>
                                            {getPrice(item.name, uniqueProduct.kg)}원
                                        </>
                                    )}
                                </a>
                            ) : (
                                <a href={`/pricecompare?name=${encodeURIComponent(item.name)}&kg=${uniqueProduct.kg}`}>
                                    {getPrice(item.name, uniqueProduct.kg) === Infinity ? null : (
                                        <>
                                            {uniqueProduct.kg}kg {getPrice(item.name, uniqueProduct.kg)}원
                                        </>
                                    )}
                                </a>
                            )}
                        </tr>
                    ))}
                  </td>
                  <td className="cart" style={{ width: "150px", height: "75px" }}><button onClick={()=>handleRemoveWish(item)}>제거</button></td>
                </tr>
              </React.Fragment>
            ))
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
                  <button type="button" className="list-group-item" onClick={() => navigate('/main')}>메인화면</button>
                  <button type="button" className="list-group-item" onClick={() => navigate('/shop')}>계속 쇼핑하기</button>
                  <button type="button" className="list-group-item" onClick={() => navigate('/wish')}>위시리스트</button>
                  <div style={{margin: "30px"}}/>
            </div>
          </div>

          <div className="Cart">
              <header style={{margin:"15px"}}>위시리스트</header>
              <div className="col-md-9">
                  <div className="row">

                      {wishItem.length > 0 ? showWishItem() : <p>비어있음</p>}

                  </div>
              </div>
          </div>

        </div>

      </div>
    )
}

export default WishList;
