const express = require('express')
const mongoose = require('mongoose')

const projectRoutes = require('./routes/project')

const app = express()
const PORT = process.env.port || 5000

app.use(express.json())

app.use('/projects', projectRoutes)


app.get('/', (req, res) => {
  res.send('Hello')
})

mongoose.connect('mongodb+srv://admin:kumar@mern-trello-clone.2v8to.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, err => {
  if (!err) {
    app.listen(PORT, () => {
      console.log('Listening on Port ' + PORT)
    })
  }
})


