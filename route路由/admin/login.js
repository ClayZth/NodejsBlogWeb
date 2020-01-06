//登录功能
//导入用户集合构造函数
//导入bcrypt
const { User } = require('../../model数据库/user')
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    //接收请求参数
    const { email, password } = req.body;
    //如果没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }
    //根据邮箱地址查询用户信息
    //如果查询到了用户，user的值为对象类型，对象中存储的是用户信息，如果没有查询到，user为空
    let user = await User.findOne({ email });
    //查询到用户
    if (user) {
        //将客户端传递过来的密码和用户信息中的密码进行比对
        const isValid = await bcrypt.compare(password, user.password);
        //如果密码比对成功
        if (isValid) {
            //将用户名存储在请求对象中
            //登录成功
            req.session.username = user.username;
            //将用户角色存储在session对象中
            req.session.role = user.role;
            //重定向到用户列表页
            //res.redirect('/admin/user');
            //req中拿到的就是app.js中的app
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if (user.role == 'admin') {
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }
        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
        }

    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }

}