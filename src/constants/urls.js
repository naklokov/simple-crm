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
    pathWithId: "/main/profile/:id",
    entity: "/crm/rest/user/profile",
    credentials: "/crm/rest/user/permissions",
  },
  departments: {
    path: "/main/departments",
    entity: "/crm/rest/entity/departments",
    paging: "/crm/rest/entity/departments/paging",
  },
  departmentCard: {
    path: "/main/departments/:id",
    entity: "/crm/rest/entity/departments",
  },
  userProfiles: {
    entity: "/crm/rest/entity/userProfiles",
    paging: "/crm/rest/entity/userProfiles/paging",
  },
  clients: {
    path: "/main/clients",
    entity: "/crm/rest/entity/clients",
    paging: "/crm/rest/entity/clients/paging",
    customByDepartment:
      "/crm/rest/entity/clients/custom/paging/clientsByDepartment",
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
    branchAddresses: "/crm/rest/dictionary/BRANCH_ADDRESSES",
    position: "/crm/rest/dictionary/position",
    activityFields: "/crm/rest/dictionary/ACTIVITY_FIELDS",
    positionUnit: "/crm/rest/dictionary/POSITION_UNIT",
  },
};
