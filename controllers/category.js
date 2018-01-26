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
            res.send(doc);
        })
    },
    /**
     * 保存
     */
    save: (req, res, next) => {
        let c = new Category({
            name: 'Javascript',
            path: 'javascript',
            sort:0,
            delete_at: ''
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