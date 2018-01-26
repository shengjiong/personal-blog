const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', user.login);
router.get('/logout', user.logout);

module.exports = router;
