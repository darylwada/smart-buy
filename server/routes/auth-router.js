const uuid = require('uuid')
const bcrypt = require('bcrypt')
const { Router } = require('express')

const validateCredentials = (credentials = {}) => {
  const errors = {}
  const { username, password } = credentials
  if (!username) errors.username = 'Username must not be empty'
  if (!password) errors.password = 'Password must not be empty'
  if (password.length < 8) error.password = 'Password must be at least 8 characters long'
  return errors
}

module.exports = function authRouter(users) {

  const validateSignUp = (req, res, next) => {
    const errors = validateCredentials(req.body)
    if (Object.keys(errors).length) {
      return res.status(400).json(errors)
    }
    const { body: { username } } = req
    users
      .findOne({ username })
      .then(found => {
        if (!found) return next()
        res.status(400).json({
          username: `"${username}" is not available.`
        })
      })
      .catch(err => next(err))
  }

  const router = new Router()

  router.post('/sign-up', validateSignUp, (req, res, next) => {
    const id = uuid()
    const { body: { username, password: unhashed } } = req
    bcrypt
      .hash(unhashed, 10)
      .then(password => users.insertOne({ id, username, password }))
      .then(() => users.findOne({ id }, { projection: { password: 0 } }))
      .then(user => res.status(201).json(user))
      .catch(err => next(err))
  })

  return router
}