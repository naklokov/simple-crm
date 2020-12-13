import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  urls,
  ClientEntityProps,
  QueryProps,
  PERMISSIONS_SET,
  ProfileInfoProps,
  State,
  TabPaneFormProps,
} from "../../../../constants";
import { Table } from "../../../../components";
import {
  defaultErrorHandler,
  getUpdatedEntityArray,
  useFetch,
  getFullUrl,
  defaultSuccessHandler,
} from "../../../../utils";
import { useParams } from "react-router";
import { setTableLoading } from "../../../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import style from "./price-list.module.scss";

interface ContactsProps extends TabPaneFormProps {
  profileInfo: ProfileInfoProps;
  clients: ClientEntityProps[];
  setTableLoading: (loading: boolean) => void;
}

export const PriceList = ({
  profileInfo: { id: userProfileId },
  tab,
  setTableLoading,
}: ContactsProps) => {
  const [t] = useTranslation("clientCardPriceList");
  const [positions, setPositions] = useState<any[]>([]);
  const { id: clientId } = useParams<QueryProps>();
  const params = {
    clientId,
    userProfileId,
  };

  const { response, loading } = useFetch({
    url: urls.priceList.entity,
    params,
  });

  useEffect(() => {
    setPositions(response?.data ?? []);
  }, [response]);

  const handleSaveRow = useCallback(
    async (values: any) => {
      const url = getFullUrl(urls.priceList.entity, values.itemId);
      setTableLoading(true);
      try {
        await axios({ url, method: "put", data: values, params });
        defaultSuccessHandler(t("message.row.save.success"));
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        setTableLoading(false);
      }

      setPositions(getUpdatedEntityArray(values, positions, "itemId"));
    },
    [positions, params, setTableLoading, t]
  );

  return (
    <Table.Client
      idValue="itemId"
      className={style.table}
      table={tab}
      loading={loading}
      dataSource={positions}
      onSaveRow={handleSaveRow}
      actionsPermissions={PERMISSIONS_SET.CLIENT_UPDATE}
      withSearch
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
