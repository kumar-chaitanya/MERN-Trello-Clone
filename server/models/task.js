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
  }
})

module.exports = mongoose.model('Task', taskSchema)
