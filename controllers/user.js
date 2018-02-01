const User = require('../models/user');
const md5 = require('md5');
const static = require('../library/static');

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
                    user.avatar = static(user.avatar);
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
    },
    personal: (req, res, next) => {
        let user = req.session.user;
        console.log(user);
        res.render('personal', {user: user});
    },
    update: (req, res, next) => {
        let user = req.session.user;
        let filename = '';
        if (req.file) {
            filename = req.file.filename;
        }
        user.avatar = filename;
        user.nickname = req.body.nickname;
        user.signature = req.body.signature;
        user.position = req.body.position;
        user.other = req.body.other;
        User.update({_id: user._id}, {$set: user}).then(document => {
            req.flash('info', '保存成功！');
            res.redirect("/users/personal");
        });
    },
}

module.exports = UserController;