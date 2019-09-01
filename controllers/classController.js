const classModel = require('./../models/classModel.js');
const userModel = require('./../models/userModel.js');
const courseModel = require('./../models/courseModel.js');
const paymentModel = require('./../models/paymentModel.js');
const userClassModel = require('./../models/userClassModel.js');
const userLessonModel = require('./../models/userLessonModel.js');
const lessonModel = require('./../models/lessonModel.js');
var { formatTime,formatDate } = require('./../utils/date');

const classControllers = {
    insert:async function(req, res, next) {
        let name = req.body.name;
        let description = req.body.description || "";
        let course_id = req.body.course_id;
        let price = req.body.price;
        let lesson_count = req.body.lesson_count;
        let status = req.body.status;
        //时间
        let created_at = new Date();
        let start_at = req.body.start_at;
        let end_at = req.body.end_at;
        end_at = formatDate(new Date(end_at))
        start_at = formatDate(new Date(start_at))


        if (!name || !description || !course_id || isNaN(price) || isNaN(lesson_count) || !status) {
            return res.json({code:0,message:'缺少参数'})
        }

        try {
           let classArry =  await classModel.insert({end_at,created_at,start_at,name,description,course_id,price,lesson_count,status});
           let class_id = classArry[0]
           let lessonPrice = price/lesson_count;
           
           let lessones = new Array(parseInt(lesson_count)).fill({class_id, price:lessonPrice})
           await lessonModel.insert(lessones)
           res.json({ code:200, message: '新增成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'新增失败' })
        }
    },
    selectAll:async function(req,res,next){
        let name = req.query.name;
        let status = req.query.status;
        let course_id = req.query.course_id;

        let pageIndex = req.query.pageIndex || 1;//页码
        let pageSize = req.query.pageSize || 20; //数量

        let startAt = req.query.start_at;
        let endAt = req.query.end_at;
        let filterColumn = (startAt && endAt) ? 'class.end_at' : '';


    //搜索条件
        let params = {};
        if(name) params.name = name;
        if(status) params.status = status;
        if(course_id) params.course_id = course_id;


        try {
            let classes = await classModel
                .pagination(pageSize, pageIndex, params, {
                    column: filterColumn,
                    startAt: startAt,
                    endAt: endAt
                })
                .leftJoin('course', 'class.course_id', 'course.id')
                .column('class.id', 'class.name', 'class.course_id', 'class.price', 'class.status',
                    'class.start_at', 'class.end_at','class.description',
                    { course_name: 'course.name' })
                .orderBy('id','desc');

            classes.forEach(data => {
                data.start_at = formatDate(data.start_at)
                data.end_at = formatDate(data.end_at)
            });

            let classesCount = await classModel.count(params,{
                column:filterColumn,
                startAt:startAt,
                endAt:endAt
            });

            let total = classesCount[0].total;

            res.json({
                code:200,
                datas:{
                    pagination:{
                        total: total,
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                    },
                    data: classes
                }
            })
        } catch (error) {
            console.log(error)
            res.json({code:0,message:'系统错误'})
        }
    },
    edit:async function(req, res, next) {
        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description || "";
        let course_id = req.body.course_id;
        let status = req.body.status;
        //时间
        let start_at = req.body.start_at;
        let end_at = req.body.end_at;

        if (!name  || !course_id  || !status) {
            return res.json({code:0,message:'缺少参数'})
        }

        try {
          await classModel.edit(id,{end_at,name,description,start_at,course_id,status});
           res.json({ code:200, message: '修改成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'修改失败' })
        }
    },
    show:async function(req,res,next){
        let id = req.params.id;

        try {
            let classes = await classModel.where({'class.id':id})
            .leftJoin('course','class.course_id','course.id')
            .column('class.id','class.lesson_count','class.name','class.course_id','class.description','class.price',
            'class.status','class.start_at','class.end_at', { course_name: 'course.name' })

            classes.forEach(data=>{
                data.start_at = formatDate(data.start_at),
                data.end_at = formatDate(data.end_at)
            })
            
 

            let classStudy = await userClassModel.where({'class_id':id})
            .leftJoin('users','user_class.user_id','users.id')
            .column('users.name','users.sex','users.phone','users.created_at','users.id')

             
            let lessons = await lessonModel.show({'class_id':id})
            lessons.forEach(data => {
                data.date = data.date ? formatDate(data.date) : '-';
            })


            let userLesson = await userLessonModel.where({ 'class_id': id })


            res.json({
                code:200,
                data:{
                    classes:classes,
                    classLess:lessons,
                    classStudy: classStudy,
                    userLesson: userLesson
                }
            })
        } catch (error) {
            console.log(error)
            res.json({code:0,message:'系统错误'})
        }
    },
    setTimeDate: async function (req, res, next) {
        let id = req.params.id;
        let lesson_id = req.body.lesson_id;
        let params = req.body.params;
        console.log(id, params, lesson_id)

        // let classIdItem = await lessonModel.where({ 'class_id': id, "lesson_id": lesson_id })


        try {
            let test = await lessonModel.edit(lesson_id,params)
            res.json({code:200,message:'设置成功'})
        } catch (error) {
            console.log(error)
            res.json({
                code: 0
            })
        }

    },
    addUser:async function(req,res,next){
        let user_id = req.body.user_id;
        let class_id = req.params.id;
        console.log(user_id,class_id)
        let created_at = formatTime(new Date())

        try {
            let lesson = await lessonModel.where({class_id})
            let userLesson = lesson.map(data => {
                return{
                    lesson_id: data.id,
                    user_id:user_id,
                    class_id:class_id
                }
            })

            let classLesson = await userClassModel.where({ user_id, class_id });
            console.log(classLesson)
            let judge = classLesson.length > 0;

            if(judge){
               return res.json({code:0,message:'已经报班'})
            }

            
            await userClassModel.insert({user_id,class_id,created_at})
            await userLessonModel.insert(userLesson)
            let totalList = await classModel.where({'course_id':class_id})
            let total = totalList[0].price;
            let status = 1;
            let remark = "报班成功课程金额"
            await paymentModel
            .insert({ "user_id":user_id, "status":status, "total":total,"remark":remark,"created_at":created_at});

            //如果报班就把总结充值到余额
            // await userModel
            // .where({ id: user_id })
            // .increment({ balance: total })

            res.json({code:200,message:'报班成功'})
            
        } catch (error) {
            console.log(error)
            res.json({
                code:0,
                message:'系统错误'
            })
        }
    }
}

module.exports = classControllers