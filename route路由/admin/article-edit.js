// module.exports = (req, res) => {
//     //标识当前访问的是文章管理页面
//     req.app.locals.currentLink = 'article';
//     res.render('admin/article-edit.art')
// }
const { Article } = require('../../model数据库/article');
module.exports = async(req, res) => {
    //标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';
    //获取到地址栏中的id参数
    const { id } = req.query;
    //如果当前传递了id参数
    if (id) {
        //修改操作
        let article = await Article.findOne({ _id: id });

        //渲染用户编辑页面
        res.render('admin/article-edit', {
            //message: message,
            Article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });

    } else {
        //添加参数
        res.render('admin/article-edit', {
            //message: message,
            link: '/admin/article-add',
            button: '添加'
        });
    }
}