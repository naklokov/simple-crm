const jsonServer = require("json-server");
const server = jsonServer.create();

const { dictionaries, profileInfo, permissions, clients } = require("./jsons");

const {
  login,
  log,
  forgotPassword,
  restorePassword,
  profile,
  dictionaries: dictionariesUrls,
  clients,
} = require("../src/constants/urls");

const {
  addAuthCookie,
  checkLogin,
  loggerStub,
  checkToken,
  sendSuccessResponce,
  sendPostResponce,
} = require("./utils");

// const middlewares = jsonServer.defaults()
// Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)

server.use(jsonServer.bodyParser);

// auth stub
server.use(login.submit, addAuthCookie, checkLogin);
server.use(login.logout, sendSuccessResponce());

//logger stub
server.post(log.base, loggerStub);

//forgotPassword
server.post(forgotPassword.submit, sendSuccessResponce());

//checkToken
server.post(restorePassword.check, checkToken);
//restorePassword
server.post(restorePassword.submit, sendSuccessResponce());

//getProfileInfo
// server.get(profile.info, sendSuccessResponce(profileInfo));
// server.put(profile.entity, sendPostResponce(profileInfo));
server.get(profile.permissions, sendPostResponce(permissions));

// клиенты
server.get(clients.entity, sendSuccessResponce(clients));

server.get(
  dictionariesUrls.position,
  sendSuccessResponce(dictionaries.position)
);

server.listen(8080, () => {
  console.log("JSON server is running!");
});
