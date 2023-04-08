const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//router.post('/signup', (req, res, next) => {
  //console.log(req.body);
  //next();
//}, userController.signup);
router.post('/signup', (req, res, next) => {
  const data = req.body;
  console.log(data);
  next();
   //데이터 처리 로직
}, userController.signup);

router.post('/login', (req, res, next) => {
  console.log(req.body);
  next();
}, userController.login);

module.exports = router;