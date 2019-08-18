const paymentModel = require('./../models/paymentModel.js');
var userModel = require('./../models/userModel.js');
var { formatTime } = require('./../utils/date');


const paymnetController = {
    insert:async function(req, res, next) {
       let status = req.body.status;
       let user_id = req.body.user_id;
       let total = req.body.total;
       let remark = req.body.remark || '';
       let created_time = formatTime(new Date());
       
       if(!user_id || !status || isNaN(total)) {
        res.json({code:0,messsage: '参数缺少'});
        return
      }

        try {
           await paymentModel.insert({ user_id, status, total, remark,created_time});
           //更新
           await userModel
           .where({ id: user_id })
           .increment({ balance: total })
           res.json({ code:200, message: '添加成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'新增失败' })
        }
    },
    all:async function(req, res, next) {
        try {
            const all = await paymentModel.all()
            res.json({ code:200, datas:all})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 
    },
    selectIndex:async function(req,res,next){
        let status = req.query.status;
        let pageSize = req.query.pageSize || 10;
        let pageIndex = req.query.pageIndex || 1;
        let startAt = req.query.start_at;
        let endAt = req.query.end_at;
        let filterColumn = (startAt && endAt) ? 'payment.created_time' : '';

        let params = {};
        if(status) params.status = status;
        // console.log(params)

        try {
            let payment = await paymentModel.pagination(pageSize,pageIndex,params,{
                column:filterColumn,
                startAt:startAt,
                endAt:endAt
            })
            .leftJoin('users','payment.user_id','users.id')
            .column('payment.id', 'payment.status','payment.total', 'payment.user_id', 'payment.created_time','payment.remark', 'users.name')
            .orderBy('id', 'desc');

            payment.forEach(data => data.created_time = formatTime(data.created_time));

            let paymentsCount = await paymentModel.count(params,{
                column:filterColumn,
                startAt:startAt,
                endAt:endAt
            });
            let total = paymentsCount[0].total;

            res.json({code:200,message:'获取成功',datas:{
                total:total,
                pageIndex:pageIndex,
                pageSize:pageSize,
                data:payment
            }})
        } catch (error) {
            console.log(error)
            res.json({code:0,message:'系统错误'})
        }
    }
}

module.exports = paymnetController