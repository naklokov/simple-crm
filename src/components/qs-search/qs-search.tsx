import { Button, Drawer } from "antd";
import React, { useCallback, useState } from "react";

import style from "./qs-search.module.scss";

const title = "Поиск в Quick Sales";

interface QsSearchProps {
  url: string;
}

const table = {
  tableName: "Клиенты QS",
  tableDescription: "Список клиентов",
  tableCode: "clientsQS",
  columns: [
    {
      columnName: "Наименование",
      columnCode: "shortName",
      columnType: "string",
      columnDescription: "Наименование",
      fixed: "left",
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
      filterable: true,
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
      columnName: "ИНН",
      columnCode: "inn",
      columnType: "string",
      columnDescription: "ИНН",
      filterable: true,
      sorter: false,
    },
    {
      columnName: "Куратор",
      columnCode: "userProfileId",
      columnType: "dictionary",
      titleField: "fullName",
      valueField: "id",
      sorter: false,
      filterable: true,
      filterOperator: "equal",
      columnDescription: "Куратор компании",
    },
  ],
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
      {/* <Tooltip title={title}>
        <Icon onClick={handleOpen} />
      </Tooltip> */}
      <Drawer
        title={title}
        placement="right"
        closable={false}
        onClose={handleClose}
        visible={visible}
      >
        {/* TODO ждём бек и сервис */}
        {/* <Table.Server url="" table={table} /> */}
      </Drawer>
    </div>
  );
};

export default QsSearch;
