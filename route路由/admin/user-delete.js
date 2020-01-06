const { User } = require('../../model数据库/user');

module.exports = async(req, res) => {
    //获取到要删除的用户id
    //根据id删除用户
    await User.findOneAndDelete({ _id: req.query.id });
    //重定向
    res.redirect('/admin/user');
}