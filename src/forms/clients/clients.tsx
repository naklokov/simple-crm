import React, { useEffect, useCallback, useState, useMemo } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "../../components";
import {
  urls,
  ClientEntityProps,
  formConfig,
  PERMISSIONS,
} from "../../constants";
import { getQueryString } from "./utils";

import style from "./clients.module.scss";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { setClients, setTableLoading } from "../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import {
  getFiteredEntityArray,
  defaultErrorHandler,
  defaultSuccessHandler,
  getSortedParams,
} from "../../utils";
import { TablePaginationConfig } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import ClientsHeader from "./header";
import { PagePermissionsChecker } from "../../wrappers";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { unionBy } from "lodash";

const { COLUMNS, TABLES } = formConfig.clients;
// TODO проверить пермишены
const {
  CLIENTS: { GET, GET_OWNER, ADMIN },
} = PERMISSIONS;

const CLIENTS_RADIO_OPTIONS = {
  MY: "myClients",
  ALL: "allClients",
};

interface PaginationsProps {
  page: number;
  pageSize: number;
  sortBy: string;
  searched: string;
  selectedRadio: string;
}

interface ClientsProps {
  title?: string;
  clients: ClientEntityProps[];
  profileInfo: ProfileInfoProps;
  setClients: (clients: ClientEntityProps[]) => void;
}

export const Clients = ({ setClients, clients, profileInfo }: ClientsProps) => {
  const [t] = useTranslation("clients");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    sortBy: "",
    searched: "",
    selectedRadio: CLIENTS_RADIO_OPTIONS.MY,
  });
  const [total, setTotal] = useState(0);

  const clientsPersonal = clients.filter(
    ({ userProfileId }) => userProfileId === profileInfo.id
  );

  const dataSource =
    pagination.selectedRadio === CLIENTS_RADIO_OPTIONS.MY
      ? clientsPersonal
      : clients;

  const url = urls.clients.paging;

  const fetchDataSource = async ({
    searched,
    selectedRadio,
    ...params
  }: PaginationsProps) => {
    // const userProfileId =
    //   selectedRadio === CLIENTS_RADIO_OPTIONS.MY ? profileInfo.id : "";

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          ...params,
          query: getQueryString(searched),
        },
      });

      const { totalCount, rows } = response?.data ?? {};
      setClients(unionBy(rows, clients, "id"));
      setTotal(totalCount);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      profileInfo.id &&
      pagination.selectedRadio !== CLIENTS_RADIO_OPTIONS.MY
    ) {
      fetchDataSource(pagination);
    }
  }, [pagination, profileInfo.id]);

  const handleSearch = useCallback(
    (searched: string) => {
      const page = 1;
      const updated = { ...pagination, page, searched };
      setPagination(updated);
    },
    [clients]
  );

  const handleDelete = useCallback(
    (id) => {
      defaultSuccessHandler(t("message.delete.success"));
      setClients(getFiteredEntityArray(id, clients));
    },
    [clients]
  );

  const handleChangeTable = useCallback(
    (paginationParams, filters, sorter) => {
      const { current: page, pageSize } = paginationParams;
      const sortBy = getSortedParams(sorter);

      const updated = { ...pagination, page, pageSize, sortBy };
      setPagination(updated);
    },
    [clients]
  );

  const handleChangeRadio = useCallback(
    (e: RadioChangeEvent) => {
      const { value } = e.target;
      const updated = {
        ...pagination,
        selectedRadio: value,
      };

      setPagination(updated);
    },
    [pagination]
  );

  const serverPagination: TablePaginationConfig =
    pagination.selectedRadio === CLIENTS_RADIO_OPTIONS.ALL
      ? {
          pageSize: pagination.pageSize,
          current: pagination.page,
          total,
        }
      : { pageSize: pagination.pageSize, current: pagination.page };

  return (
    <PagePermissionsChecker availablePermissions={[GET, GET_OWNER, ADMIN]}>
      <div>
        <div className={style.header}>
          <ClientsHeader />
        </div>
        <div className={style.container}>
          <Table
            _links={TABLES[0]._links}
            columns={COLUMNS}
            extraHeader={
              <Radio.Group
                style={{ float: "right" }}
                defaultValue={pagination.selectedRadio}
                onChange={handleChangeRadio}
              >
                <Radio.Button value={CLIENTS_RADIO_OPTIONS.MY}>
                  {t("radio.my")}
                </Radio.Button>
                <Radio.Button value={CLIENTS_RADIO_OPTIONS.ALL}>
                  {t("radio.all")}
                </Radio.Button>
              </Radio.Group>
            }
            loading={loading}
            pagination={serverPagination}
            onDeleteRow={handleDelete}
            dataSource={dataSource}
            onSearch={handleSearch}
            onChangeTable={handleChangeTable}
            withSearch
          />
        </div>
      </div>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.data?.clients,
  profileInfo: state?.data?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients, setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
