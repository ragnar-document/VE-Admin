const managerModel = require('./../models/managerModel.js');
const authCode = require('./../utils/authCode.js');


const authController = {
    login: async function (req, res, next) {
        console.log(req.query)
        let phone = req.query.phone;
        let password = req.query.password;

       try {
           let managerModelList = await managerModel.where({ phone, password });
           let managerModelItem = managerModelList.length > 0;
           console.log(managerModelItem)
           if (!managerModelItem) {
               res.json({ code: 0, message: '没有该管理员' })
           } else {
               let user_id = managerModelList[0].id
               let str = phone + '\t' + password + '\t' + user_id;
               let token = authCode(str, 'ENCODE')
               res.json({
                   code: 200, message: '登录成功', data: {
                       userInfo: { phone, user_id },
                       token: token,
                   }
               })
           }
       } catch (error) {
           console.log(error)
       }
    },
    getManager: async function (req, res, next) {
        let token = req.query[0];
        let content = authCode(token, 'DECODE');
        let user_id = content.charAt(content.length - 1);

        try {
            let managerInfo = await managerModel.single(user_id)
            res.json({
                code: 200,
                data:managerInfo
            })
            
        } catch (error) {
            console.log(error)
            res.json({code:0,message:'系统问题'})
        }
    }
}

module.exports = authController