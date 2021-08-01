const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/board')

router.post('/', controller.createBoard)

router.put('/:boardId', controller.updateBoard)

router.delete('/:boardId', controller.deleteBoard)

router.put('/moveTask', controller.moveTask)

module.exports = router