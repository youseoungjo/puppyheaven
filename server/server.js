const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const wishlistRouter = require('./router/wishlistRouter');
<<<<<<< HEAD
const mapRouter = require('./router/mapRouter');
=======
>>>>>>> 35949575b5c53bc60502489ddba72c3c90198f3e
// const { saveDataToFile } = require('./saveDataToFile');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//로그인 / 회원가입 Post
app.post('/signup', userRouter);
app.post('/login', userRouter);

//물품 정보 get
app.get('/productdata', productRouter);
app.get('/coupang', productRouter);
app.get('/gmarket', productRouter);
app.get('/eleven', productRouter);
app.get('/wishitem', productRouter);

//위시리스트 create delete
app.post('/wishlist', wishlistRouter);
app.post('/delete', wishlistRouter);

//users에서 주소 가져오기
app.get('/geocode', mapRouter);

app.listen(3001, async () => {
  console.log('서버가 시작되었습니다. 3001');

  // // 데이터 저장
  // await saveDataToFile.saveDataToFile();
});