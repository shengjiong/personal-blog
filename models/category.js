var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
/**
 * 栏目
 */
const CategorySchema = new Schema({
    id: ObjectId,
    name: String,
    path: String,
    sort: {
        type: Number,
        default: 0
    },
    pid: {
        type: ObjectId,
        ref: 'category'
    },
    template: {
        type: String,
        default: ''
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