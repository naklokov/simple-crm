import React, { useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  BREADCRUMB_ROUTES,
  ClientEntityProps,
  QueryProps,
  urls,
} from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { useHistory, useParams } from "react-router";
import { getClient } from "./utils";
import { Button, PageHeader, Popconfirm } from "antd";
import {
  callTel,
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  getItemRender,
} from "../../utils";
import { PhoneTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setLoading } from "../../__data__";

interface ClientCardHeaderProps {
  clients?: ClientEntityProps[];
}

export const ClientCardHeader = ({ clients }: ClientCardHeaderProps) => {
  const [t] = useTranslation("clientCard");
  const history = useHistory();
  const { id } = useParams<QueryProps>();

  const { shortName, phone } = getClient(id, clients);
  const title = shortName || t("title.new");

  const fetchDelete = async () => {
    setLoading(true);
    try {
      const url = getFullUrl(urls.clients.entity, id);
      await axios.delete(url);
      history.goBack();
      defaultSuccessHandler(t("message.success.delete"));
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleCall = useCallback(() => {
    if (phone) {
      callTel(phone);
    }
  }, [phone]);

  const handleDelete = useCallback(() => {
    fetchDelete();
  }, [id]);

  const extra = [
    <Popconfirm
      title={t("confirm.call")}
      onConfirm={handleCall}
      placement="left"
    >
      <Button icon={<PhoneTwoTone twoToneColor="#52c41a" />}>
        {t("button.call")}
      </Button>
    </Popconfirm>,
    <Popconfirm
      title={t("confirm.delete")}
      onConfirm={handleDelete}
      placement="left"
    >
      <Button icon={<DeleteTwoTone twoToneColor="#f5222d" />}>
        {t("button.delete")}
      </Button>
    </Popconfirm>,
  ];

  const breadcrumb = {
    routes: [
      ...BREADCRUMB_ROUTES.CLIENTS,
      { path: `/${id}`, breadcrumbName: title },
    ],
    itemRender: getItemRender,
  };

  return (
    <PageHeader
      ghost={false}
      breadcrumb={breadcrumb}
      title={title}
      extra={extra}
    />
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientCardHeader);
