var express = require('express');
var router = express.Router();
var filterMiddle = require('./../middleware/filterMiddle.js');
var userController = require('./../controllers/userController.js');
var authController = require('./../controllers/authController.js');
var classController = require('./../controllers/classController.js');
var courseController = require('./../controllers/courseController.js');
var lessonController = require('./../controllers/lessonController.js');
var paymentController = require('./../controllers/paymentController.js');
var managerController = require('./../controllers/managerController.js');
var userClassController = require('./../controllers/userClassController.js');
var applyLessonController = require('./../controllers/applyLessonController.js');

/* GET users listing. */
router.get('/login', authController.login);
router.get('/getManager', authController.getManager);
// filterMiddle.filter

//小程序登陆接口
router.post('/wxrequest', userController.findOpen)
// 微信 请假
router.post('/applylesson', applyLessonController.insert)
router.get('/applyList', applyLessonController.all)
router.put('/applyEdit', applyLessonController.edit)
/* manager 表 */
router.post('/manager', filterMiddle.filter,managerController.insert);
router.get('/manager/:id', filterMiddle.filter,managerController.single);
router.put('/manager/:id', filterMiddle.filter,managerController.edit);
router.delete('/manager/:id', filterMiddle.filter,managerController.delete);
router.get('/manager', filterMiddle.filter,managerController.all);


/* user 表 */
router.post('/user', filterMiddle.filter,userController.insert);
router.get('/user/:id', filterMiddle.filter,userController.single);
router.put('/user/:id', filterMiddle.filter,userController.edit);
router.put('/user/recover/:id', filterMiddle.filter,userController.recover);
router.get('/user', filterMiddle.filter,userController.all);
router.delete('/user/:id', filterMiddle.filter,userController.delete);
// router.get('/user/select',managerController.selectAll);

/* payment 表 */
router.post('/payment', filterMiddle.filter,paymentController.insert);
router.get('/payment', filterMiddle.filter,paymentController.selectIndex);
//用户充值
router.put('/user/:id/recharge', filterMiddle.filter,paymentController.insert);


/* course 表 */
router.post('/course', filterMiddle.filter,courseController.insert);
router.put('/course/:id', filterMiddle.filter,courseController.edit);
router.get('/course', filterMiddle.filter,courseController.all);
router.get('/course/:id', filterMiddle.filter,courseController.single);
router.delete('/course/:id', filterMiddle.filter,courseController.delete);

/* class 表 */
//班级列表
router.get('/class', filterMiddle.filter,classController.selectAll);
//创建班级
router.post('/class', filterMiddle.filter,classController.insert);
//修改课程数量
router.put('/class/:id', filterMiddle.filter,classController.edit);
//修改课程时间
router.put('/class/:id/course', filterMiddle.filter,classController.setTimeDate);
//班级详情
router.get('/class/:id', filterMiddle.filter,classController.show);
//加入班级
router.post('/class/:id/adduser', filterMiddle.filter,classController.addUser);
//点名
router.post('/lesson/:id/user', filterMiddle.filter,lessonController.updata);
router.get('/lesson/:id', filterMiddle.filter,lessonController.show);
//更改课程
router.put('/lesson/:id', filterMiddle.filter,lessonController.edit);

/* user_class 表 */
router.post('/userClass', filterMiddle.filter,userClassController.insert);



module.exports = router;