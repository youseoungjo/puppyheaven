const mapDao = require('../dao/mapDao');

const getAddresses = async (req, res, next) => {
  try {
    const addresses = await mapDao.getAddresses();
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAddresses };
