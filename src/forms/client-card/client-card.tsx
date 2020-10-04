import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ClientEntityProps,
  FORM_NAMES,
  PERMISSIONS,
  QueryProps,
  urls,
} from "../../constants";
import { connect } from "react-redux";
import { State, UpdateFormProps } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { updateForm, setLoading } from "../../__data__";
import { getClientCardMode, getClient } from "./utils";
import { Tabs, Loader } from "../../components";
import { upper, lower } from "../../constants/form-config/client-card";
import { Main, Comments, Contacts, Requisites, PriceList, Tasks } from "./tabs";
import { defaultErrorHandler, getFullUrl } from "../../utils";
import { isEmpty } from "lodash";
import { ClientCardHeader } from ".";
import { PagePermissionsChecker } from "../../wrappers";

import style from "./client-card.module.scss";

//TODO проверить пермишены
const {
  CLIENTS: { GET, GET_OWNER },
} = PERMISSIONS;

interface ClientCardProps {
  clients: ClientEntityProps[];
  client: ClientEntityProps;
  setLoading: (loading: boolean) => void;
  updateForm: ({ name, data }: UpdateFormProps) => void;
}

export const TABS_MAP: {
  [key: string]: any;
} = {
  main: Main,
  contacts: Contacts,
  requisites: Requisites,
  priceList: PriceList,
  comments: Comments,
  tasks: Tasks,
};

export const ClientCard = ({
  clients,
  client,
  setLoading,
  updateForm,
}: ClientCardProps) => {
  const { id: clientId } = useParams<QueryProps>();
  const [t] = useTranslation(FORM_NAMES.CLIENT_CARD);

  const storedClient = getClient(clientId, clients);
  const mode = getClientCardMode(clientId);

  const isClientEmpty = mode === "view" && isEmpty(client);
  const url = getFullUrl(urls.clientCard.entity, clientId);

  const fetchClientCard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      updateForm({ name: FORM_NAMES.CLIENT_CARD, data: response?.data });
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "view") {
      if (isEmpty(storedClient)) {
        fetchClientCard();
      } else {
        updateForm({ name: FORM_NAMES.CLIENT_CARD, data: storedClient });
      }
    }

    return () => {
      updateForm({ name: FORM_NAMES.CLIENT_CARD, data: {} });
    };
  }, [clients]);

  if (isClientEmpty) {
    return <Loader />;
  }

  return (
    <PagePermissionsChecker availablePermissions={[GET, GET_OWNER]}>
      <div>
        <div className={style.header}>
          <ClientCardHeader />
        </div>
        <Tabs
          mainTab={upper.tabs[0].tabName}
          position="upper"
          mode={mode}
          tabs={upper.tabs}
          formsMap={TABS_MAP}
        />
        {mode === "view" && (
          <Tabs
            position="lower"
            mode={mode}
            tabs={lower.tabs}
            formsMap={TABS_MAP}
          />
        )}
      </div>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.data?.clients,
  client: state?.app?.forms?.[FORM_NAMES.CLIENT_CARD] ?? {},
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateForm, setLoading }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
