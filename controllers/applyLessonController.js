const applyModel = require('../models/applyLessonModel');
const userLessonModel = require("../models/userLessonModel");

var { formatTime, formatDate } = require('./../utils/date');

const applyController = {
    insert: async function (req, res, next) {
        let user_id = req.body.user_id;
        let class_id = req.body.class_id;
        let lesson_id = req.body.lesson_id;
        let status = req.body.status;
        let create_time = formatTime(new Date())

        if (!user_id || !class_id || !lesson_id || !status ) {
            return res.json({code:0,message:'参数不全'})
        }

        try {
            await applyModel.insert({ user_id, class_id, lesson_id, status, create_time })
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
        let class_id = req.query.class_id;
        let user_id = req.query.user_id;

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
          
            if (!class_id || !user_id) {
                res.json({ code: 200, datas: datas })
            } else {
                let userLessonDatas = await userLessonModel.where({ "user_lesson.class_id": class_id, 'user_lesson.user_id': user_id })
                    .leftJoin('lesson', 'lesson.id', 'user_lesson.lesson_id')
                    .column(
                        "lesson.date",
                        'user_lesson.class_id',
                        "user_lesson.user_id",
                        'lesson.start_time',
                        'lesson.end_time',
                        'lesson.status',
                        { userStatus: 'user_lesson.status' },
                        { lesson_id: 'lesson.id' }
                )
                // userLessonDatas.forEach(data => {
                //     data.date = formatTime(data.date)
                // })
                res.json({ code: 200, datas: datas, userLessonDatas: userLessonDatas })
            }
           
            

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