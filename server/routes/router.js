const uuid = require('uuid/v4')
const { Router } = require('express')

module.exports = function sencariosRouter(scenarios) {

  const router = new Router()

  router.get('/', (req, res, next) => {
    scenarios
      .find({ user: { $type: 'null' } }, { projection: { id: 1, name: 1 } })
      .toArray()
      .then(scenarios => res.json(scenarios))
      .catch(err => next(err))
  })

  router.get('/:user', (req, res, next) => {
    scenarios
      .find({ user: req.params.user }, { projection: { id: 1, name: 1 } })
      .toArray()
      .then(scenarios => res.json(scenarios))
      .catch(err => next(err))
  })

  router.get('/:id', (req, res, next) => {
    scenarios
      .findOne({ id: req.params.id }, { projection: { _id: 0 } })
      .then(found => {
        found
          ? res.json(found)
          : res.sendStatus(404)
      })
      .catch(err => next(err))
  })

  router.post('/', (req, res, next) => {
    const scenario = Object.assign(req.body, { id: uuid() })
    scenarios
      .insertOne(scenario)
      .then(({ ops: [ created ] }) => {
        delete created._id
        res.status(201).json(created)
      })
      .catch(err => next(err))
  })

  router.put('/:id', (req, res, next) => {
    scenarios
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

  router.delete('/:id', (req, res, next) => {
    scenarios
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