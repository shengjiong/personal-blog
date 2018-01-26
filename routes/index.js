const express = require('express');
const router = express.Router();
const home = require('../controllers/home');

/**
 * 首页路由
 */
router.get('/', home.index);
router.get('/page/:page', home.index);
router.get('/:categoryPath', home.category);

module.exports = router;
