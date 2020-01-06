const { Article } = require('../../model数据库/article');
//导入mongoose-sex-page
const pagination = require('mongoose-sex-page');


module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const page = req.query.page;
    //标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //查询所有文章数据
    //page指定当前页 size指定每一页显示的数据条数
    //display指定客户端要显示的页码数量
    //exec向数据库中发送查询请求
    let articles = await pagination(Article).find().page(page).size(2).display(5).populate('author').exec();
    //res.send(articles);
    res.render('admin/article.art', {
        articles: articles
    });
}