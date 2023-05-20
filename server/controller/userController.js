const User = require('../model/userModel');

exports.signup = async (req, res) => {
    const { id, password, name, birthday, zonecode, address, detailAddress } = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ where: { id } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: '이미 존재하는 아이디입니다.' });
        }
        const user = await User.create({
            id,
            password,
            name,
            birthday,
            zonecode,
            address,
            detailAddress
        });
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '회원가입에 실패했습니다.' });
    }
};

exports.login = async (req, res) => {
const { id } = req.body;
    try {
        const user = await User.findOne({ where : { id } });
        if (!user) {
            return res.status(404).json({ success: false, message: '일치하는 회원 정보가 없습니다.' });
        }
        const token = user.generateToken();
        res.status(200).json({ success: true, token });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '로그인에 실패했습니다.' });
    }
};

