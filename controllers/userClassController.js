const userClassModel = require('./../models/userClassModel.js')
var { formatDate } = require('./../utils/date');

const userClassController = {
    insert:async function(req, res, next) {
       let [user_id,class_id] = [req.body.user_id,req.body.class_id];
       let create_at = formatDate(new Date())
       console.log(user_id,class_id)
       if (!user_id || !class_id) {
           return res.json({code:200,meassage:'缺少参数'})
       }

       try {
           await userClassModel.insert({user_id,class_id,create_at})
           res.json({code:200,meassage:'成功添加'})
       } catch (error) {
           console.log(error)
           res.json({code:0,meassage:'添加失败'})
       }
    },
}

module.exports = userClassController;