const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/task')

router.post('/', controller.createTask)

router.put('/:id', controller.updateTask)

router.delete('/:id', controller.deleteTask)

module.exports = router