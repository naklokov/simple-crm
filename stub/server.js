const jsonServer = require("json-server");
const server = jsonServer.create();

const { dictionaries, profileInfo } = require("./jsons");

const {
  login,
  log,
  forgotPassword,
  restorePassword,
  profile,
  dictionaries: dictionariesUrls,
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
server.get(profile.info, sendSuccessResponce(profileInfo));
server.post(profile.entity, sendPostResponce(profileInfo));

server.get(
  dictionariesUrls.position,
  sendSuccessResponce(dictionaries.position)
);

server.listen(8080, () => {
  console.log("JSON server is running!");
});
