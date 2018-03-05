var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const ObjectId = Schema.Types.ObjectId;
/**
 * 文章
 */
const ArticleSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    contents: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    view: {
        type: Number,
        default: 0
    },
    jing: {
        type: Number,
        default: 0,
    },
    category: {
        type: ObjectId,
        ref: 'Category' //关联Category表的_id
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

ArticleSchema.options.toJSON = ArticleSchema.options.toObject = {
    transform: function (doc, ret, options) {
        ret.create_at = moment(ret.create_at).format('YYYY-MM-DD HH:mm');
        return ret;
    }
}

/**
 * 文章实体
 */
var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;