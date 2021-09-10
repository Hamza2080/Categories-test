const mongoose = require('mongoose'), Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const categorySchema = new Schema({
  name: String,
  _id: String,
  parent_id: { type: String, ref: 'Category' }
}, { versionKey: false });

module.exports.Category = mongoose.model('Category', categorySchema);
