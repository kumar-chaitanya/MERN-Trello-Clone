require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')
const boardRoutes = require('./routes/board')
const taskRoutes = require('./routes/task')

const isAuthenticated = require('./middleware/isAuthenticated')

const app = express()
const PORT = process.env.port || 5000

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/projects', isAuthenticated, projectRoutes)
app.use('/projects/:id/boards', isAuthenticated, boardRoutes)
app.use('/projects/:projectId/boards/:boardId/task', isAuthenticated, taskRoutes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (!err) {
    app.listen(PORT, () => {
      console.log('Listening on Port ' + PORT)
    })
  }
  else console.log(err)
})


