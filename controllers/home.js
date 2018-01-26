const Article = require('../models/article');
const Category = require('../models/category');
const path = require('path');

/**
 * 首页
 */
const Home = {
    /**
     * 首页
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        Article.find().count().then(total => {
            let page = req.params.page ? req.params.page : 1;
            let rows = 2;
            let totalPage = Math.ceil(total / rows);
            Article.find().skip((page - 1) * 2).limit(rows).sort({'create_at': 'desc'}).then(document => {
                document.forEach((data) => {
                    if (data.img) {
                        data.img = '/uploads' + data.img;
                    }
                })
                res.render('index', {
                        'list': document,
                        'page': page,
                        'rows': 'rows',
                        'totalPage': totalPage,
                        'total': total
                    }
                );
            });
        });
    },
    /**
     * 首页
     * @param req
     * @param res
     * @param next
     */
    category: (req, res, next) => {
        let categoryPath = req.params.categoryPath;
        Category.findOne({path: '/' + categoryPath}).then(document => {
            Article.find({category: document._id}).count().then(total => {
                let page = req.params.page ? req.params.page : 1;
                let rows = 2;
                let totalPage = Math.ceil(total / rows);
                Article.find({category: document._id}).skip((page - 1) * 2).limit(rows).sort({'create_at': 'desc'}).then(document => {
                    document.forEach((data) => {
                        if (data.img) {
                            data.img = '/uploads' + data.img;
                        }
                    })
                    res.render('index', {
                            'list': document,
                            'page': page,
                            'rows': 'rows',
                            'totalPage': totalPage,
                            'total': total
                        }
                    );
                });
            });
        });
    }
}

module.exports = Home;