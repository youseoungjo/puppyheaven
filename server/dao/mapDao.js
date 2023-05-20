const mapModel = require('../model/mapModel');

const getAddresses = async () => {
  try {
    const addresses = await mapModel.User.findAll();
    return addresses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getAddresses };