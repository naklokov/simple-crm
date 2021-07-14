import React, { ReactNode, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import {
  BREADCRUMB_ROUTES,
  ClientEntityProps,
  FORM_NAMES,
  QueryProps,
  urls,
  State,
  CLIENT_NEW_ID,
} from "../../constants";
import {
  callTel,
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  getItemRender,
} from "../../utils";
import { setLoading } from "../../__data__";
import { Call, Delete } from "./components";
import { FormHeader } from "../../components";

interface ClientCardHeaderProps {
  client: ClientEntityProps;
  footer?: ReactNode;
}

export const ClientCardHeader: React.FC<ClientCardHeaderProps> = ({
  client,
  footer,
}) => {
  const [t] = useTranslation("clientCard");
  const history = useHistory();
  const { id } = useParams<QueryProps>();
  const isNew = id === CLIENT_NEW_ID;

  const { shortName, phone } = client;
  const title = shortName || t("title.new");

  const fetchDelete = async () => {
    setLoading(true);
    try {
      const url = getFullUrl(urls.clients.entity, id);
      await axios.delete(url);
      history.replace(urls.clients.path);
      defaultSuccessHandler(t("message.success.delete"));
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const handleCall = useCallback(() => {
    if (phone) {
      callTel(phone);
    }
  }, [phone]);

  const handleDelete = useCallback(() => {
    fetchDelete();
  }, [id]);

  let extra: ReactNode[] = [];

  if (phone && !isNew) {
    extra = [...extra, <Call key="call" onClick={handleCall} />];
  }

  if (id && !isNew) {
    extra = [...extra, <Delete key="delete" onClick={handleDelete} />];
  }

  const breadcrumb = {
    routes: [
      ...BREADCRUMB_ROUTES.CLIENTS,
      { path: `/${id}`, breadcrumbName: title },
    ],
    itemRender: getItemRender,
  };

  return (
    <FormHeader
      position="upper"
      breadcrumb={breadcrumb}
      title={title}
      extra={extra}
      onBack={handleGoBack}
      footer={footer}
    />
  );
};

const mapStateToProps = (state: State) => ({
  client: state?.app?.forms?.[FORM_NAMES.CLIENT_CARD] ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientCardHeader);
