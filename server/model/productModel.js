const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'csedbadmin', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Product Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the Product database:', err);
});

const Coupang = sequelize.define('coupang', {
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryFee: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kg: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Gmarket = sequelize.define('gmarket', {
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryFee: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kg: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Eleven = sequelize.define('eleven', {
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryFee: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kg: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const productModel = {
  findAll: async () => {
    const coupangProducts = await Coupang.findAll();
    const gmarketProducts = await Gmarket.findAll();
    const elevenProducts = await Eleven.findAll();
    return [coupangProducts, gmarketProducts, elevenProducts];
    }
};

module.exports = {Coupang, Gmarket, Eleven, productModel};