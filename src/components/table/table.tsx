import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table as TableUI, Space } from "antd";

import { TableColumnProps, TableActionProps } from "../../constants/interfaces";
import { defaultErrorHandler } from "../../utils";
import { useTranslation } from "react-i18next";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setLoading as setLoadingAction,
  setTableLoading as setTableLoadingAction,
} from "../../__data__";
import { connect } from "react-redux";
import { mapAction, getActions, getDataColumns, mapWithKey } from "./utils";
import { State } from "../../__data__/interfaces";
import { filter } from "lodash";

interface TableProps {
  url: string;
  columns?: TableColumnProps[];
  actions?: TableActionProps[];
  tableLoading: boolean;
  setTableLoading: (loading: boolean) => void;
}

export const Table = ({
  columns,
  url,
  actions,
  tableLoading,
  setTableLoading,
}: TableProps) => {
  const [t] = useTranslation("table");
  const [dataSource, setDataSource] = useState([]);

  const fetchDataSource = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get(url);
      const source = mapWithKey(response?.data ?? []);
      setDataSource(source);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setTableLoading(false);
    }
  };

  // TODO отладить удаление (при повторном удалении получается фигня)
  const handleDelete = useCallback(
    (deletedId) => {
      const filteredDataSource = dataSource.filter(
        ({ id }) => id !== deletedId
      );
      setDataSource(filteredDataSource);
    },
    [dataSource]
  );

  useEffect(() => {
    fetchDataSource();
  }, []);

  const mappedColumns = getDataColumns(columns);
  const mappedActions = getActions(actions, t, handleDelete);

  return (
    <TableUI
      size="large"
      columns={[...mappedColumns, mappedActions]}
      dataSource={dataSource}
      pagination={false}
      loading={tableLoading}
      locale={{
        filterTitle: t("filter.title"),
        filterConfirm: t("filter.confirm"),
        filterReset: t("filter.reset"),
        filterEmptyText: t("filter.empty"),
        sortTitle: t("sort.title"),
        triggerDesc: t("sort.desc"),
        triggerAsc: t("sort.asc"),
        cancelSort: t("sort.cancel"),
        emptyText: t("empty"),
      }}
    />
  );
};

const mapStateToProps = (state: State) => ({
  tableLoading: state?.app?.tableLoading ?? true,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoading: (loading: boolean) => dispatch(setLoadingAction(loading)),
  setTableLoading: (loading: boolean) =>
    dispatch(setTableLoadingAction(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

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
