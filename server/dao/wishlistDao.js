const WishList = require('../model/wishlistModel');

class WishListDao {
  static async create(token, productId) {
    try {
      const existingWishList = await WishList.findOne({
        where: {
          token,
          productId,
        },
      });
      if (existingWishList) {
        return existingWishList;
      }
      const wishList = await WishList.create({
        token,
        productId,
      });
      return wishList;
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  }

  static async delete(token, productId) {
    try {
      if (!token) { // token 값이 undefined인 경우, 오류를 발생시키지 않습니다.
        return null;
      }
      const result = await WishList.destroy({
        where: {
          token,
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