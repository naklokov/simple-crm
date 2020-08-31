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
    entity:
      "/crm/rest/entity/contacts?query=isActive==true;isDeleted==false;clientId=={{id}}",
  },
  tasks: {
    path: "/tasks",
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
