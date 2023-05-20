const WishList = require('../model/wishlistModel');

class WishListDao {
  static async create(userId, productId, isFavorited) {
    try {
      const existingWishList = await WishList.findOne({
        where: {
          userId,
          productId,
          isFavorited
        },
      });
      if (existingWishList) {
        return existingWishList;
      }
      const wishList = await WishList.create({
        userId,
        productId,
        isFavorited
      });
      return wishList;
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  }

  static async delete(userId, productId) {
    try {
      if (!userId) { // userId 값이 undefined인 경우, 오류를 발생시키지 않습니다.
        return null;
      }
      const result = await WishList.destroy({
        where: {
          userId,
          productId,
        },
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  }
}

module.exports = WishListDao;