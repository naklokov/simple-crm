import { ActionProps, ColumnProps, urls } from "../index";
import { PERMISSIONS } from "../permissions";

const { CLIENTS } = PERMISSIONS;

export const COLUMNS: ColumnProps[] = [
  {
    columnName: "Наименование",
    columnCode: "shortName",
    columnType: "string",
    columnDescription: "Наименование",
    sorter: true,
    columnActions: [
      {
        actionName: "",
        permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
        actionType: "href",
        href: urls.clients.path,
      },
    ],
  },
  {
    columnName: "Телефон",
    columnCode: "phone",
    columnType: "string",
    columnDescription: "Телефон",
    columnActions: [
      {
        actionType: "call",
        actionName: "",
        permissions: [],
      },
    ],
    sorter: false,
  },
  {
    columnName: "Город",
    columnCode: "city",
    columnType: "string",
    columnDescription: "Город",
    sorter: true,
  },
  {
    columnName: "Дата регистрации",
    columnCode: "creationDate",
    columnType: "date",
    format: "DD.MM.YYYY",
    sorter: true,
    columnDescription: "Дата регистрации",
  },
  {
    columnName: "Куратор",
    columnCode: "userProfileId",
    columnType: "dictionary",
    titleField: "fullName",
    valueField: "id",
    sorter: true,
    columnDescription: "Куратор компании",
  },
];

export const ACTIONS: ActionProps[] = [
  {
    actionName: "Удалить",
    actionType: "delete",
    permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
    href: urls.clients.entity,
  },
];

export const TABLES = [
  {
    tableName: "Клиенты",
    tableDescription: "Список клиентов",
    tableCode: "clientsTable",
    columns: COLUMNS,
    _links: {
      userProfileId: {
        href: urls.userProfiles.entity,
      },
    },
    tableActions: ACTIONS,
  },
];
