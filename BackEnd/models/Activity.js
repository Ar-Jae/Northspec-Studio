const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  icon: { type: String },
  text: { type: String, required: true },
  time: { type: String }, // Can be relative like "Just now" or absolute
  type: { 
    type: String, 
    enum: ['bug', 'release', 'modification', 'deletion', 'other'],
    default: 'other'
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
