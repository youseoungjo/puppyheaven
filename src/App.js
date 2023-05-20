import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react'

import LogIn from './components/LogIn';
import Join from './pages/Join';
import FindIdPw from './pages/FindIdPw';
import Main from './pages/Main';
import Map from './pages/Map';
import Shop from './pages/Shop';
import WishList from './pages/WishList';

import PriceCompare from './components/PriceCompare';
import ProductCompare from './components/ProductCompare';


function App() {

  const [wishItem, setWishItem] = useState([]);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/join' element={<Join/>}/>
          <Route path='/find' element={<FindIdPw/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path='/shop' element={<Shop wishItem={wishItem} setWishItem={setWishItem} />}/>
          <Route path='/wish' element={<WishList wishItem={wishItem} setWishItem={setWishItem} />}/>
          <Route path='/pricecompare' element={<PriceCompare/>}/>
          <Route path='/productcompare' element={<ProductCompare/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
  
}

export default App;
