const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'csedbadmin', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
  
  sequelize.authenticate()
    .then(() => {
      console.log('Wishlist Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the Wishlist database:', err);
  });

const WishList = sequelize.define('wishlist', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
});

// 위시리스트 삭제 함수
WishList.deleteWishList = async (userId, productId) => {
  try {
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
};

module.exports = WishList;