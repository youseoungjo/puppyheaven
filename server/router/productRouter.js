const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/productdata', productController.getProducts);
router.get('/coupang', productController.getCoupangs);
router.get('/gmarket', productController.getGmarkets);
router.get('/eleven', productController.getElevens);

module.exports = router;