import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { Table, Tabs } from "../../components";
import {
  formConfig,
  PERMISSIONS,
  ProfileInfoProps,
  State,
  urls,
  TabProps,
} from "../../constants";

import style from "./clients.module.scss";
import { ClientsHeader } from "./header";
import { PagePermissionsChecker } from "../../wrappers";
import { setTableLoading } from "../../__data__";
import { getPersonalClientsRsql } from "./utils";

interface ClientsProps {
  title?: string;
  profileInfo: ProfileInfoProps;
}

const {
  CLIENTS: { tabs: TABS },
} = formConfig.clients;

export const Clients: React.FC<ClientsProps> = ({ profileInfo }) => {
  const personalClientsRsql = getPersonalClientsRsql(profileInfo?.id);

  const TABS_MAP: {
    [key: string]: (props: any) => any;
  } = {
    clientsPersonal: ({ tab }: { tab: TabProps }) => (
      <Table.Server
        columns={tab?.columns}
        actions={tab?.actions}
        _links={tab?._links}
        url={urls.clients.paging}
        extraRsqlParams={personalClientsRsql}
      />
    ),
    clientsAll: ({ tab }: { tab: TabProps }) => (
      <Table.Server
        columns={tab?.columns}
        actions={tab?.actions}
        _links={tab?._links}
        url={urls.clients.paging}
      />
    ),
  };

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <div>
        <div className={style.header}>
          <ClientsHeader />
        </div>
        <div className={style.container}>
          <Tabs theme={{ tabs: style.tabs }} tabsMap={TABS_MAP} tabs={TABS} />
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
