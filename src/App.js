import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Join from './pages/Join';
import FindIdPw from './pages/FindIdPw';
import Main from './pages/Main';
import Map from './pages/Map';
import Shop from './pages/Shop';
import Video from './pages/Video';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/join' element={<Join/>}/>
          <Route path='/find' element={<FindIdPw/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/video' element={<Video/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
  
}

export default App;
