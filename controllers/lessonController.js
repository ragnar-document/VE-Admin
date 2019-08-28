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
    show: async function (req, res, next) {
        let lesson_id = req.params.id;

        try {
            let lessons = await lessonModel.where({ id: lesson_id })
            let lesson = lessons[0];
            lesson.date = lesson.date ? formatDate(lesson.date) : '';
            console.log(lesson,12312313123)

            let users = await userLessonModel
                .where({ lesson_id })
                .leftJoin('users', 'user_lesson.user_id', 'users.id')
                .column('users.id', 'users.name','user_lesson.class_id', 'user_lesson.status', 'user_lesson.finish_at')


            res.json({
                code: 200, messsage: '获取成功', data: {
                    lesson: lesson,
                    users: users,
                }
            })
        } catch (err) {
            console.log(err)
            res.json({ code: 0, messsage: '服务器错误' });
        }
    },
    updata: async function (req, res, next) {
        let lesson_id = req.params.id;
        let user_id = req.body.user_id;
console.log(lesson_id,user_id)
        if (!user_id) {
            res.json({ code: 0, messsage: '缺少用户参数' });
            return
        }

        try {
            let userLessons = await userLessonModel.where({  lesson_id, user_id });
            console.log(userLessons)
            let userLesson = userLessons[0];
            console.log(userLesson.id,1111111)
            if (!userLesson) {
                res.json({ code: 0, messsage: '该用户没有报班，没有该课程' });
                return
            }
            if (userLesson.status === 2) {
                res.json({ code: 0, messsage: '该用户已上课' });
                return
            }

            let lessons = await lessonModel.where({ id: lesson_id })
            let lessonInfo = lessons[0];
            let total = - lessonInfo.price;
            await userLessonModel.edit(userLesson.id, { status: 2, finish_at: new Date() });
            await paymentModel.insert({
                user_id: user_id,
                status: 2,
                total: total,
                remark: '用户上课 lesson_id:' + lesson_id
            })
            await userModel
                .where({ id: user_id })
                .increment({ balance: total })
            res.json({ code: 200, messsage: '点名成功' })
        } catch (err) {
            res.json({ code: 0, messsage: '服务器错误' });
        }
    }
}

module.exports = lessonController;