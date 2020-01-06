//实现添加用户功能
//引入用户集合构造函数
const { User, validateUser } = require('../../model数据库/user');
//引入加密模块
const bcrypt = require('bcrypt');


module.exports = async(req, res, next) => {
    try {
        await validateUser(req.body);
    } catch (ex) {
        //验证没有通过
        //e.massage
        //重定向到用户添加页面
        //return res.redirect(`/admin/user-edit?message=${ex.message}`);
        //Json.stringify()将对象数据类型转换成字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: ex.message }))
    }

    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    //如果用户已将存在
    if (user) {
        //重定向到用户添加页面
        //重定向后执行了res.end 如果不返回继续执行res就会报错
        //return res.redirect(`/admin/user-edit?message=邮箱地址已经注册过`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经注册过' }))
    }
    //对密码进行加密
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;

    //将用户信息添加到数据库中
    await User.create(req.body);
    //讲页面重定向到用户列表页面
    res.redirect('/admin/user');


}