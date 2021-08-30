module.exports = {
  login: {
    path: "/login",
    submit: "/crm/rest/login",
    logout: "/crm/rest/logout",
  },
  main: {
    path: "/clients",
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
  settings: {
    entity: "/crm/rest/user/meta",
    path: "/settings",
  },
  profile: {
    path: "/profile",
    pathWithId: "/profile/:id",
    entity: "/crm/rest/user/profile",
    credentials: "/crm/rest/user/permissions",
  },
  departments: {
    path: "/departments",
    entity: "/crm/rest/entity/departments",
    paging: "/crm/rest/entity/departments/paging",
  },
  departmentCard: {
    path: "/departments/:id",
    entity: "/crm/rest/entity/departments",
  },
  userProfiles: {
    entity: "/crm/rest/entity/userProfiles",
    paging: "/crm/rest/entity/userProfiles/paging",
    validation: "/crm/rest/entity/userProfiles/validation",
  },
  clients: {
    path: "/clients",
    entity: "/crm/rest/entity/clients",
    paging: "/crm/rest/entity/clients/paging",
    customByDepartment:
      "/crm/rest/entity/clients/custom/paging/clientsByDepartment",
    validation: "/crm/rest/entity/clients/validation",
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
    paging: "/crm/rest/entity/tasks/paging",
    validation: "/crm/rest/entity/tasks/validation",
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
    clientTimeZone: "/crm/rest/dictionary/TIME_ZONES",
  },
};
