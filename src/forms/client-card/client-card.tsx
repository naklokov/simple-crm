import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ClientEntityProps, QueryProps, urls } from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading, setClients } from "../../__data__";
import { getClientCardMode, getClient } from "./utils";
import { Tabs, Loader } from "../../components";
import { upper, lower } from "../../constants/form-config/client-card";
import { Main, Comments, Contacts, Requisites, PriceList, Tasks } from "./tabs";
import { defaultErrorHandler, getFullUrl } from "../../utils";
import { isEmpty } from "lodash";
import { ClientCardHeader } from ".";

import style from "./client-card.module.scss";

interface ClientCardProps {
  clients: ClientEntityProps[];
  setLoading: (loading: boolean) => void;
  setClients: (clients: ClientEntityProps[]) => void;
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
  setClients,
  setLoading,
}: ClientCardProps) => {
  const [t] = useTranslation("clientCard");
  const { id: clientId } = useParams<QueryProps>();
  const mode = getClientCardMode(clientId);
  const client = getClient(clientId, clients);

  const isClientEmpty = mode === "view" && isEmpty(client);
  const url = getFullUrl(urls.clientCard.entity, clientId);

  const fetchClientCard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setClients([response?.data] ?? []);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClientEmpty) {
      fetchClientCard();
    }
  }, [clients]);

  if (isClientEmpty) {
    return <Loader />;
  }

  return (
    <div>
      <div className={style.header}>
        <ClientCardHeader />
      </div>
      <Tabs mainTab="main" mode={mode} tabs={upper.tabs} formsMap={TABS_MAP} />
      {mode === "view" && (
        <Tabs mode={mode} tabs={lower.tabs} formsMap={TABS_MAP} />
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading, setClients }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
