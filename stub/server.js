const jsonServer = require("json-server");
const server = jsonServer.create();

const {
  dictionaries,
  permissions,
  clients: clientsResponse,
  templates: templatesResponse,
} = require("./jsons");

const {
  login,
  log,
  forgotPassword,
  restorePassword,
  profile,
  dictionaries: dictionariesUrls,
  userProfiles,
  departments,
  clients,
  templates,
} = require("../src/constants/urls");

const {
  addAuthCookie,
  checkLogin,
  loggerStub,
  checkToken,
  sendSuccessResponse,
  sendPostResponse,
} = require("./utils");

// const middlewares = jsonServer.defaults()
// Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)

server.use(jsonServer.bodyParser);

// auth stub
server.use(login.submit, addAuthCookie, checkLogin);
server.use(login.logout, sendSuccessResponse());

//logger stub
server.post(log.base, loggerStub);

//forgotPassword
server.post(forgotPassword.submit, sendSuccessResponse());

//checkToken
server.post(restorePassword.check, checkToken);
server.get(templates.entity, sendSuccessResponse(templatesResponse));
server.post(templates.generation, sendSuccessResponse(new Int8Array(4096)));

//restorePassword
server.post(restorePassword.submit, (req, res) => {
  res.status(HTTP_CODES.SUCCESS).json({});
});

//getProfileInfo
// server.get(profile.info, sendSuccessResponse(profileInfo));
// server.put(profile.entity, sendPostResponse(profileInfo));
server.get(profile.permissions, sendPostResponse(permissions));

// клиенты
server.get(clients.entity, sendSuccessResponse(clientsResponse));
server.get(userProfiles.entity, sendSuccessResponse(userProfiles));
server.get(departments.entity, sendSuccessResponse(departments));

server.get(
  dictionariesUrls.position,
  sendSuccessResponse(dictionaries.position)
);

server.listen(8080, () => {
  console.log("JSON server is running!");
});
