const paymentModel = require('./../models/paymentModel.js');
const userLessonModel = require('./../models/userLessonModel.js');
const lessonModel = require('./../models/lessonModel.js');
const userModel = require('./../models/userModel.js');
var { formatDate } = require('./../utils/date');

const lessonController = {
    edit:async function(req,res,next){
        let id = req.params.id
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;
        if (!start_time || !end_time) {
            return res.json({code:0,message:'缺少参数'})
        }

        try {
            await lessonModel.edit(id,{start_time,end_time})
            res.json({code:200,message:'编辑成功'})
        } catch (error) {
            console.log(error)
            res.json({code:0})
        }
    },
    updata:async function(req,res,next){
        let lesson_id = req.params.id;
        let user_id = req.body.user_id;
        let status = req.body.status;
        let finish_at = formatDate(new Date())


        if (!user_id) {
            res.json({code:0,message:'缺少参数'})
        }

        try {
            let userLessonList = await userLessonModel.where({lesson_id,user_id});
            let userLessonItem = userLessonList[0];


            if (!userLessonItem) {
                res.json({code:0,message:'用户没有报班'})
            }
            
            let lessonItem = await lessonModel.where({ 'id': lesson_id });
            //user_lesson 表单生成数据
            await userLessonModel.edit(userLessonItem.id, { status: status,finish_at:finish_at});
            let total = -lessonItem[0].price;
            
            //上课打卡才扣费
            if (status == 2) {
                await paymentModel.insert({
                    status: 2,
                    total: total,
                    created_time: finish_at,
                    user_id: user_id,
                    remark: '用户:' + lesson_id + '课程扣费'
                })    
            }
            
           await userModel.where({ id: user_id })
            .increment({ balance: total })
            res.json({code:200,message:'点名成功'})
        } catch (error) {
            console.log(error)
            res.json({
                code:0,
                message:'系统错误'
            })
        }
    }
}

module.exports = lessonController;