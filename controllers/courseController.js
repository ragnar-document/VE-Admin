const courseModel = require('./../models/courseModel.js');

const courseControllers = {
    insert:async function(req, res, next) {
        let name = req.body.name;
        let description = req.body.description;
        let teacher = req.body.teacher;
        let teacher_phone = req.body.teacher_phone;

        if (!name || !description || !teacher || !teacher_phone) {
          res.json({
            code:0,
            message:'缺少参数'
          })
        }

        try {
           await courseModel.insert({name,description,teacher,teacher_phone});
           res.json({ code:200, message: '新增成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'新增失败' })
        }
    },
    edit:async function(req, res, next) {
        let name = req.body.name;
        let description = req.body.description;
        let teacher = req.body.teacher;
        let teacher_phone = req.body.teacher_phone;

        if (!name || !description || !teacher || !teacher_phone) {
          res.json({
            code:0,
            message:'缺少参数'
          })
        }

        let id = req.params.id;
        
        try {
            await courseModel.edit(id,{name,description,teacher,teacher_phone})
            res.json({ code:200, message:'编辑成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 
        

    },

    all:async function(req, res, next) {
        try {
            const all = await courseModel.softall()
            res.json({ code:200, datas:all})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 

    },

    single:async function(req, res, next) {
        let id = req.params.id;
        try {
            const all = await courseModel.single(id)
            res.json({ code:200, datas:all})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 

    },

    delete:async function (req,res,next) {
        let id = req.params.id;
        try {
            await courseModel.delete(id)
            res.json({code:200,message:'编辑成功'})
        } catch (error) {
            console.log(error);
            res.json({code:0,message:'系统错误'})
        }
    },

}

module.exports = courseControllers