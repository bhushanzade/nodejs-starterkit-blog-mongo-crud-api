const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);