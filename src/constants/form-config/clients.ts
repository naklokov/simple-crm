import { TableActionProps, TableColumnProps, urls } from "../index";
import { PERMISSIONS } from "../permissions";

const { CLIENTS } = PERMISSIONS;

export const COLUMNS: TableColumnProps[] = [
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
];

export const ACTIONS: TableActionProps[] = [
  {
    actionName: "Удалить",
    actionType: "delete",
    permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
    href: urls.clients.entity,
  },
];
