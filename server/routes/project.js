const router = require('express').Router()
const controller = require('../controllers/project')

router.get('/', controller.getAllProjects)

router.get('/:id', controller.getProject)

router.post('/', controller.createProject)

router.delete('/:id', controller.deleteProject)

router.put('/:id', controller.updateProject)

module.exports = router