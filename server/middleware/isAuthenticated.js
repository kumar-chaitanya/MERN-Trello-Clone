const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).json({ message: 'Authorization header is not present' })

  const authToken = authorization.split(' ')[1]
  if (!authToken) return res.status(401).json({ message: 'Authentication token is not present' })

  try {
    const { id, email } = jwt.verify(authToken, 'randomSecret@123')
    const user = await User.findOne({id, email})

    if(!user) return res.status(401).json({ message: 'Invalid User' })

    req.user = user
    next()
  } catch (err) {
    console.log(err)
    if (err.message === 'jwt expired') return res.status(401).json({ message: 'AuthToken expired, please login again' })
    return res.status(500).json({ message: err.message || 'Some error occurred, please try again' })
  }
}