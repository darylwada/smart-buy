require('dotenv/config')

module.exports = {
  ui: false,
  files: ['server/public/'],
  serveStatic: ['server/public/'],
  port: parseInt(process.env.PORT, 10) + 1,
  proxy: `http://localhost:${process.env.PORT}`
}