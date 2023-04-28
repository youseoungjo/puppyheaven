const productModel = require('../model/productModel');

const getProducts = async () => {
  try {
    const products = await productModel.Product.findAll();
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCoupangs = async () => {
  try {
    const coupangs = await productModel.Coupang.findAll();
    return coupangs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getGmarkets = async () => {
  try {
    const gmarkets = await productModel.Gmarket.findAll();
    return gmarkets;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getElevens = async () => {
  try {
    const elevens = await productModel.Eleven.findAll();
    return elevens;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getProducts, getCoupangs, getGmarkets, getElevens
};
