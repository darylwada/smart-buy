const uuid = require('uuid/v4')
const { Router } = require('express')

module.exports = function sencariosRouter(collection) {

  const router = new Router()

  router.get('/', (req, res, next) => {
    collection
      .find()
      .toArray()
      .then(scenarios => res.json(scenarios))
      .catch(err => next(err))
  })

  router.get('/:id', (req, res, next) => {
    collection
      .findOne({ id: req.params.id })
      .then(found => {
        found
          ? res.json(found)
          : res.sendStatus(404)
      })
      .catch(err => next(err))
  })

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