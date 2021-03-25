import React, { useCallback, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";

import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import {
  FORM_NAMES,
  PERMISSIONS,
  QueryProps,
  urls,
  ClientEntityProps,
  formConfig,
  State,
} from "../../constants";
import { getClientCardMode } from "./utils";
import { FormHeader, Loader } from "../../components";
import { Main, Comments, Contacts, Requisites, PriceList, Tasks } from "./tabs";
import {
  defaultErrorHandler,
  getFullUrl,
  useFormValues,
  useTabs,
} from "../../utils";
import { ClientCardHeader } from ".";
import { PagePermissionsChecker } from "../../wrappers";
import { setLoading as setLoadingAction } from "../../__data__";

export const formsMap: {
  [key: string]: (props: any) => any;
} = {
  main: Main,
  contacts: Contacts,
  requisites: Requisites,
  priceList: PriceList,
  comments: Comments,
  tasks: Tasks,
};

const {
  clientCard: { upper, lower },
} = formConfig;

export const ClientCard = () => {
  const { activeTab: upperActiveTab, onChange: onChangeUpper } = useTabs(
    upper.tabs,
    "replace",
    "upper"
  );
  const { activeTab: lowerActiveTab, onChange: onChangeLower } = useTabs(
    lower.tabs,
    "replace",
    "lower"
  );

  const { id: clientId } = useParams<QueryProps>();
  const { values: client, update, clear } = useFormValues<ClientEntityProps>(
    FORM_NAMES.CLIENT_CARD
  );

  const mode = getClientCardMode(clientId);

  const isClientEmpty = mode === "view" && isEmpty(client);
  const url = getFullUrl(urls.clientCard.entity, clientId);

  const fetchClientCard = useCallback(async () => {
    try {
      const response = await axios.get(url);
      update(response?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    }
  }, [update, url]);

  useEffect(() => {
    if (mode === "view") {
      fetchClientCard();
    }

    return () => {
      clear();
    };
  }, []);

  if (isClientEmpty) {
    return <Loader />;
  }

  const UpperForm = formsMap[upperActiveTab?.tabCode];
  const LowerForm = formsMap[lowerActiveTab?.tabCode];

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <>
        <ClientCardHeader
          footer={
            <Tabs onChange={onChangeUpper} activeKey={upperActiveTab.tabCode}>
              {upper?.tabs?.map(({ tabCode, tabName }) => (
                <Tabs.TabPane key={tabCode} tab={tabName} />
              ))}
            </Tabs>
          }
        />
        {UpperForm && <UpperForm tab={upperActiveTab} />}
        <FormHeader
          position="lower"
          footer={
            <Tabs onChange={onChangeLower} activeKey={lowerActiveTab.tabCode}>
              {lower?.tabs?.map(({ tabCode, tabName }) => (
                <Tabs.TabPane key={tabCode} tab={tabName} />
              ))}
            </Tabs>
          }
        />
        {LowerForm && <LowerForm tab={lowerActiveTab} />}
      </>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.data?.clients,
  profileInfo: state?.data?.profileInfo,
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading: setLoadingAction }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
