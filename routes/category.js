const express = require('express');
const router = express.Router();
const category = require('../controllers/category');

/**
 * 分类路由
 */
router.get('/', category.index);
router.get('/save', category.save);
router.get('/update', category.update);
router.get('/delete', category.delete);

module.exports = router;
