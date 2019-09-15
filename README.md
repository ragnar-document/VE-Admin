# **[LiuYinShe]() Project ( 后台管理 )**

## 目录

1. [甲方需求](https://github.com/ragnar-document/VE-Admin#%E7%94%B2%E6%96%B9%E9%9C%80%E6%B1%82)
2. [交付要求](https://github.com/ragnar-document/VE-Admin#%E4%BA%A4%E4%BB%98%E8%A6%81%E6%B1%82)
3. [技术栈](https://github.com/ragnar-document/VE-Admin#%E6%8A%80%E6%9C%AF%E6%A0%88)
4. [需求分析](https://github.com/ragnar-document/VE-Admin#%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90)
5. [后台设计分析](https://github.com/ragnar-document/VE-Admin#%E5%90%8E%E5%8F%B0%E8%AE%BE%E8%AE%A1%E5%88%86%E6%9E%90)
6. [路由API](https://github.com/ragnar-document/VE-Admin#%E8%B7%AF%E7%94%B1api)
7. [controllers](https://github.com/ragnar-document/VE-Admin#controllers%E5%88%86%E7%A6%BB%E6%8E%A7%E5%88%B6%E5%99%A8)
8. [继承](https://github.com/ragnar-document/VE-Admin#%E5%85%B6%E4%BB%96%E8%A1%A8%E6%A0%BC%E7%BB%A7%E6%89%BF%E5%85%AC%E5%85%B1%E6%96%B9%E6%B3%95)
9. [分页查询](https://github.com/ragnar-document/VE-Admin#%E5%88%86%E9%A1%B5%E6%9F%A5%E8%AF%A2)
10. [连表查询](https://github.com/ragnar-document/VE-Admin#%E8%81%94%E8%A1%A8%E6%9F%A5%E8%AF%A2)
11. [添加路由守卫](https://github.com/ragnar-document/VE-Admin#%E6%B7%BB%E5%8A%A0%E8%B7%AF%E7%94%B1%E5%AE%88%E5%8D%AB)
12. [登陆鉴权](https://github.com/ragnar-document/VE-Admin#%E7%99%BB%E9%99%86%E9%89%B4%E6%9D%83%E6%93%8D%E4%BD%9C)
13. [退出设置](https://github.com/ragnar-document/VE-Admin#%E9%80%80%E5%87%BA%E8%AE%BE%E7%BD%AE)
14. [vue后台页面展示](https://github.com/ragnar-document/VE-Admin#vue后台页面)

## 项目说明

可以提意见让我做的更好～～谢谢

## 注意事项

没有上传node——module文件 所以需要npm install 一下

加密文件没有上传以及一些私密文件没有上传

项目还在进程中很多没有完善，但是可以参考着思路自己起一个项目模仿


## 甲方需求

对方是一家位于广州增城的，面向 7 ～ 16 岁儿童音乐培训中心，目前主要有钢琴、声乐、舞蹈 几个品类的课程。

1. 小程序请假功能。
2. 课程查询功能。
3. 预约功能。
4. 使用后台对用户信息进行统计

## 交付要求

1. 微信小程序，可以预约、请假和查看上课记录。
2. 学员管理后台，可以对学员的上课记录进行管理和统计。
3. 时间：一个月。

## 技术栈

Node.js  Express

Vue-cli 、Element、Axios

微信小程序

## 需求分析

**请假功能**：什么课程允许请假，什么课程不允许。是否开启提醒功能，如果未及时请假又未去上课是否自动登记为旷课。请假后是否有课时补偿

**课程查询功能**：查询已经上线课程，在个人信息中展示已报名课程，课程剩余课时

**预约功能**：预约琴房，预约一对一课程

**数据统计**：对课程数量统计，人数统计，请假统计，

## 后台设计分析

```
首页（概览页）
- 已预约人数 | 预约课程人数
- 请假人数   | 请假总人数
- 待处理内容  | 信息阅读
- 当日课程信息 | 当日安排的所有课程
					  
用户信息 
- 用户列表 |	展示用户名，创建时间
- 用户详情 |	姓名，电话，备用电话，关系，购买的课程信息 积分
- 编辑用户 |	姓名，电话，备用电话，关系
- 添加用户 |	姓名，电话，备用电话，关系，购买的课程信息
				 
课程信息 
- 课程列表 | 课程类型 授课老师 开班时间
- 课程详情 | 课程名称 课程分类 授课老师	课程时长 课程简介 课程价格 报名人数
- 新增课程 | 课程名称 课程分类 授课老师	课程时长 课程简介 课程价格
				
老师信息 
- 老师列表 | 老师名字 老师电话
- 老师详情 | 老师名字 老师电话 住址 带领班级 入职时间
- 编辑信息 | 老师名字 老师电话 住址 带领班级
- 新增老师 | 老师名字 老师电话 住址 带领班级 入职时间
			  
班级信息 
- 班级列表 | 班级名称 班级分类 班级状态（是否开班）班级人数
- 班级详情 | 班级名称 班级分类 班级人数 班级老师 添加学员 删除学员
- 课程表   | 每日课程 每周课程 
- 班级状态 | 已结班 未开班 
- 学员信息 | 共有课时 剩余课时 积分
			  
请假信息  
- 请假列表 | 请假人姓名 请假的课程 请假原因
- 学生列表 | 学生名称 学生购买的课程 详情
				
管理员信息 
- 管理员列表 | 名称 电话
- 添加管理员 | 名称 电话 创建时间 职位
- 编辑管理员 | 名称 电话 职位
- 登陆页
```

## 路由API

```javascript
var express = require('express');
var router = express.Router();
var managerController = require('./../controllers/managerController.js')
var userController = require('./../controllers/userController.js')
var courseController = require('./../controllers/courseController.js')
var classController = require('./../controllers/classController.js')
var userClassController = require('./../controllers/userClassController.js')

/* GET users listing. */

/* manager 表 */
router.post('/manager',managerController.insert);
router.get('/manager/:id',managerController.single);
router.put('/manager/:id',managerController.edit);
router.delete('/manager/:id',managerController.delete);
router.get('/manager',managerController.all);

router.get('/managers',managerController.selectAll);
 
/* user 表 */
router.post('/user',userController.insert);
router.get('/user/:id',userController.single);
router.put('/user/:id',userController.edit);
router.get('/user',userController.all);
router.delete('/user/:id',userController.delete);

/* course 表 */
router.post('/course',courseController.insert);
router.put('/course/:id',courseController.edit);
router.get('/course',courseController.all);

/* class 表 */
//班级列表
router.get('/class',classController.all);
//创建班级
router.post('/class',classController.insert);
//班级详情
router.put('/class/:id',classController.edit);

/* user_class 表 */
router.post('/userClass',userClassController.insert);

module.exports = router;

```

## Controllers(分离控制器)

使用async/await方法 try/catch捕获成功与错误

```javascript
const managerModel = require('./../models/managerModel.js');

const managerController = {
  //插入
    insert:async function(req, res, next) {
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
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
  //单个
    single:async function(req, res, next) {
        let id = req.params.id;

        try {
           const single = await managerModel.single(id);
            res.json({ code:200, message:single})
         } catch (error) {
             console.log(error)
             res.json({ code:0, message:'新增失败' })
         } 
    },
  //编辑
    edit:async function(req, res, next) {
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
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
  //删除
    delete:async function(req, res, next) {
        let id = req.params.id;
        let isdeleted = 1;


        try {
            await managerModel.delete(id,{isdeleted})
            res.json({ code:200, message:'删除成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 

    },
  //展示全部
    all:async function(req, res, next) {

        try {
            await  managerModel.all()
            res.json({ code:200, message:'展示所有成功'})
        } catch (error) {
            console.log(error)
            res.json({ code:0, message:'系统错误' })
        } 

    }

}

module.exports = managerController;
```

## 公共Model层

```javascript
//引入knex文件
const knex = require('./knex');

class Base {
  //类构造函数接收一个props == 数据库对应的表
    constructor(props){
        this.table = props;
    }
 //插入
    insert(params){
        return knex(this.table).insert( params )
    }
 //获取单个
    single(id){
        return knex(this.table).where('id','=',id).select()
    }
 //编辑
    edit(id, params ){
        return knex(this.table).where('id', '=', id).update( params )
    }
 //获取所有
    all(){
        return knex(this.table).whereNull('isdeleted','==', null)
    }
 //删除   
    delete(id,params){
        return knex(this.table).where('id','=',id).update(params)
    }
}
//暴露文件
module.exports = Base;
```

## 其他表格继承公共方法

```javascript
const Base = require('./base.js');

//什么表继承什么
class managerModel extends Base {
	//传入表
  constructor(props = 'manager') {
    super(props);
  }
}


module.exports = new managerModel();
```

## 分页查询

```javascript
selectAll(pageIndex,pageSize,params={},){
    return  knex(this.table)
      .where(params)
      .limit(pageSize)
      .offset((pageIndex - 1)*pageSize)
      .select()
}
```

## 联表查询

```javascript
 let payment = await paymentModel.pagination(pageSize,pageIndex,params,{
                column:filterColumn,
                startAt:startAt,
                endAt:endAt
            })
            .leftJoin('users','payment.user_id','users.id')
            .column('payment.id', 'payment.total', 'payment.user_id','payment.created_time', 'users.name')
            .orderBy('id', 'desc');
```

使用leftjoin方法连接users表匹配相同id，获取想要的值，使用orderby进行排序

## 添加路由守卫

在index中添加beforeEach进行拦截,如果你在登陆页并且登陆成功后跳转首页，如果在地址栏输入其他页面并且没有登陆跳转登陆页进行登陆

- **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

```javascript
// eslint-disable-next-line
appRouter.beforeEach((to, from, next) => {
  NProgress.start();
  let hasToken = localStorage.getItem('token') ? true : false;
  if (to.name === 'login' && hasToken) {
    next({name:'Home'})
  }
  if (to.name !== 'login' && !hasToken) {
    next({ name:'login'})
  }
  next();
});
```



## 登陆鉴权操作

**在request文件下通过axios拦截器在头部上携带token发送至后端**

[查看具体](https://github.com/ragnar-document/VE-Admin/blob/master/vue-admin/src/global/request/request.js)

```javascript
// 添加一个请求拦截器（ 一般用于鉴权 )
axios.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
      newConfig.headers.Authorization = `${TOKEN}`;
    }
    return newConfig;
  },
  error => Promise.reject(error)
);
```

**在middleware层进行过滤**

1. 判断是否携带token来证明是否登陆
2. 把token解构后发送到数据库中匹配查看是否存在该该管理员

[文件过长点击跳转查看](https://github.com/ragnar-document/VE-Admin/blob/master/middleware/filterMiddle.js)

## 退出设置

清除token并且调整登陆页面

```javascript
 if (command == 'logout') {
    localStorage.clear();
    this.$router.replace({ name: 'login'});
  }
```



## Vue后台页面

主要部分使用elementUi堆砌成一个简约，美观的后台。
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/login.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/class.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/classInfo.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/classcourse.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/user.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/userInfo.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/userapply.png?raw=true)
![](https://github.com/ragnar-document/VE-Admin/blob/master/IMG/jiesuan.png?raw=true)

