const Article = require('../models/article');
const Category = require('../models/category');

const ArticleController = {
    /**
     * 列表
     */
    index: (req, res, next) => {
        //搜索关键字
        let key = req.query.key;
        let regex = new RegExp(key);
        //分页
        let count = 0;
        let limit = 2;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let is_jing = req.query.is_jing;
        let where = {};
        if (key) {
            where.title = {$regex: regex};
        }
        if (is_jing == 1) {
            where.is_jing = 1
        }
        Article.find(where).count().then(doc => {
            count = doc;
            totalPage = Math.ceil(count / limit)
            Article.find(where).skip((page - 1) * limit).limit(2).sort({create_at: 'desc'}).then(doc => {
                res.json({
                    status: 1,
                    result: {
                        list: doc,
                        totalPage: totalPage,
                        page: page,
                        count: count,
                        limit: limit
                    }
                });
            })
        });
    },

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
     * 详情
     */
    getAjax: (req, res, next) => {
        Article.findOne({_id: req.params.id}).then(doc => {
            res.json({
                'status': 1,
                'result': doc
            });
        })
    },
    /**
     * 发布文章页面
     */
    add: (req, res, next) => {
        Category.find({'is_sys': 0}).where({delete_at: null}).then(document => {
            res.render('add_article', {categoryList: document})
        });
    },
    /**
     * 发布文章
     */
    save: (req, res, next) => {
        let filename = '';
        if (req.file) {
            filename = req.file.filename;
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
    },
    /**
     * 发布文章
     */
    delete: (req, res, next) => {
        Article.remove({_id: req.params.id}).then(doc => {
            res.json({
                status: 1,
                msg: '删除成功！'
            });
        }).then(err => {
            res.json({
                status: 1,
                msg: '删除失败！'
            });
        });
    }
}
module.exports = ArticleController;
