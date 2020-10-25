import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { TableAll, TablePersonal } from "./components";
import { PERMISSIONS, ProfileInfoProps, State } from "../../constants";

import style from "./clients.module.scss";
import { useTranslation } from "react-i18next";
import ClientsHeader from "./header";
import { PagePermissionsChecker } from "../../wrappers";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setTableLoading } from "../../__data__";

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

  const Table =
    selectedRadio === CLIENTS_RADIO_OPTIONS.ALL ? TableAll : TablePersonal;

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <div>
        <div className={style.header}>
          <ClientsHeader />
        </div>
        <div className={style.container}>
          <Table extraHeader={radioSelect} userProfileId={profileInfo.id} />
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
