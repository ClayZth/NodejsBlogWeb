const { Article } = require('../../model数据库/article');

module.exports = async(req, res) => {
    //获取到要删除的文章id
    //根据id删除文章
    await Article.findOneAndDelete({ _id: req.query.id });
    //重定向
    res.redirect('/admin/article');
}