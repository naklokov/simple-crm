import { Button, Drawer } from "antd";
import React, { useCallback, useState } from "react";
import { TableProps } from "../../constants";
import { Table } from "../table";

import style from "./qs-search.module.scss";

const title = "Поиск в Quick Sales";

interface QsSearchProps {
  url: string;
}

const table: TableProps = {
  tableName: "Клиенты QS",
  tableDescription: "Список клиентов",
  tableCode: "clientsQS",
  columns: [
    {
      columnName: "Краткое наименование",
      columnCode: "shortName",
      columnType: "string",
      columnDescription: "Краткое наименование",
      sorter: true,
      filterable: true,
      columnActions: [],
    },
    {
      columnName: "Полное наименование",
      columnCode: "fullName",
      columnType: "string",
      columnDescription: "Полное наименование",
      sorter: true,
      filterable: true,
      columnActions: [],
    },
    {
      columnName: "Телефон",
      columnCode: "phone",
      columnType: "string",
      columnDescription: "Телефон",
      filterable: true,
      columnActions: [],
      sorter: false,
    },
    {
      columnName: "Город",
      columnCode: "city",
      columnType: "string",
      columnDescription: "Город",
      filterable: true,
      sorter: true,
    },
    {
      columnName: "ИНН",
      columnCode: "inn",
      columnType: "string",
      columnDescription: "ИНН",
      filterable: true,
      sorter: false,
    },
    {
      columnName: "Куратор",
      columnCode: "managerName",
      columnType: "string",
      sorter: false,
      filterable: true,
      columnDescription: "Куратор компании",
    },
  ],
  actions: [],
  _links: {},
};

export const QsSearch = ({ url }: QsSearchProps) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, [visible]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [visible]);

  return (
    <div className={style.container}>
      <Button onClick={handleOpen}>{title}</Button>
      <Drawer
        title={title}
        placement="right"
        closable={false}
        onClose={handleClose}
        visible={visible}
        width="90%"
      >
        <Table.Server url={url} table={table} />
      </Drawer>
    </div>
  );
};

export default QsSearch;
