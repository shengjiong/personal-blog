const Category = require('../models/category');
/**
 * 栏目控制器
 */
const CategoryController = {
    /**
     * 列表
     */
    index: (req, res, next) => {
        Category.find().then(doc => {
            res.json(doc);
        })
    },
    /**
     * 保存
     */
    save: (req, res, next) => {
        let c = new Category({
            name: '个人中心',
            path: '/personal',
        });
        c.save();
        res.send('ok');
    },
    /**
     * 更新
     */
    update: (req, res, next) => {
        // let c = new CategoryMolde({
        //     name: '测试',
        //     path: 'test'
        // });
        // c.save();
    },
    /**
     * 删除
     */
    delete: (req, res, next) => {
        // let c = new CategoryMolde({
        //     name: '测试',
        //     path: 'test'
        // });
        // c.save();
    }
}

module.exports = CategoryController;