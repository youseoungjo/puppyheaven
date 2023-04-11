const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//로그인 / 회원가입 Post
app.post('/signup', userRouter);
app.post('/login', userRouter);

app.listen(3001, () => {
  console.log('서버가 시작되었습니다. 3001');
});