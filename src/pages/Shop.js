import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductCompareList from '../components/ProductCompareList';
import jwt_decode from 'jwt-decode';

const Shop = () => {
  const [productdatas, setProductdatas] = useState([]);
  const [originalProductdatas, setOriginalProductdatas] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProductdatas = async () => {
      const response = await axios.get('http://localhost:3001/productdata');
      setProductdatas(response.data);
      setOriginalProductdatas(response.data);
    };
    getProductdatas();

    const getWishItems = async () => {
      const response = await axios.get('http://localhost:3001/wishitem');
      const token = localStorage.getItem('token');
      setWishItems(response.data.filter((wishitem) => String(wishitem.token)===String(token)));
    };
    getWishItems();
  }, []);
  
  const categoryFilterResult = (category) => {
    if (category === 'all') {
      setProductdatas(originalProductdatas);
    } else {
      const filteredProducts = originalProductdatas.filter((productdata) => productdata.categoryid === parseInt(category));
      setProductdatas(filteredProducts);
    }
  };

  const handleFavoriteClick = (id) => {
    const newProductdatas = productdatas.map((productdata) => {
      if (productdata.id === id) {
        const isFavorited = !productdata.isFavorited;
        if (isFavorited) {
          handleAddWish(id);
        } else {
          handleRemoveWish(id);
        }
        return {
          ...productdata,
          isFavorited,
        };
      } else {
        return productdata;
      }
    });
    setProductdatas(newProductdatas);
  };

  const handleAddWish = (id) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const productId = id;
    axios.post('http://localhost:3001/wishlist', { userId, productId })
    .then((response) => {
      console.log(response.data);
      setWishItems([...wishItems, response.data]);
      // 해당 상품의 isFavorited 값을 true로 설정
      const newProductdatas = productdatas.map((productdata) => {
        if (productdata.id === id) {
          return {
            ...productdata,
            isFavorited: true,
          };
        } else {
          return productdata;
        }
      });
      setProductdatas(newProductdatas);
    })
    .catch((error) => {
      console.error("error");
    });
  };
  
  const handleRemoveWish = (id) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const productId = id;
    axios.post('http://localhost:3001/delete', { userId, productId })
    .then((response) => {
      console.log(response.data);
      setWishItems(wishItems.filter((wishitem) => wishitem.productId !== productId));
      // 해당 상품의 isFavorited 값을 false로 설정
      const newProductdatas = productdatas.map((productdata) => {
        if (productdata.id === id) {
          return {
            ...productdata,
            isFavorited: false,
          };
        } else {
          return productdata;
        }
      });
      setProductdatas(newProductdatas);
    })
    .catch((error) => {
      console.error("error");
    });
  };
  
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleCheckboxClick = (product) => {
    if (selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) {
      // 이미 선택된 상품인 경우, 선택 해제
      const newSelectedProducts = selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id);
      setSelectedProducts(newSelectedProducts);
      localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts));
    } else {
      // 선택되지 않은 상품인 경우, 선택
      const newSelectedProducts = [...selectedProducts, product];
      setSelectedProducts(newSelectedProducts);
      localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts));
    }
  };

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
                  <section>
                    <button type="button" className="list-group-item" onClick={() => categoryFilterResult('all')}>All</button>
                    <button type="button" className="list-group-item" onClick={() => categoryFilterResult('1')}>애견 사료</button>
                    <button type="button" className="list-group-item" onClick={() => categoryFilterResult('2')}>애견 장난감</button>
                    <button type="button" className="list-group-item" onClick={() => categoryFilterResult('3')}>애견 용품</button>
                  </section>
            </div>
          </div>


          <div className="product-list">

              <ProductList
                productData={productdatas}
                handleFavoriteClick={handleFavoriteClick}
                handleCheckboxClick={handleCheckboxClick}
              />

          </div>

          <div className="product-compare-list">

            <ProductCompareList
              selectedProducts={selectedProducts}
            />

          </div>
      </div>
  </div>
)};

export default Shop;

