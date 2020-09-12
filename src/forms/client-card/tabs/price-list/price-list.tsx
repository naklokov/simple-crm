import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { urls, TabProps, ClientEntityProps } from "../../../../constants";
import { Table } from "../../../../components";
import {
  defaultErrorHandler,
  getUpdatedEntityArray,
  useFetch,
  getFullUrl,
  defaultSuccessHandler,
} from "../../../../utils";
import { useParams } from "react-router";
import { ProfileInfoProps, State } from "../../../../__data__/interfaces";
import { setTableLoading } from "../../../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

interface ContactsProps {
  profileInfo: ProfileInfoProps;
  clients: ClientEntityProps[];
  tab: TabProps;
}

export const PriceList = ({
  tab,
  profileInfo: { id: userProfileId },
}: ContactsProps) => {
  const [t] = useTranslation("clientCardPriceList");
  const [positions, setPositions] = useState([] as any[]);
  const { id: clientId } = useParams();
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
    [positions, params]
  );

  return (
    <Table
      columns={tab.columns}
      actions={tab.actions}
      loading={loading}
      pageCount={5}
      dataSource={positions}
      onSaveRow={handleSaveRow}
      withSearch
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
