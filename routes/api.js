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

/* GET users listing. */
router.get('/login',authController.login);
// filterMiddle.filter
/* manager 表 */
router.post('/manager',managerController.insert);
router.get('/manager/:id',managerController.single);
router.put('/manager/:id',managerController.edit);
router.delete('/manager/:id',managerController.delete);
router.get('/manager',managerController.all);



/* user 表 */
router.post('/user',userController.insert);
router.get('/user/:id',userController.single);
router.put('/user/:id',userController.edit);
router.put('/user/recover/:id',userController.recover);
router.get('/user',userController.all);
router.delete('/user/:id',userController.delete);
// router.get('/user/select',managerController.selectAll);

/* payment 表 */
router.post('/payment',paymentController.insert);
router.get('/payment',paymentController.selectIndex);


/* course 表 */
router.post('/course',courseController.insert);
router.put('/course/:id',courseController.edit);
router.get('/course',courseController.all);
router.get('/course/:id',courseController.single);
router.delete('/course/:id',courseController.delete);

/* class 表 */
//班级列表
router.get('/class',classController.selectAll);
//创建班级
router.post('/class',classController.insert);
//修改课程数量
router.put('/class/:id',classController.edit);
//班级详情
router.get('/class/:id',classController.show);
//加入班级
router.post('/class/:id/adduser',classController.addUser);
//点名
router.put('/lesson/:id/user',lessonController.updata);
//更改课程
router.put('/lesson/:id',lessonController.edit);


/* user_class 表 */
router.post('/userClass',userClassController.insert);

module.exports = router;
