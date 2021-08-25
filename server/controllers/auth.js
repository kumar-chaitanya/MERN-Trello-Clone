const bcrypt = require('bcrypt')
const User = require('../models/user')
const isValidEmail = require('../utils/validateEmail')

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body
  const saltRounds = 10

  if (username && email && password) {
    if (isValidEmail(email)) {
      try {
        const hashPwd = bcrypt.hashSync(password, saltRounds);
        const user = new User({
          username,
          email,
          password: hashPwd
        })

        await user.save()
        return res.status(201).json(user)
      } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message || 'Some error occurred, please try again' })
      }
    }
    return res.status(400).json({ message: 'Invalid Email' })
  }

  return res.status(400).json({ message: 'All fields are required' })
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    if (isValidEmail(email)) {
      try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found' })

        if (!bcrypt.compareSync(password, user.password)) return res.status(404).json({ message: 'Incorrect Password' })

        return res.status(200).json(user)
      } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message || 'Some error occurred, please try again' })
      }
    }
    return res.status(400).json({ message: 'Invalid Email' })
  }

  return res.status(400).json({ message: 'All fields are required' })
}