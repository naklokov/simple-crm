import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Table } from "../../components";
import {
  formConfig,
  PERMISSIONS,
  ProfileInfoProps,
  State,
  urls,
} from "../../constants";

import style from "./clients.module.scss";
import { useTranslation } from "react-i18next";
import ClientsHeader from "./header";
import { PagePermissionsChecker } from "../../wrappers";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setTableLoading } from "../../__data__";
import { getEqualRsql } from "../../components/table/utils";

const CLIENTS_RADIO_OPTIONS = {
  MY: "myClients",
  ALL: "allClients",
};

interface ClientsProps {
  title?: string;
  profileInfo: ProfileInfoProps;
}

export const Clients = ({ profileInfo }: ClientsProps) => {
  const [t] = useTranslation("clients");
  const [selectedRadio, setSelectedRadio] = useState(CLIENTS_RADIO_OPTIONS.MY);

  const handleChangeRadio = useCallback(
    (e: RadioChangeEvent) => {
      const { value } = e.target;
      setSelectedRadio(value);
    },
    [selectedRadio]
  );

  const radioSelect = (
    <Radio.Group
      style={{ float: "right" }}
      value={selectedRadio}
      onChange={handleChangeRadio}
    >
      <Radio.Button value={CLIENTS_RADIO_OPTIONS.MY}>
        {t("radio.my")}
      </Radio.Button>
      <Radio.Button value={CLIENTS_RADIO_OPTIONS.ALL}>
        {t("radio.all")}
      </Radio.Button>
    </Radio.Group>
  );

  const isPersonalClients = selectedRadio === CLIENTS_RADIO_OPTIONS.MY;
  const personalClientsRsql = profileInfo.id
    ? [getEqualRsql("userProfileId", profileInfo.id)]
    : [];

  const { TABLES } = formConfig.clients;

  if (!profileInfo.id) {
    return null;
  }

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <div>
        <div className={style.header}>
          <ClientsHeader />
        </div>
        <div className={style.container}>
          {isPersonalClients ? (
            <Table.Server
              table={TABLES[0]}
              url={urls.clients.paging}
              extraHeader={radioSelect}
              extraRsqlParams={personalClientsRsql}
            />
          ) : (
            <Table.Server
              table={TABLES[0]}
              url={urls.clients.paging}
              extraHeader={radioSelect}
            />
          )}
        </div>
      </div>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
