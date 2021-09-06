const Project = require('../models/project')
const Board = require('../models/board')
const Task = require('../models/task')

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user })
    return res.json({ projects })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.getProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id }).populate({
      path: 'boards',
      populate: { path: 'tasks' }
    })

    if (!project) return res.status(404).json({ message: 'Project does not exist' })

    if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })


    return res.json(project)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body
    const project = new Project({ name, boards: [] })
    project.createdBy = req.user

    await project.save()

    return res.status(201).json(project)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.deleteProject = async (req, res) => {
  const { id } = req.params

  try {
    const project = await Project.findOne({ _id: id })

    if (!project) return res.status(404).json({ message: 'Project does not exist' })

    if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

    await Task.deleteMany({ projectId: id })
    await Board.deleteMany({ projectId: id })
    await Project.findOneAndDelete({ _id: id })

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}

exports.updateProject = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const project = await Project.findOne({ _id: id })

    if (!project) return res.status(404).json({ message: 'Project does not exist' })

    if (req.user.id !== project.createdBy.toString()) return res.status(403).json({ message: 'Unauthorized to access this resource' })

    project.name = name
    await project.save()

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error has occurred please try again' })
  }
}