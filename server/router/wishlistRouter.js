const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');

//위시리스트
router.post('/wishlist', wishlistController.getWishLists);
router.post('/delete', wishlistController.deleteWishList);

module.exports = router;