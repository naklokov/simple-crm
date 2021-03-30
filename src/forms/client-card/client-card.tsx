import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import {
  FORM_NAMES,
  PERMISSIONS,
  QueryProps,
  urls,
  ProfileInfoEntityProps,
  State,
  ClientEntityProps,
} from "../../constants";
import { setLoading as setLoadingAction } from "../../__data__";
import { getClientCardMode } from "./utils";
import { Tabs, Loader } from "../../components";
import { upper, lower } from "../../constants/form-config/client-card";
import {
  Main,
  Comments,
  Contacts,
  Requisites,
  PriceList,
  Tasks,
  Documents,
} from "./tabs";
import { defaultErrorHandler, getFullUrl, useFormValues } from "../../utils";
import { ClientCardHeader } from ".";
import { PagePermissionsChecker } from "../../wrappers";

interface ClientCardProps {
  profileInfo: ProfileInfoEntityProps;
  setLoading: (loading: boolean) => void;
}

export const TABS_MAP: {
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

export const ClientCard = ({ setLoading }: ClientCardProps) => {
  const { id: clientId } = useParams<QueryProps>();
  const { values: client, update, clear } = useFormValues<ClientEntityProps>(
    FORM_NAMES.CLIENT_CARD
  );

  const mode = getClientCardMode(clientId);

  const isClientEmpty = mode === "view" && isEmpty(client);
  const url = getFullUrl(urls.clientCard.entity, clientId);

  const fetchClientCard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      update(response?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "view") {
      fetchClientCard();
    }

    return () => {
      clear();
    };
  }, [clientId]);

  if (isClientEmpty) {
    return <Loader />;
  }

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <>
        <ClientCardHeader />
        <Tabs
          mainTab={upper.tabs[0].tabName}
          position="upper"
          mode={mode}
          tabs={upper.tabs}
          tabsMap={TABS_MAP}
        />
        {mode === "view" && (
          <Tabs
            position="lower"
            mode={mode}
            tabs={lower.tabs}
            tabsMap={TABS_MAP}
          />
        )}
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
