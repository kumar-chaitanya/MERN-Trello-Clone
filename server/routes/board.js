const mongoose = require('mongoose')
const router = require('express').Router({ mergeParams: true })
const Project = require('../models/project')
const Board = require('../models/board')

router.post('/', async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id })

    if(project) {
      const { title } = req.body
      const board = new Board({
        title,
        projectId: id,
        position: project.boards.length,
        tasks: []
      })

      await board.save()
      project.boards.push(board)
      await project.save()

      return res.sendStatus(201)
    }

    return res.sendStatus(404)
  } catch (err) {
    console.log(err)
  }
})

router.put('/moveTask', async (req, res) => {
  const { id } = req.params
  const { moveFromBoardId, moveToBoardId, taskId, position } = req.body

  try {
    const project = await Project.findOne({ _id: id })
    const moveFromBoard = await Board.findOne({ _id: moveFromBoardId })
    const moveToBoard = await Board.findOne({ _id: moveToBoardId })

    if(project 
      && moveFromBoard 
      && moveToBoard ) {
        moveFromBoard.tasks.pull(mongoose.Types.ObjectId(taskId))
        moveToBoard.tasks.push({
          $each: [mongoose.Types.ObjectId(taskId)],
          $position: position
        })

        await moveFromBoard.save()
        await moveToBoard.save()
        res.sendStatus(200)
      }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router