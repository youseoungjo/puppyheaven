const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'csedbadmin', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Coupangs Register Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the Product database:', err);
});

const Coupang = sequelize.define('coupang', {
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
  allowNull: false
  },
url: {
  type: Sequelize.STRING,
  allowNull: false
},
image: {
  type: Sequelize.STRING,
  allowNull: false
},
deliveryFee: {
  type: Sequelize.INTEGER,
  allowNull: false
},
kg: {
  type: Sequelize.INTEGER,
  allowNull: false
}
});


module.exports = Coupang;