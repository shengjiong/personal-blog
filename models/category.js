var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const ObjectId = Schema.Types.ObjectId;
/**
 * 栏目
 */
const CategorySchema = new Schema({
    name: String,
    path: String,
    sort: {
        type: Number,
        default: 100
    },
    pid: {
        type: ObjectId,
        ref: 'Category'
    },
    category: [{
        type: ObjectId,
        ref: 'Category'
    }],
    template: {
        type: String,
        default: ''
    },
    is_sys: {
        type: Number,
        default: 0
    },
    is_nav: {
        type: Number,
        default: 0
    },
    create_at: {
        type: Date,
        default: Date.now,
        get: val => moment(val).format('YYYY-MM-DD HH:mm')
    },
    update_at: {
        type: Date,
        default: Date.now,
        get: val => moment(val).format('YYYY-MM-DD HH:mm')
    },
    delete_at: {
        type: Date,
        default: null,
        get: val => moment(val).format('YYYY-MM-DD HH:mm')
    }
})

/**
 * 栏目实体
 */
var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;