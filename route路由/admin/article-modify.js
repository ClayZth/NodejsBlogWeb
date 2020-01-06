//引入第三方模块
const formidable = require('formidable')
const path = require('path');
const { Article } = require('../../model数据库/article');
module.exports = async(req, res, next) => {
    //res.send('ok')
    // 接收客户端传递过来的参数
    const { title, publishDate, cover, content } = req.body;
    //即将要修改的文章id
    const id = req.query.id;

    let article = await Article.findOne({ _id: id });

    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public静态资源', 'uploads');
    //保留上传文件的后缀
    form.keepExtensions = true;
    //解析表单
    //解析表单
    form.parse(req, async(err, fields, files) => {
        //err错误对象 如果表单解析失败 err里面存储错误信息 成功err为null
        //fields 对象类型 保存普通表单数据
        //files 对象类型 保存了和上传文件相关的数据
        //res.send(files.cover.path.split('public静态资源')[1])
        await Article.updateOne({ _id: id }, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public静态资源')[1],
            content: fields.content,
        });
        res.redirect('/admin/article');
    })
}