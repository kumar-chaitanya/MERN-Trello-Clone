const mongoose = require('mongoose')
const Project = require('../models/project')
const Board = require('../models/board')
const Task = require('../models/task')

exports.createBoard = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id })

    
    if(project) {
      if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })
      const { title } = req.body
      const board = new Board({
        title,
        projectId: id,
        tasks: []
      })

      board.createdBy = req.user

      await board.save()
      project.boards.push(board)
      await project.save()

      return res.status(201).json(board)
    }

    return res.status(404).json({ message: 'Project does not exist' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.updateBoard = async (req, res) => {
  const { id, boardId } = req.params
  const { title } = req.body

  try {
    const board = await Board.findOne({ _id: boardId })

    if(board && (board.projectId === id)) {
      if (req.user.id !== board.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })
      board.title = title
      await board.save()

      return res.status(200).json(board)
    } else {
      return res.status(404).json({ message: 'Board does not exist' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.deleteBoard = async (req, res) => {
  const { id, boardId } = req.params

  try {
    const project = await Project.findOne({ _id: id })
    if (!project) return res.status(404).json({ message: 'Project does not exist' })

    if(project && project.boards.includes(mongoose.Types.ObjectId(boardId))) {
      if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

      await Task.deleteMany({ projectId: id, boardId })
      await Board.findOneAndDelete({ _id: boardId })
      project.boards.pull(mongoose.Types.ObjectId(boardId))
      await project.save()

      return res.sendStatus(200)
    } else {
      return res.status(404).json({ message: 'Board does not exist' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.moveTask = async (req, res) => {
  const { id } = req.params
  const { moveFromBoardId, moveToBoardId, taskId, position } = req.body

  try {
    const project = await Project.findOne({ _id: id })
    const moveFromBoard = await Board.findOne({ _id: moveFromBoardId })
    const moveToBoard = await Board.findOne({ _id: moveToBoardId })
    const task = await Task.findOne({ _id: taskId })

    if(project 
      && moveFromBoard 
      && moveToBoard ) {
        if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

        task.boardId = moveToBoardId
        moveFromBoard.tasks.pull(mongoose.Types.ObjectId(taskId))
        moveToBoard.tasks.push({
          $each: [mongoose.Types.ObjectId(taskId)],
          $position: position
        })

        await task.save()
        await moveFromBoard.save()
        await moveToBoard.save()
        res.sendStatus(200)
      } else {
        return res.status(404).json({ message: 'Resources does not exist' })
      }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}