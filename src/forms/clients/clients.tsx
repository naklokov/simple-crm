import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { Table } from "../../components";
import {
  formConfig,
  PERMISSIONS,
  ProfileInfoEntityProps,
  State,
} from "../../constants";

import { ClientsHeader } from "./header";
import { PagePermissionsChecker } from "../../wrappers";
import { fillLinks, useTabs } from "../../utils";

interface ClientsProps {
  title?: string;
  profileInfo: ProfileInfoEntityProps;
}

const {
  CLIENTS: { tabs },
} = formConfig.clients;

export const Clients: React.FC<ClientsProps> = ({ profileInfo }) => {
  const { activeTab, onChange } = useTabs(tabs);

  if (!profileInfo.id) {
    return null;
  }

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <>
        <ClientsHeader
          footer={
            <Tabs onChange={onChange} activeKey={activeTab.tabCode}>
              {tabs.map(({ tabName, tabCode }) => (
                <Tabs.TabPane tab={tabName} key={tabCode} />
              ))}
            </Tabs>
          }
        />
        {activeTab && (
          <form>
            <Table.Server
              key={activeTab.tabName}
              columns={activeTab.columns}
              actions={activeTab.actions}
              _links={fillLinks(activeTab._links, {
                userProfileId: profileInfo.id,
              })}
            />
          </form>
        )}
      </>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Clients);
