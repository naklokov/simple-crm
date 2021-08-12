import React, { ReactNode, useCallback, useMemo } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  BREADCRUMB_ROUTES,
  ClientEntityProps,
  FORM_NAMES,
  QueryProps,
  urls,
  CLIENT_NEW_ID,
} from "../../constants";
import {
  callTel,
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  getItemRender,
  getItemLoadingRender,
  useFormValues,
} from "../../utils";
import { Call, Delete } from "./components";
import { Dot, FormHeader, Skeleton } from "../../components";
import { setFormLoading } from "../../__data__";
import { useActivity } from "../../components/table/utils";
import {
  COLUMN_COLORS_MAP,
  COLUMN_STATUS_MAP,
} from "../../components/table/constants";

interface ClientCardHeaderProps {
  footer?: ReactNode;
}

const formName = FORM_NAMES.CLIENT_CARD;

export const ClientCardHeader: React.FC<ClientCardHeaderProps> = ({
  footer,
}) => {
  const { id } = useParams<QueryProps>();
  const isNew = id === CLIENT_NEW_ID;

  const [t] = useTranslation("clientCard");
  const dispatch = useDispatch();
  const history = useHistory();

  const [{ shortName, phone, clientActivityDate }] = useFormValues<
    ClientEntityProps
  >(FORM_NAMES.CLIENT_CARD);
  const { status } = useActivity(clientActivityDate);

  const dotColor = status
    ? COLUMN_COLORS_MAP[status]
    : COLUMN_COLORS_MAP[COLUMN_STATUS_MAP.ACTIVE];

  const loading = useMemo(() => !shortName && !isNew, [shortName, isNew]);
  const filledTitle = shortName || t("title.new");
  const title = loading ? <Skeleton.Title /> : filledTitle;

  const fetchDelete = useCallback(async () => {
    dispatch(setFormLoading({ name: formName, loading: true }));
    try {
      const url = getFullUrl(urls.clients.entity, id);
      await axios.delete(url);
      history.replace(urls.clients.path);
      defaultSuccessHandler(t("message.success.delete"));
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      dispatch(setFormLoading({ name: formName, loading: false }));
    }
  }, [history, dispatch, id, t]);

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
  }, [fetchDelete]);

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
      { path: `/${id}`, breadcrumbName: filledTitle },
    ],
    itemRender: loading ? getItemLoadingRender : getItemRender,
  };

  const activity = useMemo(
    () =>
      !loading ? (
        <Dot color={dotColor} style={{ margin: "0 auto" }} />
      ) : undefined,
    [loading, dotColor]
  );

  return (
    <FormHeader
      tags={}
      subTitle={activity}
      position="upper"
      breadcrumb={breadcrumb}
      title={title}
      extra={extra}
      onBack={handleGoBack}
      footer={footer}
    />
  );
};

export default ClientCardHeader;
