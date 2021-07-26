const express = require('express')

const app = express()

const PORT = process.env.port || 5000

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT)
})


