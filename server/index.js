require('dotenv/config')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const scenariosRouter = require('./routes/router')

const MONGODB_URI = 'mongodb://localhost:27017/smart-buy-app'
const PORT = 3000

MongoClient
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .then(client => {

    const db = client.db()
    const collection = db.collection('scenarios')

    const publicPath = path.join(__dirname, 'public/')
    express()
      .use(express.static(publicPath))
      .use(bodyParser.json())
      .use('/scenarios', scenariosRouter(collection))
      .use((err, req, res, next) => {
        console.error(err)
        res.status(500).json({
          error: 'Internal Server Error'
        })
      })
      .listen(PORT, () => {
        console.log(`Listening on ${PORT}!`)
      })
  })