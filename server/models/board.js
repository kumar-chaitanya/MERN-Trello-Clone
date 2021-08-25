const mongoose = require('mongoose')

const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
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

module.exports = mongoose.model('Board', boardSchema)