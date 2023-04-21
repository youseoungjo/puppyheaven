const productDao = require('../dao/productDao');

const getCoupangs = async (req, res, next) => {
  try {
    const coupangs = await productDao.getCoupangs();
    res.json(coupangs);
  } catch (error) {
    next(error);
  }
};

const getGmarkets = async (req, res, next) => {
  try {
    const gmarkets = await productDao.getGmarkets();
    res.json(gmarkets);
  } catch (error) {
    next(error);
  }
};

const getElevens = async (req, res, next) => {
  try {
    const elevens = await productDao.getElevens();
    res.json(elevens);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCoupangs, getGmarkets, getElevens
};