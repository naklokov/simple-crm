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
    info: "/crm/rest/user/profile",
    permissions: "/crm/rest/user/permissions",
  },
  clients: {
    path: "/clients",
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
  },
};
