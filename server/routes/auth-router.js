const uuid = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')

const validateCredentials = (credentials = {}) => {
  const errors = {}
  const { username, password, passwordConfirm } = credentials
  if (!username) errors.usernameError = 'Username must not be empty'
  if (!password) errors.passwordError = 'Password must not be empty'
  if (password.length < 8) errors.passwordError = 'Password must be at least 8 characters long'
  if (passwordConfirm && password !== passwordConfirm) errors.passwordError = 'Passwords do not match'
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
          usernameError: `"${username}" is not available.`
        })
      })
      .catch(err => next(err))
  }

  const validateLogin = (req, res, next) => {
    const errors = validateCredentials(req.body)
    if (Object.keys(errors).length) {
      return res.status(401).json({
        error: 'Invalid login.'
      })
    }
    next()
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

  router.post('/login', validateLogin, (req, res, next) => {
    const { body: { username, password: unhashed } } = req
    users
      .findOne({ username })
      .then(found => {
        if (!found) return null
        const { id, password: hashed } = found
        return bcrypt
          .compare(unhashed, hashed)
          .then(match => {
            if (!match) return null
            return { id, username }
          })
      })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            error: 'Invalid login.'
          })
        }
        const token = jwt.sign(user, process.env.TOKEN_SECRET)
        res.status(201).json(Object.assign(user, { token }))
      })
      .catch(err => next(err))
  })

  return router
}