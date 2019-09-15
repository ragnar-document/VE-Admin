var { formatTime, formatDate } = require('./../utils/date');
var { phoneValid } = require('./../utils/validation');
var usersModel = require('./../models/userModel.js');
const userClassModel = require('./../models/userClassModel.js');
const paymentModel = require('./../models/paymentModel.js');
const authCode = require('./../utils/authCode.js');
const configs = require('./../config');
var axios = require('axios')


const userController = {
    insert: async function (req, res, next) {
        let [name, sms_name, sms_phone] = [req.body.name, req.body.sms_name, req.body.sms_phone];
        let phone = req.body.phone;
        let sex = req.body.sex;
        let birthday = req.body.birthday;
        let created_at = new Date();

        if (!name || !phone || !sex || !sms_name || !sms_phone) {
            return res.json({ code: 0, message: '缺少必要参数' })
        }

        try {
            const users = await usersModel.insert({
                name, phone, sex, birthday, sms_name, sms_phone, created_at
            })
            users.forEach(data => {
                data.birthday = formatDate(data.birthday),
                data.created_at = formatDate(data.created_at)
            })
            res.json({
                code: 200,
                data: users
            })
        } catch (error) {
            console.log(error);
            res.json({ code: 200, message: '系统错误' })
        }

    },
    single: async function (req, res, next) {
        let id = req.params.id;
        try {
            const single = await usersModel.single(id);
            if (!single) {single = []}

            let userClassIntro = await userClassModel
                .where({ 'user_id': id })
                .leftJoin('class', 'user_class.class_id', 'class.id')
            userClassIntro.forEach(data => {
                if (data.start_at) data.start_at = formatDate(data.start_at)
                if (data.end_at) data.end_at = formatDate(data.end_at)
            })

            let userPaymentIntro = await paymentModel
                .where({ 'user_id': id })
                .leftJoin('users', 'payment.user_id', 'users.id')

            res.json({
                code: 200,
                datas: {
                    single: single, 
                    intro: userClassIntro, //用户个人信息 
                    payment: userPaymentIntro //用户消费信息
                }
            })
        } catch (error) {
            console.log(error)
            res.json({
                code: 200,
                message: '系统错误'
            })
        }
    },
    edit: async function (req, res, next) {
        let [name, sex, sms_name, sms_phone] = [req.body.name, req.body.sex, req.body.sms_name, req.body.sms_phone];
        let phone = phoneValid(req.body.phone);
        let birthday = req.body.birthday;
        let balance = req.body.balance;
        let id = req.params.id;

        if (!name || !phone || !sms_name || !sms_phone) {
            return res.json({ code: 0, message: '缺少必要参数' })
        }
        try {
            const edit = await usersModel.edit(id, {
                name, phone, sex, birthday, sms_name, balance, sms_phone,
            })
            res.json({
                code: 200,
                data: edit
            })
        } catch (error) {
            console.log(error);
            res.json({
                code: 0,
                message: '系统错误'
            })
        }
    },
    all: async function (req, res, next) {
        let pageIndex = req.query.pageIndex || 1;//页码
        let pageSize = req.query.pageSize || 10; //数量
        let params = {};
        //通过数据库查找用户电话以及名字
        //通过element插件能减少请求次数
        // if (name) params.name = name;
        // if (phone) params.phone = phone;

        try {
            let users = await usersModel.softall(pageSize, pageIndex, params)
            users.forEach(data => {
                data.created_at = formatDate(data.created_at)
            })

            let recondDate = await usersModel.where({ "isdeleted": 1 })
            let usersCount = await usersModel.count(params);
            let total = usersCount[0].total;
            res.json({
                code: 200,
                data: {
                    data: users,
                    pagination: {
                        total: total,
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        recondDate: recondDate
                    }
                }
            })
        } catch (error) {
            console.log(error)
            res.json({ code: 0, message: '系统错误' })
        }
    },
    delete: async function (req, res, next) {
        let id = req.params.id;

        try {
            await usersModel.delete(id)
            res.json({ code: 200, message: '编辑成功' })
        } catch (error) {
            console.log(error);
            res.json({ code: 0, message: '系统错误' })
        }
    },
    recover: async function (req, res, next) {
        let id = req.params.id;

        try {
            await usersModel.recover(id)
            res.json({ code: 200, message: '恢复成功' })
        } catch (error) {
            console.log(error);
            res.json({ code: 0, message: '系统错误' })
        }
    },
    findOpen: async function (req, res, next) {
        let code = req.body.code;
        let secret = configs.wx.secret;
        let appId = configs.wx.appId;
        let userPhone = req.body.userPhone;
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`

        try {
            let data = await axios.get(url);
            let openid = data.data.openid;
            let user = await usersModel.where({ phone: userPhone });
            let username = user[0].name;
            let userphone = user[0].phone;
            let id = user[0].id;

            let userClass = await userClassModel
                .where({ 'user_id': id })
                .leftJoin('class', 'user_class.class_id', 'class.id')

            if (!user.length) {
                res.json({ code: 0, message: '该用户没有注册' })
                return
            }

            if (user[0].open_id == null) {
                let balance = user[0].balance;
                await usersModel.edit(id, { open_id: openid })
                let str = username + '\t' + userphone + '\t' + openid;
                let token = authCode(str, 'ENCODE')
                res.json({ code: 200, message: '成功登陆', token: token, userId: id, balance: balance, userClass: userClass })
            } else {
                let balance = user[0].balance;
                let str = username + '\t' + userphone + '\t' + openid;
                let token = authCode(str, 'ENCODE')
                res.json({
                    code: 200,
                    message: '成功登陆',
                    token: token,
                    user_name: username,
                    user_phone: userphone,
                    userId: id,
                    balance: balance,
                    userClass: userClass
                })
            }
        } catch (e) {
            console.log(e)
            res.json({ code: 0, message: '登陆失败' })
        }
    }
}

module.exports = userController;