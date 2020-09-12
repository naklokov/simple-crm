module.exports = {
  errors: {
    forbidden: "/forbidden",
    serverError: "/serverError",
  },
  login: {
    path: "/login",
    submit: "/crm/login",
    logout: "/crm/logout",
  },
  forgotPassword: {
    path: "/forgotPassword",
    submit: "/crm/rest/password/initiate",
  },
  restorePassword: {
    path: "/restorePassword",
    check: "/crm/rest/password/checkToken",
    submit: "/crm/rest/password/change",
  },
  log: {
    base: "/crm/rest/log",
  },
  profile: {
    path: "/profile",
    entity: "/crm/rest/user/profile",
    permissions: "/crm/rest/user/permissions",
    anotherProfile: "/crm/rest/entity/userProfiles/{{id}}",
  },
  clients: {
    path: "/clients",
    entity: "/crm/rest/entity/clients",
  },
  clientCard: {
    path: "/clients/:id",
    entity: "/crm/rest/entity/clients/{{id}}",
  },
  contacts: {
    clientContacts: "/crm/rest/entity/contacts?query=clientId=={{clientId}}",
    entity: "/crm/rest/entity/contacts",
  },
  priceList: {
    clientPrice:
      "/crm/rest/priceList/price?userProfileId={{userProfileId}}&clientId={{clientId}}",
    row:
      "/crm/rest/priceList/price/{{id}}?userProfileId={{userProfileId}}&clientId={{clientId}}",
    entity: "/crm/rest/priceList/price",
  },
  comments: {
    entity: "/crm/rest/entity/comments",
    client:
      "/crm/rest/entity/comments?query=entityType==clients;entityId=={{clientId}}",
  },
  tasks: {
    path: "/tasks",
    clientTasks: "/crm/rest/entity/tasks?query=clientId=={{clientId}}",
    entity: "/crm/rest/entity/tasks",
  },
  deals: {
    path: "/deals",
  },
  knowledge: {
    path: "/knowledge",
  },
  dictionaries: {
    position: "/crm/rest/dictionary/position",
    managers: "/crm/rest/dictionary/managers",
  },
};
