const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const sequelize = new Sequelize('mydb', 'root', 'csedbadmin', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('User Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the User database:', err);
});

const User = sequelize.define('user', {
id: {
  type: Sequelize.STRING,
  allowNull: false,
  primaryKey: true
},
password: {
  type: Sequelize.STRING,
  allowNull: false
},
name: {
  type: Sequelize.STRING,
  allowNull: false
},
birthday: {
  type: Sequelize.DATEONLY,
  allowNull: false
},
zonecode: {
  type: Sequelize.STRING,
  allowNull: false
},
address: {
  type: Sequelize.STRING,
  allowNull: false
},
detailAddress: {
  type: Sequelize.STRING,
  allowNull: false
}
});

User.prototype.generateToken = function () {
  const token = jwt.sign({ id: this.id }, 'secret_key', { expiresIn: '24h' });
  return token;
};

module.exports = User;
