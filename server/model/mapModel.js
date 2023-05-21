const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'csedbadmin', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Map Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the Map database:', err);
});

const User = sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

const userAddressModel = {
  findAll: async () => {
    const userAddresses = await User.findAll();
    return [userAddresses];
    }
};

module.exports = { User, userAddressModel };