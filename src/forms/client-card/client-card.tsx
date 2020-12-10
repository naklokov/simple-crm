import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  FORM_NAMES,
  PERMISSIONS,
  QueryProps,
  urls,
  ProfileInfoProps,
  State,
} from "../../constants";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading } from "../../__data__";
import { getClientCardMode } from "./utils";
import { Tabs, Loader } from "../../components";
import { upper, lower } from "../../constants/form-config/client-card";
import { Main, Comments, Contacts, Requisites, PriceList, Tasks } from "./tabs";
import { defaultErrorHandler, getFullUrl, useFormValues } from "../../utils";
import { isEmpty } from "lodash";
import { ClientCardHeader } from ".";
import { PagePermissionsChecker } from "../../wrappers";

interface ClientCardProps {
  profileInfo: ProfileInfoProps;
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
};

export const ClientCard = ({ setLoading }: ClientCardProps) => {
  const { id: clientId } = useParams<QueryProps>();
  const [t] = useTranslation(FORM_NAMES.CLIENT_CARD);
  const { values: client, update, clear } = useFormValues(
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
  }, []);

  if (isClientEmpty) {
    return <Loader />;
  }

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.CLIENTS["GET.ALL"]]}
    >
      <React.Fragment>
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
      </React.Fragment>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.data?.clients,
  profileInfo: state?.data?.profileInfo,
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
