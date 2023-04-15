const User = require('./userModel');
const userDao = {};

userDao.createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

userDao.getUser = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return user;
  } catch (error) {
    throw error;
  }
};

userDao.authenticateUser = async (userId, password) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }
    const token = user.generateToken();
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = userDao ;