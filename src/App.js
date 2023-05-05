import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'

import Home from './pages/Home';
import Join from './pages/Join';
import FindIdPw from './pages/FindIdPw';
import Main from './pages/Main';
import Map from './pages/Map';
import Shop from './pages/Shop';
import WishList from './pages/WishList';
import Video from './pages/Video';

import ProductData from './ProductData';
import PriceCompare from './components/PriceCompare';

function App() {
  
  const [products, setProducts] = useState(ProductData);

  const [wishItem, setWishItem] = useState([]);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/join' element={<Join/>}/>
          <Route path='/find' element={<FindIdPw/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path='/shop' element={<Shop wishItem={wishItem} setWishItem={setWishItem} products={products} />}/>
          <Route path='/wish' element={<WishList wishItem={wishItem} setWishItem={setWishItem} />}/>
          <Route path='/video' element={<Video/>}/>
          <Route path='/pricecompare' element={<PriceCompare/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
  
}

export default App;
