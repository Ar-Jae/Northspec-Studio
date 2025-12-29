const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  author: { type: String },
  time: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
