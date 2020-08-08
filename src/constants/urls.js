module.exports = {
  error: {
    path: "/crm/errors",
  },
  login: {
    path: "/crm/login",
    submit: "/crm/login",
    logout: "/crm/logout",
  },
  forgotPassword: {
    path: "/crm/forgotPassword",
    submit: "/crm/rest/password/initiate",
  },
  restorePassword: {
    path: "/crm/restorePassword",
    check: "/crm/rest/password/checkToken",
    submit: "/crm/rest/password/change",
  },
  log: {
    base: "/crm/rest/log",
  },
  profile: {
    path: "/crm/profile",
    info: "/crm/rest/entity/userProfile",
  },
  clients: {
    path: "/crm/clients",
  },
  tasks: {
    path: "/crm/tasks",
  },
  deals: {
    path: "/crm/deals",
  },
  knowledge: {
    path: "/crm/knowledge",
  },
  dictionaries: {
    position: "/crm/rest/dictionary/position",
  },
};
