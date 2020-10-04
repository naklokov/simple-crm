import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { TableAll, TablePersonal } from "./components";
import { ClientEntityProps, PERMISSIONS } from "../../constants";

import style from "./clients.module.scss";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { useTranslation } from "react-i18next";
import ClientsHeader from "./header";
import { PagePermissionsChecker } from "../../wrappers";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setClients, setTableLoading } from "../../__data__";

// TODO проверить пермишены
const {
  CLIENTS: { GET, GET_OWNER, ADMIN },
} = PERMISSIONS;

const CLIENTS_RADIO_OPTIONS = {
  MY: "myClients",
  ALL: "allClients",
};

interface ClientsProps {
  title?: string;
  clients: ClientEntityProps[];
  profileInfo: ProfileInfoProps;
  setClients: (clients: ClientEntityProps[]) => void;
}

export const Clients = ({ setClients, clients, profileInfo }: ClientsProps) => {
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

  const table =
    selectedRadio === CLIENTS_RADIO_OPTIONS.ALL ? (
      <TableAll userProfileId={profileInfo.id} extraHeader={radioSelect} />
    ) : (
      <TablePersonal extraHeader={radioSelect} />
    );

  return (
    <PagePermissionsChecker availablePermissions={[GET, GET_OWNER, ADMIN]}>
      <div>
        <div className={style.header}>
          <ClientsHeader />
        </div>
        <div className={style.container}>{table}</div>
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
