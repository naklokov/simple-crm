module.exports = {
  login: {
    path: "/login",
    submit: "/crm/rest/login",
    logout: "/crm/rest/logout",
  },
  main: {
    path: "/main",
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
    path: "/main/profile",
    entity: "/crm/rest/user/profile",
    permissions: "/crm/rest/user/permissions",
  },
  departments: {
    entity: "/crm/rest/entity/departments",
  },
  userProfiles: {
    entity: "/crm/rest/entity/userProfiles",
  },
  clients: {
    path: "/main/clients",
    entity: "/crm/rest/entity/clients",
    paging: "/crm/rest/entity/clients/paging",
  },
  clientCard: {
    path: "/main/clients/:id",
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
    path: "/main/tasks",
    entity: "/crm/rest/entity/tasks",
    paging: "/crm/rest/entity/tasks/paging",
  },
  templates: {
    generation: "/crm/rest/generation",
    entity: "/crm/rest/entity/templates",
  },
  deals: {
    path: "/deals",
  },
  knowledge: {
    path: "/knowledge",
  },
  dictionaries: {
    position: "/crm/rest/dictionary/position",
    activityFields: "/crm/rest/dictionary/ACTIVITY_FIELDS",
    positionUnit: "/crm/rest/dictionary/POSITION_UNIT",
    userProfiles: "/crm/rest/dictionary/userProfiles",
  },
};
