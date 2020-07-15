module.exports = {
  error: {
    path: "/error",
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
  clients: {
    path: "/clients",
  },
};
