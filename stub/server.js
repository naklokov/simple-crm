const jsonServer = require("json-server");
const server = jsonServer.create();

const {
  dictionaries,
  permissions,
  clients: clientsResponse,
  templates: templatesResponse,
  profileInfo,
  userProfiles: userProfilesResponse,
  tasks: tasksResponse,
  tasksPaging: tasksPagingResponse,
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
  tasks,
} = require("../src/constants/urls");

const {
  addAuthCookie,
  checkLogin,
  loggerStub,
  checkToken,
  sendSuccessResponse,
  sendPostResponse,
} = require("./utils");

const middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);

// auth stub
server.use("/crm/login", addAuthCookie, checkLogin);
server.use("/crm/logout", sendSuccessResponse());

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
server.get(profile.entity, sendSuccessResponse(profileInfo));
server.put(profile.entity, sendPostResponse(profileInfo));
server.get(profile.credentials, sendPostResponse(permissions));

// клиенты
server.get(clients.paging, sendSuccessResponse(clientsResponse));
server.get(clients.entity, sendSuccessResponse(clientsResponse));
server.get(
  `${clients.entity}/:id`,
  sendSuccessResponse(clientsResponse?.rows[0])
);
server.get(userProfiles.entity, sendSuccessResponse(userProfilesResponse));
server.get(
  `${userProfiles.entity}/:id`,
  sendSuccessResponse(userProfilesResponse[0])
);
server.get(departments.entity, sendSuccessResponse(departments));

server.use(tasks.paging, sendSuccessResponse(tasksPagingResponse));
server.use(tasks.entity, sendSuccessResponse(tasksResponse));

server.get(
  dictionariesUrls.position,
  sendSuccessResponse(dictionaries.position)
);

server.listen(8080, () => {
  console.log("JSON server is running!");
});
