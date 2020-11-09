type Permissions = {
  [key in EntityType]: { [key in OperationTypeAdmin]: string };
};

type OperationTypeAdmin = "GET.ALL" | "GET.OWNER" | "ADD.ALL" | "DELETE.ALL" | "UPDATE.ALL"
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

const PERMISSION_PREFIX = "CRM.ENTITY";

const OPERATIONS_ADMIN: OperationTypeAdmin[] = [
  "ADD.ALL",
  "DELETE.ALL",
  "GET.ALL",
  "GET.OWNER",
  "UPDATE.ALL",
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

const getPermission = (entity: EntityType, operation: OperationTypeAdmin) =>
  `${PERMISSION_PREFIX}.${entity}.${operation}`;

const createPermissionsByEntity = (entity: EntityType) =>
  OPERATIONS_ADMIN.reduce(
    (prev, operation) => ({
      ...prev,
      [operation]: getPermission(entity, operation),
    }),
    {}
  );

const createAllPermissions = (): Permissions =>
  ENTITIES.reduce(
    (prev, entity) => ({
      ...prev,
      [entity]: createPermissionsByEntity(entity),
    }),
    {} as Permissions
  );

export const PERMISSIONS = createAllPermissions();

export const PERMISSIONS_SET = {
  CLIENT_GET: [PERMISSIONS.CLIENTS['GET.ALL'], PERMISSIONS.CLIENTS["GET.OWNER"]],
  CLIENT_UPDATE: [PERMISSIONS.CLIENTS["UPDATE.ALL"]],
  CLIENT_DELETE: [PERMISSIONS.CLIENTS["DELETE.ALL"]],
  TASK_GET: [PERMISSIONS.TASKS['GET.ALL'], PERMISSIONS.TASKS["GET.OWNER"]],
  TASK_UPDATE: [PERMISSIONS.TASKS["UPDATE.ALL"]],
  TASK_DELETE: [PERMISSIONS.TASKS["DELETE.ALL"]],
  CONTACT_UPDATE: [PERMISSIONS.CONTACTS["UPDATE.ALL"]],
  CONTACT_DELETE: [PERMISSIONS.CONTACTS["UPDATE.ALL"]],
};
