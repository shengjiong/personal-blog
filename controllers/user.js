const User = require('../models/user');
const md5 = require('md5');

/**
 * 用户控制器
 */
const UserController = {
    login: (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({username: username}).then(document => {
            let user = document;
            console.log(document);
            if (user) {
                if (user.password == md5(password)) {
                    req.session.user = user;
                    let url = req.session.originalUrl ? req.session.originalUrl : '/';
                    res.redirect(url);
                }
            }
            req.flash('error', '登录失败, 用户名密码错误！');
            res.redirect("/users/login");
        });
    },
    logout: (req, res, next) => {
        delete req.session.user;
        res.redirect("/users/login");
    }
}

module.exports = UserController;