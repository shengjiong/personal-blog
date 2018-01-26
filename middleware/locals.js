const Category = require('../models/category');
const User = require('../models/user');
const Article = require('../models/article');

const LocalsMiddleware = (req, res, next) => {

    res.locals.error = req.flash('error');
    res.locals.info = req.flash('info');

    Category.find({'delete_at': null}).then(document => {
        res.locals.url = req.url
        res.locals.category = document;
        User.findOne({username: 'blog'}).then(document => {
            res.locals.user = document;
        })
        next();
    });
}

module.exports = LocalsMiddleware;
