const uuid = require('uuid/v4')
const { Router } = require('express')

module.exports = function sencariosRouter(collection) {

  const router = new Router()

  router.get('/', (req, res, next) => {
    collection
      .find({}, { projection: { id: 1, name: 1 } })
      .toArray()
      .then(scenarios => res.json(scenarios))
      .catch(err => next(err))
  })

  router.get('/:id', (req, res, next) => {
    collection
      .findOne({ id: req.params.id }, { projection: { _id: 0, id: 0, name: 0 } })
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

  router.put('/:id', (req, res, next) => {
    collection
    .findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { returnOriginal: false }
    )
    .then(({ value }) => {
      value
        ? res.json(value)
        : res.sendStatus(404)
    })
    .catch(err => next(err))
  })

  app.delete('/scenarios/:id', (req, res, next) => {
    collection
      .findOneAndDelete({ id: req.params.id })
      .then(({ value }) => {
        value
          ? res.sendStatus(204)
          : res.sendStatus(404)
      })
      .catch(err => next(err))
  })

  return router
}