const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  boards: [{
    type: Schema.Types.ObjectId,
    ref: 'Board'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Project', projectSchema)