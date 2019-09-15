const authCode = require('./../utils/authCode.js');
const managerModel = require('./../models/managerModel.js');

const filterMiddle = {
    filter: async function (req, res, next) {
        let token = req.headers.authorization;
        if(!token) {
            res.json({code:0 , message: '必须登录'})
            return
          }
        let authCodeItem = authCode(token, 'DECODE');
        let changeAuthCodeItem = authCodeItem.split('\t');

        let phone = changeAuthCodeItem[0];
        let password = changeAuthCodeItem[1];
        let id = changeAuthCodeItem[2];
        console.log(changeAuthCodeItem[2])

        if(!phone || !password || !id){
            return res.json({code:0,message:'缺少参数'})
        }


        try {
            let managers = await managerModel
                .where({ phone, password, id})
                .whereNull('isdeleted');
            let manager = managers[0];
            console.log(manager,11111)

            if(!manager) {
                res.json({ code:0, message: '管理员无效'});
                return
            }

            res.locals.manager_id = manager.id;
            next();
        } catch (error) {
            res.json({ code: 0 , message: '服务器错误'})
        }
    }
}

module.exports = filterMiddle;