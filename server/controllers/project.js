const Project = require('../models/project')
const Board = require('../models/board')
const Task = require('../models/task')

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
    return res.json({ projects })
  } catch (err) {
    console.log(err)
  }
}

exports.getProject = async (req, res) => {
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
}

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body
    const project = new Project({ name, boards: [] })

    await project.save()

    return res.sendStatus(201)
  } catch (err) {
    console.log(err)
  }
}

exports.deleteProject = async (req, res) => {
  const { id } = req.params

  try {
    await Task.deleteMany({ projectId: id })
    await Board.deleteMany({ projectId: id })
    await Project.findOneAndDelete({ _id: id })
    
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
}

exports.updateProject = async (req, res) => {
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
}