const Article = require('../models/article');
const Category = require('../models/category');

const ArticleController = {
    /**
     * 获取文章
     */
    get: (req, res, next) => {
        Article.findOne({_id: req.params.id}).then(document => {
            let view = document.view + 1;
            Article.update({_id: req.params.id}, {$set: {view: view}}).then(document => {
            });
            document.img = '/uploads/' + document.img;
            res.render('article', {
                article: document
            })
        });
    },
    /**
     * 发布文章页面
     */
    add: (req, res, next) => {
        res.render('add_article')
    },
    /**
     * 发布文章
     */
    save: (req, res, next) => {
        let filename = '';
        if (req.file) {
            let filename = req.file.filename;
        }
        let article = new Article({
            'img': filename,
            'title': req.body.title,
            'category': req.body.category,
            'author': req.body.author,
            'jing': req.body.jing,
            'contents': req.body.contents
        });
        article.save();
        req.flash('info', '发布成功！');
        res.redirect("/");

    }
}
module.exports = ArticleController;
