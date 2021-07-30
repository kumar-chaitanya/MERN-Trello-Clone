const router = require('express').Router()
const Project = require('../models/project')
const Board = require('../models/board')
const Task = require('../models/task')

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({})
    return res.json({ projects })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id }).populate({
      path: 'boards',
      populate: { path: 'tasks' }
    })

    if (project) return res.json(project)

    return res.sendStatus(404)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const project = new Project({ name, boards: [] })

    await project.save()

    return res.sendStatus(201)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Task.deleteMany({ projectId: id })
    await Board.deleteMany({ projectId: id })
    await Project.findOneAndDelete({ _id: id })
    
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const project = await Project.findOne({ _id: id })
    if(project) {
      project.name = name
      await project.save()

      return res.sendStatus(200)
    } else {
      return res.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router