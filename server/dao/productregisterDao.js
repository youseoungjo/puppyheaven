const Product = require('.model/productregisterModel');
const Eleven = require('./elevensregisterModel');
const Gmarket = require('./gmarketsregisterModel');
const Coupang = require('./coupangsregisterModel');

const productregisterDao = {};

productregisterDao.createProduct = async (productData) => {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    throw error;
  }
};

productregisterDao.createElevens = async (mallData) => {
  try {
    const eleven = await Eleven.create(mallData);
    return eleven;
  } catch (error) {
    throw error;
  }
};

productregisterDao.createGmarkets = async (mallData) => {
  try {
    const gmarket = await Gmarket.create(mallData);
    return gmarket;
  } catch (error) {
    throw error;
  }
};

productregisterDao.createCoupangs = async (mallData) => {
  try {
    const coupang = await Coupang.create(mallData);
    return coupang;
  } catch (error) {
    throw error;
  }
};

module.exports = productregisterDao ;