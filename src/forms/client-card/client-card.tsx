import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ClientEntityProps, urls } from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading, setClients } from "../../__data__";
import { defaultErrorHandler, fillTemplate } from "../../utils";
import { getClientCardMode } from "./utils";
import { Tabs } from "../../components";
import { UPPER } from "../../constants/form-config/client-card";
import { TABS_MAP } from "./constants";

interface ClientCardProps {
  clients?: ClientEntityProps[];
  setLoading: (loading: boolean) => void;
  setClients: (clients: ClientEntityProps[]) => void;
}

export const ClientCard = ({ setClients, setLoading }: ClientCardProps) => {
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
      <Tabs mode={mode} tabs={UPPER.tabs} formsMap={TABS_MAP} />
      {/* <Tabs mode={mode} tabs={[]} formsMap={{}} /> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading, setClients }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ClientCard);
