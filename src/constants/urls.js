module.exports = {
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
  error: {
    path: "/error",
  },
  log: {
    base: "/crm/rest/log",
  },
  profile: {
    path: "/profile",
    entity: "/crm/rest/user/profile",
    permissions: "/crm/rest/user/permissions",
  },
  userProfiles: {
    entity: "/crm/rest/entity/userProfiles",
  },
  clients: {
    path: "/clients",
    entity: "/crm/rest/entity/clients",
    paging: "/crm/rest/entity/clients/paging",
  },
  clientCard: {
    path: "/clients/:id",
    entity: "/crm/rest/entity/clients",
  },
  contacts: {
    entity: "/crm/rest/entity/contacts",
  },
  priceList: {
    entity: "/crm/rest/priceList/price",
  },
  comments: {
    entity: "/crm/rest/entity/comments",
  },
  tasks: {
    path: "/tasks",
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
    userProfiles: "/crm/rest/dictionary/userProfiles",
  },
};
