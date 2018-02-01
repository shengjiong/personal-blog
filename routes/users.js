const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');
const upload = require('../library/upload');

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', user.login);
router.get('/logout', auth, user.logout);
router.get('/personal', auth, user.personal);
router.post('/personal', upload.single('img'), auth, user.update);

module.exports = router;
