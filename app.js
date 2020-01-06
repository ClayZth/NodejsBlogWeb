 const express = require('express');
 //处理路径
 const path = require('path');

 //引入body-parser模块，用来处理post请求参数
 const bodyPaser = require('body-parser');
 //导入express-session模块
 const session = require('express-session');
 //导入art-template模板引擎
 const template = require('art-template');
 //导入dateformat模块
 const dateFormat = require('dateformat');
 //导入morgan模块
 const morgan = require('morgan');
 //导入config模块
 const config = require('config');
 //创建网站服务器
 const app = express();
 //数据库连接
 require('./model数据库/connect');

 //处理post请求参数 利用app.use拦截请求，将请求交给body-parser
 //设置成false使用系统模块进行处理
 //这一句必须写到路由前面，不然获取不到
 app.use(bodyPaser.urlencoded({ extended: false }));
 //配置session
 app.use(session({ secret: 'secret key' }));
 //开放静态资源文件
 app.use(express.static(path.join(__dirname, 'public静态资源')));

 console.log(config.get('title'));

 //获取系统环境变量 返回值是对象
 if (process.env.NODE_ENV == 'development') {
     //当前是开发环境
     console.log('当前是开发环境');
     //在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
     app.use(morgan('dev'))
 } else {
     //当前是生产环境
     console.log('当前是生产环境');
 }

 //告诉express框架模板所在的位置
 app.set('views', path.join(__dirname, 'views模板'));

 //告诉express框架模板的默认后缀是什么 
 app.set('view engine', 'art');

 //当渲染后缀为art的模板时，所使用的的模板引擎是什么
 app.engine('art', require('express-art-template'));

 //向模板内部导入dateFormate变量
 template.defaults.imports.dateFormat = dateFormat;

 // 导入路由对象
 const home = require('./route路由/home');
 const admin = require('./route路由/admin');
 //有顺序的，必须写在匹配路由之前
 app.use('/admin/', require('./middleware/loginGuard'));
 //为路由匹配请求路径
 app.use('/home', home);
 app.use('/admin', admin);

 app.use((err, req, res, next) => {
     //将字符串类型转换成对象类型
     //JSON.parse()
     const result = JSON.parse(err);
     //{path:'/admin/user-edit',message:'密码错误，不能进行用户修改',id:id}
     let params = [];
     for (let attr in result) {
         if (attr != 'path') {
             params.push(attr + '=' + result[attr]);
         }
     }
     res.redirect(`${result.path}?${params.join('&')}`);
 })

 app.listen(80);
 console.log('网站服务器启动成功');