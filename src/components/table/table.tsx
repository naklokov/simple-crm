import React, { useState, useEffect } from "react";
import { Table as TableUI } from "antd";

interface ColumnActionsProps {
  actionName: string;
  actionDescription: string;
  actionCode: string;
  actionType: "href" | "delete" | "call" | "email" | "view" | "delete";
  href?: string;
}

interface TableColumnProps {
  columnName: string;
  columnDescription?: string;
  columnCode: "phone";
  columnType:
    | "string"
    | "date"
    | "number"
    | "dictionary"
    | "entity"
    | "boolean";
  format?: string;
  columnActions?: [
    {
      actionDescription: string;
      actionType: ColumnActionsProps;
      actionCode: string;
    }
  ];
}

interface TableProps {
  url: string;
  columns: TableColumnProps;
}

export const Table = ({ columns, url }) => {
  const [dataSource, setDataSource] = useState([]);

  const fetchDataSource = async () => {};

  useEffect(() => {
    fetchDataSource();
  }, []);

  return <TableUI columns={columns} dataSource={dataSource} />;
};

/**
 * [{
			"tableName": "Контакты",
			"tableDescription": "Список контактов компании",
			"tableCode": "tab1",
			"columns": [{
					"columnName": "Телефон",
					"columnDescription": "Телефон контакта",
					"columnCode": "phone",
					"columnType": "string",
					"columnActions": [{
							"actionDescription": "Телефон клиента",
							"actionType": "call", //email,view,delete
							"actionCode": "contactCall"
						}
					]
				}, {
					"columnName": "Контакт важный",
					"columnDescription": "Признак важности контакта",
					"columnCode": "impotantContact",
					"columnType": "boolean",
				}, {
					"columnName": "Дата добавления",
					"columnDescription": "Дата добавления контакта",
					"columnCode": "createdDate",
					"columnType": "date",
				}, {
					"columnName": "Откат",
					"columnDescription": "Откат с контакта",
					"columnCode": "rollout",
					"columnType": "number",
				}, {
					"columnName": "Тип контакта",
					"columnDescription": "Тип контакта",
					"columnCode": "contactType",
					"columnType": "dictionary"
				}, {
					"columnName": "Куратор",
					"columnDescription": "Куратор контакта",
					"columnCode": "curator",
					"columnType": "entity",
					"format": "{{firstName}} {{secondName}} {{lastName}}"
				}, {
					"columnName": "",
					"columnDescription": "Куратор контакта",
					"columnCode": "curator",
					"columnType": "entity",
					"format": "{{firstName}} {{secondName}} {{lastName}}",
					"_links": {
						"curator": {
							"href": "http://localhost:8080/user/{{id}}"
						}
					}
				}
			]
 */
