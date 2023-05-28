const ProductRegister = require('../model/productregisterModel');
const ElevensRegister = require('../model/elevensregisterModel');
const GmarketsRegister = require('../model/gmarketsregisterModel');
const CoupangsRegister = require('../model/coupangsregisterModel');
// const ProductRegisterDao = require('../dao/productregisterDao');

exports.ProductRegister = async (req, res) => {
    const { categoryid, name, image, age, maker, ingredient, content} = req.body;
    console.log(req.body);
    try {
        const pregister = await ProductRegister.create({
            categoryid,
            name,
            image,
            age,
            maker,
            ingredient,
            content
        });
        res.status(201).json({ success: true, pregister });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '상품 등록 실패' });
    }
    
};

exports.MallRegister = async (req, res) => {
    const { store, name, price, url, image, deliveryFee, kg } = req.body;
    console.log(req.body);
    try {
        let mregister;
        if (store === '11번가') {
            mregister = await ElevensRegister.create({
                store,
                name,
                image,
                price,
                url,
                deliveryFee,
                kg
            });
        } else if (store === 'G마켓') {
            mregister = await GmarketsRegister.create({
                store,
                name,
                image,
                price,
                url,
                deliveryFee,
                kg
            });
        } else if (store === '쿠팡') {
            mregister = await CoupangsRegister.create({
                store,
                name,
                image,
                price,
                url,
                deliveryFee,
                kg
            });
        }
        res.status(201).json({ success: true, mregister });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '쇼핑몰 등록 실패' });
    }
};

// exports.MallRemove = async (req, res) => {
//   const { store, name, kg } = req.body;
//   console.log(req.body);
//   try {
//     const result = await ProductRegisterDao.delete(store, name, kg);
//     res.status(200).json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
