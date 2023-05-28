const express = require('express');
const router = express.Router();
const productregisterController = require('../controller/productregisterController');

router.post('/productregister', (req, res, next) => {
  const data = req.body;
  console.log(data);
  next();
   //데이터 처리 로직
}, productregisterController.ProductRegister);

router.post('/mallregister', (req, res, next) => {
  const data = req.body;
  console.log(data);
  next();
   //데이터 처리 로직
}, productregisterController.MallRegister);

// router.post('/mallremove', productregisterController.MallRemove);

module.exports = router;