const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

//상품 데이터 get
router.get('/productdata', productController.getProducts);
router.get('/coupang', productController.getCoupangs);
router.get('/gmarket', productController.getGmarkets);
router.get('/eleven', productController.getElevens);

//위시리스트
router.post('/wishlist', productController.getElevens);
module.exports = router;