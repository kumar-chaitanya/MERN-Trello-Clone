const mongoose = require('mongoose')
const router = require('express').Router({ mergeParams: true })
const Project = require('../models/project')
const Board = require('../models/board')
const Task = require('../models/task')

router.post('/', async (req, res) => {
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

      return res.sendStatus(201)
    }

    return res.sendStatus(404)
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  const { projectId, boardId, id } = req.params
  const { content } = req.body

  try {
    const task = await Task.findOne({ _id: id })

    if (task && (task.projectId === projectId) && (task.boardId === boardId)) {
      task.content = content
      await task.save()

      return res.sendStatus(200)
    } else {
      return res.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
  }

})

router.delete('/:id', async (req, res) => {
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
})

module.exports = router