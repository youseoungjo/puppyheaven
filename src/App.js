import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'

import Home from './pages/Home';
import Join from './pages/Join';
import FindIdPw from './pages/FindIdPw';
import Main from './pages/Main';
import Map from './pages/Map';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Video from './pages/Video';

import ProductData from './ProductData';

function App() {
  
  const [products, setProducts] = useState(ProductData);

  const [cartItem, setCartItem] = useState([]);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/join' element={<Join/>}/>
          <Route path='/find' element={<FindIdPw/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path='/shop' element={<Shop cartItem={cartItem} setCartItem={setCartItem} products={products}/>}/>
          <Route path='/cart' element={<Cart cartItem={cartItem} setCartItem={setCartItem} />}/>
          <Route path='/video' element={<Video/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
  
}

export default App;
