require('dotenv/config')

module.exports = {
  ui: false,
  files: ['server/public/'],
  serveStatic: ['server/public/'],
  port: 3001,
  proxy: `http://localhost:3001`
  // port: parseInt(process.env.PORT, 10) + 1,
  // proxy: `http://localhost:${process.env.PORT}`
}