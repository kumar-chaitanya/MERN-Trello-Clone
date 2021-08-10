const mongoose = require('mongoose')
const Project = require('../models/project')
const Board = require('../models/board')
const Task = require('../models/task')

exports.createTask = async (req, res) => {
  const { projectId, boardId } = req.params
  const { content } = req.body

  try {
    const project = await Project.findOne({ _id: projectId })
    const board = await Board.findOne({ _id: boardId })

    if ((project && board) && (board.projectId === projectId)) {
      const task = new Task({
        content,
        projectId,
        boardId
      })

      await task.save()
      board.tasks.push(task)
      await board.save()

      return res.status(201).json(task)
    }

    return res.sendStatus(404)
  } catch (err) {
    console.log(err)
  }
}

exports.updateTask = async (req, res) => {
  const { projectId, boardId, id } = req.params
  const { content } = req.body

  try {
    const task = await Task.findOne({ _id: id })

    if (task && (task.projectId === projectId) && (task.boardId === boardId)) {
      task.content = content
      await task.save()

      return res.status(200).json(task)
    } else {
      return res.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
  }

}

exports.deleteTask = async (req, res) => {
  const { projectId, boardId, id } = req.params

  try {
    const board = await Board.findOne({ _id: boardId })

    if (board
      && (board.projectId === projectId)
      && (board.tasks.includes(mongoose.Types.ObjectId(id)))) {
      await Task.findOneAndDelete({ _id: id })
      board.tasks.pull(mongoose.Types.ObjectId(id))
      await board.save()

      return res.sendStatus(200)
    } else {
      return res.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
  }
}