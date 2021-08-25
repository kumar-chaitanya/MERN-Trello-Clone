const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

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


app.get('/', (req, res) => {
  res.send('Hello')
})

mongoose.connect('mongodb+srv://admin:kumar@mern-trello-clone.2v8to.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (!err) {
    app.listen(PORT, () => {
      console.log('Listening on Port ' + PORT)
    })
  }
})


