import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ClientEntityProps, urls } from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading, setClients } from "../../__data__";
import { getClientCardMode, getClient } from "./utils";
import { Tabs, Loader } from "../../components";
import { UPPER, LOWER } from "../../constants/form-config/client-card";
import { Main, Comments, Contacts, Requisites, PriceList, Tasks } from "./tabs";
import { fillTemplate, defaultErrorHandler } from "../../utils";
import { isEmpty } from "lodash";

interface ClientCardProps {
  clients: ClientEntityProps[];
  loading: boolean;
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
  loading,
}: ClientCardProps) => {
  const [t] = useTranslation("clientCard");
  const { id } = useParams();
  const mode = getClientCardMode(id);
  const client = getClient(id, clients);
  console.log(client);
  const isClientEmpty = mode === "view" && isEmpty(client);

  const fetchClientCard = async () => {
    try {
      setLoading(true);
      const url = fillTemplate(urls.clientCard.entity, { id });
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
      setLoading(true);
      fetchClientCard();
    } else {
      setLoading(false);
    }
  }, [client]);

  if (isClientEmpty) {
    return <Loader />;
  }

  return (
    <div>
      <Tabs mainTab="main" mode={mode} tabs={UPPER.tabs} formsMap={TABS_MAP} />
      {mode === "view" && (
        <Tabs mode={mode} tabs={LOWER.tabs} formsMap={TABS_MAP} />
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
  loading: state?.app?.loading,
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading, setClients }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
