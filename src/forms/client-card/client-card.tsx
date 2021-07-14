import React, { useCallback, useEffect, useMemo } from "react";
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
  CLIENT_NEW_ID,
} from "../../constants";
import { FormHeader, Loader } from "../../components";
import {
  Main,
  Comments,
  Contacts,
  Requisites,
  PriceList,
  Tasks,
  Documents,
} from "./tabs";
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
  documents: Documents,
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

  const isAdd = useMemo(() => clientId === CLIENT_NEW_ID, [clientId]);

  const isClientEmpty = !isAdd && isEmpty(client);
  const url = getFullUrl(urls.clientCard.entity, clientId);

  const isTabDisabled = useMemo(
    () => (tabCode: string) => tabCode !== upper?.tabs?.[0]?.tabCode && isAdd,
    [isAdd]
  );

  const fetchClientCard = useCallback(async () => {
    try {
      const response = await axios.get(url);
      update(response?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    }
  }, [update, url]);

  useEffect(() => {
    if (!isAdd) {
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
                <Tabs.TabPane
                  key={tabCode}
                  tab={tabName}
                  disabled={isTabDisabled(tabCode)}
                />
              ))}
            </Tabs>
          }
        />
        {UpperForm && <UpperForm tab={upperActiveTab} />}
        {!isAdd && (
          <>
            <FormHeader
              position="lower"
              footer={
                <Tabs
                  onChange={onChangeLower}
                  activeKey={lowerActiveTab.tabCode}
                >
                  {lower?.tabs?.map(({ tabCode, tabName }) => (
                    <Tabs.TabPane key={tabCode} tab={tabName} />
                  ))}
                </Tabs>
              }
            />
            {LowerForm && <LowerForm tab={lowerActiveTab} />}
          </>
        )}
      </>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading: setLoadingAction }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
