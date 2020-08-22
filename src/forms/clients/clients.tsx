import React from "react";
import { Table } from "../../components";
import { TableColumnProps, urls, TableActionProps } from "../../constants";
import { PERMISSIONS } from "../../constants";

const { CLIENTS } = PERMISSIONS;

const columns: TableColumnProps[] = [
  {
    columnName: "Наименование",
    columnCode: "shortName",
    columnType: "string",
    columnDescription: "Наименование",
    // TODO сделать нормальную сортировку
    sorter: (a: any, b: any) => a.shortName > b.shortName,
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
    sorter: (a: any, b: any) => a.city > b.city,
  },
  {
    columnName: "Дата регистрации",
    columnCode: "creationDate",
    columnType: "date",
    format: "DD.MM.YYYY",
    sorter: (a: any, b: any) => a.date > b.date,
    columnDescription: "Дата регистрации",
  },
];

const actions: TableActionProps[] = [
  {
    actionName: "Удалить",
    actionType: "delete",
    permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
    href: urls.clients.entity,
  },
];

export const Clients = () => {
  return (
    // <Filter />
    // <AdditionalActions />
    <Table
      columns={columns}
      actions={actions}
      url={urls.clients.entity}
      withSearch
    />
  );
};

export default Clients;
