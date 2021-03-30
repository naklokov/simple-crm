import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  urls,
  ClientEntityProps,
  QueryProps,
  ProfileInfoEntityProps,
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
import { setTableLoading as setTableLoadingAction } from "../../../../__data__";

interface ContactsProps extends TabPaneFormProps {
  profileInfo: ProfileInfoEntityProps;
  clients: ClientEntityProps[];
  setTableLoading: (loading: boolean) => void;
}

export const PriceList: React.FC<ContactsProps> = ({
  profileInfo: { id: userProfileId },
  tab,
  setTableLoading,
}) => {
  const [t] = useTranslation("clientCardPriceList");
  const [positions, setPositions] = useState<any[]>([]);
  const { id: clientId } = useParams<QueryProps>();
  const params = useMemo(
    () => ({
      clientId,
      userProfileId,
    }),
    [clientId, userProfileId]
  );

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
    <form>
      <Table.Client
        idValue="itemId"
        table={tab}
        loading={loading}
        dataSource={positions}
        onSaveRow={handleSaveRow}
        withSearch
      />
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading: setTableLoadingAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
