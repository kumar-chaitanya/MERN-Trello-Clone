const router = require('express').Router()
const Project = require('../models/project')
const Board = require('../models/board')

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

module.exports = router