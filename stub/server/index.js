const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const {
  login,
  log,
  forgotPassword,
  restorePassword,
  profile,
} = require("../../src/constants/urls");

const {
  addAuthCookie,
  sendStatus,
  loggerStub,
  checkToken,
  emptySuccess,
} = require("../utils");

// const middlewares = jsonServer.defaults()
// Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)

server.use(jsonServer.bodyParser);

// auth
server.use(login.submit, addAuthCookie, sendStatus);

//logger stub
server.post(log.base, loggerStub);

//forgotPassword
server.post(forgotPassword.submit, emptySuccess);

//checkToken
server.post(restorePassword.check, checkToken);
//restorePassword
server.post(restorePassword.submit, emptySuccess);

//getProfileInfo
server.get(profile.info, (req, res) => res.status(HTTP_CODES.SUCCESS).json({}));

// Use default router
server.use(router);
server.listen(8080, () => {
  console.log("JSON server is running!");
});
