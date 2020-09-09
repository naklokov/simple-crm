import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ClientEntityProps, urls } from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading, setClients } from "../../__data__";
import { getClientCardMode } from "./utils";
import { Tabs, Loader } from "../../components";
import { UPPER, LOWER } from "../../constants/form-config/client-card";
import { Main, Comments, Contacts, Requisites, PriceList } from "./tabs";
import { fillTemplate, defaultErrorHandler } from "../../utils";
import { isEmpty } from "lodash";

interface ClientCardProps {
  clients?: ClientEntityProps[];
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
};

export const ClientCard = ({
  setClients,
  setLoading,
  clients,
}: ClientCardProps) => {
  const [t] = useTranslation("clientCard");
  const { id } = useParams();
  const mode = getClientCardMode(id);

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
    if (mode === "view") {
      fetchClientCard();
    }
  }, [id]);

  return (
    <React.Fragment>
      <Tabs mainTab="main" mode={mode} tabs={UPPER.tabs} formsMap={TABS_MAP} />
      {mode === "view" && (
        <Tabs mode={mode} tabs={LOWER.tabs} formsMap={TABS_MAP} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading, setClients }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
