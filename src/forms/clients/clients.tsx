import React, { useEffect, useCallback, useState } from "react";
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
import { Checkbox } from "antd";

const { COLUMNS, TABLES } = formConfig.clients;
// TODO проверить пермишены
const {
  CLIENTS: { GET, GET_OWNER, ADMIN },
} = PERMISSIONS;

interface PaginationsProps {
  page: number;
  pageSize: number;
  sortBy: string;
  searched: string;
  myClientsChecked: boolean;
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
    myClientsChecked: true,
  });
  const [total, setTotal] = useState(0);

  const url = urls.clients.paging;

  useEffect(() => {
    fetchDataSource(pagination);
  }, [url]);

  const fetchDataSource = async ({
    searched,
    myClientsChecked,
    ...params
  }: PaginationsProps) => {
    const userProfileId = myClientsChecked ? profileInfo.id : "";
    const query = getQueryString(searched, userProfileId);

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          ...params,
          query,
        },
      });

      const { totalCount, rows } = response?.data ?? {};
      setClients(rows);
      setTotal(totalCount);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (searched: string) => {
      const page = 1;
      const updated = { ...pagination, page, searched };
      setPagination(updated);
      fetchDataSource(updated);
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
    (pagination, filters, sorter) => {
      const { current: page, pageSize } = pagination;
      const sortBy = getSortedParams(sorter);

      const updated = { ...pagination, page, pageSize, sortBy };
      setPagination(updated);
      fetchDataSource(updated);
    },
    [clients]
  );

  const handleCheckMyClients = useCallback(() => {
    const updated = {
      ...pagination,
      myClientsChecked: !pagination.myClientsChecked,
    };

    setPagination(updated);
    fetchDataSource(updated);
  }, [pagination]);

  const serverPagination: TablePaginationConfig = {
    pageSize: pagination.pageSize,
    current: pagination.page,
    total,
  };

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
              <Checkbox
                style={{ float: "right", marginTop: "6px" }}
                onChange={handleCheckMyClients}
                checked={pagination.myClientsChecked}
              >
                {t("checkbox.my.clients")}
              </Checkbox>
            }
            loading={loading}
            pagination={serverPagination}
            onDeleteRow={handleDelete}
            dataSource={clients}
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
  clients: state?.clients ?? [],
  profileInfo: state?.persist?.profileInfo ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients, setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
