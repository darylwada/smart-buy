const uuid = require('uuid/v4')
const { Router } = require('express')

module.exports = function sencariosRouter(collection) {

  const router = new Router()

  router.post('/', (req, res, next) => {
    const scenario = Object.assign(req.body, { id: uuid() })
    collection
      .insertOne(scenario)
      .then(({ ops: [ created ] }) => {
        res.status(201).json(created)
      })
      .catch(err => next(err))
  })

  return router
}