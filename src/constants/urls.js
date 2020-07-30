module.exports = {
  error: {
    path: "/errors",
  },
  login: {
    path: "/login",
    submit: "/crm/login",
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
    base: "/crm/log",
  },
  profile: {
    path: "/profile",
    info: "/crm/",
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
};
