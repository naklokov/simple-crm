import React from "react";
import { Typography } from "antd";
import { Table } from "../../components";
import { TableColumnProps, urls, TableActionProps } from "../../constants";

const columns: TableColumnProps[] = [
  {
    columnName: "Наименование",
    columnCode: "shortName",
    columnType: "string",
    columnDescription: "Наименование",
    sorter: true,
    actionType: "href",
    href: urls.clients.path,
  },
  {
    columnName: "Телефон",
    columnCode: "phone",
    columnType: "string",
    columnDescription: "Телефон",
    actionType: "call",
    sorter: true,
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
    format: "dd.MM.YYYY",
    sorter: true,
    columnDescription: "Дата регистрации",
  },
];

const actions: TableActionProps[] = [
  {
    actionName: "Удалить",
    actionType: "delete",
    href: urls.clients.entity,
  },
];

export const Clients = () => {
  return (
    // <Filter />
    // <AdditionalActions />
    <Table columns={columns} actions={actions} url={urls.clients.entity} />
  );
};

export default Clients;
