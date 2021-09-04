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
      if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

      const task = new Task({
        content,
        projectId,
        boardId
      })

      task.createdBy = req.user

      await task.save()
      board.tasks.push(task)
      await board.save()

      return res.status(201).json(task)
    }

    return res.status(404).json({ message: 'Resorces does not exist' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.updateTask = async (req, res) => {
  const { projectId, boardId, id } = req.params
  const { content } = req.body

  try {
    const task = await Task.findOne({ _id: id })

    if (task && (task.projectId === projectId) && (task.boardId === boardId)) {
      if (req.user.id !== task.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

      task.content = content
      await task.save()

      return res.status(200).json(task)
    } else {
      return res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }

}

exports.deleteTask = async (req, res) => {
  const { projectId, boardId, id } = req.params

  try {
    const board = await Board.findOne({ _id: boardId })

    if (board
      && (board.projectId === projectId)
      && (board.tasks.includes(mongoose.Types.ObjectId(id)))) {
      if (req.user.id !== board.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

      await Task.findOneAndDelete({ _id: id })
      board.tasks.pull(mongoose.Types.ObjectId(id))
      await board.save()

      return res.sendStatus(200)
    } else {
      return res.status(404).json({ message: 'Resource does not exist' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}