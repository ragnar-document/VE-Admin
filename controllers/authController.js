const managerModel = require('./../models/managerModel.js');
const authCode = require('./../utils/authCode.js');

const authController = {
    login:async function(req,res,next){
        let phone = req.body.phone;
        let password = req.body.password;

        let managerModelList = await managerModel.where({phone,password});
        let managerModelItem = managerModelList.length > 0;
        let user_id = managerModelList[0].id
        // console.log(managerModelList)
        if (!managerModelItem) {
            res.json({code:0,message:'没有该管理员'})
        }else{
            let str = phone + '\t' + password + '\t' + user_id;
            let token = authCode(str,'ENCODE')
            res.json({ code: 200 , message: '登录成功', data: {
                userInfo: { phone, user_id },
                token: token,
              }})
        }


    }
}

module.exports = authController