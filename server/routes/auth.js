const router = require('express').Router()
const controller = require('../controllers/auth')

router.get('/login', controller.getUser)

router.post('/login', controller.loginUser)

router.post('/register', controller.registerUser)

module.exports = router