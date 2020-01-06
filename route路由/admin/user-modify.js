const bcrypt = require('bcrypt');
const { User } = require('../../model数据库/user');
module.exports = async(req, res, next) => {
    //接收客户端传递过来的参数
    const { username, email, role, state } = req.body;
    //即将要修改的用户id
    const id = req.query.id;

    let user = await User.findOne({ _id: id });

    const isValid = await bcrypt.compare(req.body.password, user.password)

    if (isValid) {
        //密码比对成功
        //将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        //重定向页面
        res.redirect('/admin/user')
    } else {
        //密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码错误，不能进行用户修改', id: id }
        next(JSON.stringify(obj));
    }

}