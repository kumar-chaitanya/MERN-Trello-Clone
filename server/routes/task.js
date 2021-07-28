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

    if((project && board) && (board.projectId === projectId)) {
      const task = new Task({
        content,
        projectId,
        boardId,
        position: board.tasks.length
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

module.exports = router