const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  boardId: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Task', taskSchema)
