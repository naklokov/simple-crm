import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ClientEntityProps, urls, CLIENT_NEW_ID } from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { getClient } from "./utils";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading, setClients } from "../../__data__";
import { defaultErrorHandler, fillTemplate } from "../../utils";
import { Upper } from "./upper";
import { Lower } from "./lower";

import style from "./client-card.module.scss";

interface ClientCardProps {
  clients?: ClientEntityProps[];
  setLoading: (loading: boolean) => void;
  setClients: (clients: ClientEntityProps[]) => void;
}

export const ClientCard = ({
  clients,
  setClients,
  setLoading,
}: ClientCardProps) => {
  const [t] = useTranslation("clientCard");
  const { id } = useParams();
  const client = getClient(id, clients);

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
    if (!client && id !== CLIENT_NEW_ID) {
      fetchClientCard();
    }
  }, [id]);

  return (
    <React.Fragment>
      <Upper />
      <Lower />
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading, setClients }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
