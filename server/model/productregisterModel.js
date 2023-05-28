const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'csedbadmin', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Product Register Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the Product database:', err);
});

const Product = sequelize.define('product', {
categoryid: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
name: {
  type: Sequelize.STRING,
  allowNull: false,
},
image: {
  type: Sequelize.STRING,
  allowNull: false
},
age: {
  type: Sequelize.STRING,
  allowNull: false
},
maker: {
  type: Sequelize.STRING,
  allowNull: false
},
ingredient: {
  type: Sequelize.STRING,
  allowNull: false
},
content: {
  type: Sequelize.STRING,
  allowNull: false
}
});


module.exports = Product;