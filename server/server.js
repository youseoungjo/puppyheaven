const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//app.post('/signup', (req, res) => {
  //const data = req.body;
  //console.log(data);
  // 데이터 처리 로직
  //res.send('POST 요청이 처리되었습니다.');
//});
app.post('/signup', userRouter);
app.post('/login', userRouter);

app.listen(3001, () => {
  console.log('서버가 시작되었습니다. 3001');
});