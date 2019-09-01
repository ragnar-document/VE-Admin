const applyModel = require('../models/applyLessonModel');
const userLessonModel = require("../models/userLessonModel");
var { formatTime, formatDate } = require('./../utils/date');

const applyController = {
    insert: async function (req, res, next) {
        let user_id = req.body.user_id;
        let class_id = req.body.class_id;
        let lesson_id = req.body.lesson_id;
        let status = req.body.status;
        console.log(user_id, class_id, lesson_id)

        if (!user_id || !class_id || !lesson_id || !status ) {
            return res.json({code:0,message:'参数不全'})
        }

        try {
            await applyModel.insert({ user_id, class_id, lesson_id, status })
            res.json({code:200,message:'成功添加'})
        } catch (error) {
            console.log(error)
            res.json({
                code: 0,
                message:'系统错误'
            })
        }
    },
    all: async function (req, res, next) {
        try {
            let datas = await applyModel.all()
                .leftJoin('class', 'applylesson.class_id', '=', 'class.id')
                .leftJoin('users', 'applylesson.user_id', '=', 'users.id')
                .column(
                    { user_name: 'users.name' },
                    { class_name: "class.name" },
                    { lesson_id: 'applylesson.lesson_id' },
                    { user_id: 'users.id' },
                    { status: 'applylesson.status' }
                );
            console.log(datas)
          

            res.json({ code: 200,datas:datas})
        } catch (error) {
            console.log(error)
            res.json({code:0,message:'系统错误'})
        }
    },
    edit: async function (req, res, next) {
        let user_id = req.body.user_id;
        let lesson_id = req.body.lesson_id;
        let status = req.body.status;
        let finish_at = formatDate(new Date())

console.log(req.body)
        try {
            let userLessonId = await userLessonModel
                .where({ user_id: user_id })
                .where({ lesson_id: lesson_id });
            let id = userLessonId[0].id
            await userLessonModel.edit(id, { status, finish_at})
        } catch (error) {
            console.log(error);
            res.json({
                code: 0,
                message:'系统错误'
            })
        }
    }
}

module.exports = applyController;