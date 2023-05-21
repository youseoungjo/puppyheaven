const WishListDao = require('../dao/wishlistDao');

const getWishLists = async (req, res) => {
  const { userId, productId, isFavorited } = req.body;
  console.log(req.body);
  if (!userId || !productId || !isFavorited) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  try {
    const wishList = await WishListDao.create(userId, productId, isFavorited);
    res.status(201).json(wishList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteWishList = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(req.body);
  try {
    const result = await WishListDao.delete(userId, productId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    getWishLists, deleteWishList
  };