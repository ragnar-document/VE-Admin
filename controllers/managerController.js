const managerModel = require('./../models/managerModel.js');

const managerController = {
    insert:async function(req, res, next) {
        let [name,phone,password] = [req.body.name,req.body.phone,req.body.password];
        if (!name || !phone || !password) {
          res.json({
            code:0,
            message:'缺少参数'
          })
        }

        try {
           const manager = await managerModel.insert({name,phone,password});
           res.json({ code:200, message: manager})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'新增失败' })
        }
    },
    single:async function(req, res, next) {
        let id = req.params.id;

        try {
           const single = await managerModel.single(id);
            res.json({ code:200, data:single})
         } catch (error) {
             console.log(error)
             res.json({ code:0, message:'新增失败' })
         } 
    },
    edit:async function(req, res, next) {
        let [name,phone,password] = [req.body.name,req.body.phone,req.body.password];
        if (!name || !phone || !password) {
          res.json({
            code:0,
            message:'缺少参数'
          })
        }
        let id = req.params.id;
        
        try {
            await managerModel.edit(id,{name,phone,password})
            res.json({ code:200, message:'编辑成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 
        

    },
    delete:async function(req, res, next) {
        let id = req.params.id;
        
        try {
            await managerModel.delete(id)
            res.json({ code:200, message:'删除成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 

    },
    all:async function(req, res, next) {
        try {
            const all = await managerModel.softall()
            res.json({ code:200, datas:all})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 
    },
}

module.exports = managerController;