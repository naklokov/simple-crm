type PermissionsEntityType = {
  [key in EntityType]: { [keyEntityChild in OperationTypeEntity]: string };
};

type OperationTypeEntity =
  | "GET.ALL"
  | "GET.OWNER"
  | "ADD.ALL"
  | "DELETE.ALL"
  | "UPDATE.ALL"
  | "UPDATE.DEPARTMENT";

type EntityType =
  | "CLIENTS"
  | "NAMEDITEM"
  | "COMMENTS"
  | "DEPARTMENTS"
  | "USERPROFILES"
  | "SALESPLANS"
  | "CONTACTS"
  | "TASKS"
  | "ESTIMATEDITEMS"
  | "DEALS";

const PERMISSION_PREFIX_ENTITY = "CRM.ENTITY";
const PERMISSION_PREFIX_VIEW = "CRM.VIEW";

const OPERATIONS_ENTITY: OperationTypeEntity[] = [
  "ADD.ALL",
  "DELETE.ALL",
  "GET.ALL",
  "GET.OWNER",
  "UPDATE.ALL",
  "UPDATE.DEPARTMENT",
];

const ENTITIES: EntityType[] = [
  "CLIENTS",
  "COMMENTS",
  "TASKS",
  "CONTACTS",
  "NAMEDITEM",
  "DEPARTMENTS",
  "USERPROFILES",
  "SALESPLANS",
  "ESTIMATEDITEMS",
  "DEALS",
];

const getPermission = (
  prefix: string,
  entity: EntityType,
  operation: OperationTypeEntity
) => `${prefix}.${entity}.${operation}`;

const createPermissionsByEntity = (entity: EntityType) =>
  OPERATIONS_ENTITY.reduce(
    (prev, operation) => ({
      ...prev,
      [operation]: getPermission(PERMISSION_PREFIX_ENTITY, entity, operation),
    }),
    {}
  );

const createEntityPermissions = () => ({
  ...ENTITIES.reduce(
    (prev, entity) => ({
      ...prev,
      [entity]: createPermissionsByEntity(entity),
    }),
    {} as PermissionsEntityType
  ),
});

export const PERMISSIONS = {
  ...createEntityPermissions(),
  DEPARTMENTS: {
    ...createEntityPermissions()?.DEPARTMENTS,
    CHIEF: {
      DELETE: `${PERMISSION_PREFIX_VIEW}.CHIEF.DELETE`,
    },
  },
};

export const PERMISSIONS_SET = {
  CLIENT_GET: [
    PERMISSIONS.CLIENTS["GET.ALL"],
    PERMISSIONS.CLIENTS["GET.OWNER"],
  ],
  CLIENT_UPDATE: [PERMISSIONS.CLIENTS["UPDATE.ALL"]],
  CLIENT_UPDATE_DEPARTMENT: [
    PERMISSIONS.CLIENTS["UPDATE.ALL"],
    PERMISSIONS.CLIENTS["UPDATE.DEPARTMENT"],
  ],
  CLIENT_DELETE: [PERMISSIONS.CLIENTS["DELETE.ALL"]],
  TASK_GET: [PERMISSIONS.TASKS["GET.ALL"], PERMISSIONS.TASKS["GET.OWNER"]],
  TASK_UPDATE: [PERMISSIONS.TASKS["UPDATE.ALL"]],
  TASK_DELETE: [PERMISSIONS.TASKS["DELETE.ALL"]],
  CONTACT_UPDATE: [PERMISSIONS.CONTACTS["UPDATE.ALL"]],
  CONTACT_DELETE: [PERMISSIONS.CONTACTS["UPDATE.ALL"]],
  DEPARTMENTS_GET: [
    PERMISSIONS.DEPARTMENTS["GET.ALL"],
    PERMISSIONS.DEPARTMENTS["GET.OWNER"],
  ],
  USERPROFILES_UPDATE_DEPARTMENT: [
    PERMISSIONS.USERPROFILES["UPDATE.ALL"],
    PERMISSIONS.USERPROFILES["UPDATE.DEPARTMENT"],
  ],
};

export const USER_ROLES_ID = {
  ROLE_ADMIN: "ae14b449-08fc-4cf1-9d84-9f0edc260a58",
  ROLE_MANAGER: "733397ea-8436-44d4-9beb-2bc9e674e9e8",
  ROLE_AUTHORIZED_USER: "921c8416-6672-44ac-b80c-fad4d6202e07",
  ROLE_DEPT_CHIEF: "f1de4b25-c46e-411e-8caa-10421e0866fc",
  ROLE_AUDITOR: "9fc33f97-d367-41ce-ad7d-c264082dbeca",
  ROLE_SUB_DEPT_CHIEF: "b35730e5-aa45-4a53-9692-caec05edfde4",
};
