import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  urls,
  TabProps,
  ClientEntityProps,
  QueryProps,
  PERMISSIONS_SET,
  ProfileInfoProps,
  State,
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
import { getFilteredDataSource } from "../../../../components/table/utils";

interface ContactsProps {
  profileInfo: ProfileInfoProps;
  clients: ClientEntityProps[];
  tab: TabProps;
  setTableLoading: (loading: boolean) => void;
}

export const PriceList = ({
  tab,
  profileInfo: { id: userProfileId },
  setTableLoading,
}: ContactsProps) => {
  const [t] = useTranslation("clientCardPriceList");
  const [searchedAll, setSearchedAll] = useState("");
  const [filteredPositions, setFilteredPositions] = useState<any[]>([]);
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

  const handleSearch = useCallback(
    (searched: string) => {
      setSearchedAll(searched);
      if (searched) {
        const filtered = getFilteredDataSource(
          searched,
          positions,
          tab.columns,
          "itemId"
        );
        setFilteredPositions(filtered);
      } else {
        setFilteredPositions([]);
      }
    },
    [filteredPositions, positions]
  );

  const handleResetAllFilters = useCallback(() => {
    setSearchedAll("");
  }, []);

  return (
    <Table
      onSearch={handleSearch}
      columns={tab.columns}
      actions={tab.actions}
      loading={loading}
      pagination={{ pageSize: 5 }}
      dataSource={searchedAll ? filteredPositions : positions}
      onSaveRow={handleSaveRow}
      permissions={PERMISSIONS_SET.CLIENT_UPDATE}
      searchAll={searchedAll}
      onResetAllFilters={handleResetAllFilters}
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
