const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')

const { addAuthCookie, sendStatus } = require('../utils')

// const middlewares = jsonServer.defaults()
// Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)

server.use(jsonServer.bodyParser)

// auth
server.use('/login', 
  addAuthCookie,
  sendStatus,
)

// Use default router
server.use(router)
server.listen(9080, () => {
  console.log('JSON server is running!')
})