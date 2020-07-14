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
  log: {
    base: "/crm/log",
  },
  clients: {
    path: "/clients",
  },
};
