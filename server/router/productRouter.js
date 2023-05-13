const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

//상품 데이터 get
router.get('/productdata', productController.getProducts);
router.get('/coupang', productController.getCoupangs);
router.get('/gmarket', productController.getGmarkets);
router.get('/eleven', productController.getElevens);
router.get('/wishitem', productController.getWishItems);


module.exports = router;