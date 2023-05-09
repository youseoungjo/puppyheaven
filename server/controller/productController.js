const productDao = require('../dao/productDao');

const getProducts = async (req, res, next) => {
  try {
    const products = await productDao.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

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

const getWishLists = async (req, res, next) => {
  
};

module.exports = {
  getProducts, getCoupangs, getGmarkets, getElevens, getWishLists
};