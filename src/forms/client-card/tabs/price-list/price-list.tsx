import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { urls, TabProps, ClientEntityProps } from "../../../../constants";
import { Table } from "../../../../components";
import {
  fillTemplate,
  defaultErrorHandler,
  getUpdatedEntityArray,
} from "../../../../utils";
import { useParams } from "react-router";
import { ProfileInfoProps, State } from "../../../../__data__/interfaces";
import { getClient, editPriceRow } from "../../utils";
import { connect } from "react-redux";

interface ContactsProps {
  profileInfo: ProfileInfoProps;
  clients: ClientEntityProps[];
  tab: TabProps;
}

export const PriceList = ({ tab, clients, profileInfo }: ContactsProps) => {
  const [tableLoading, setTableLoading] = useState(false);

  const [positions, setPositions] = useState([] as any[]);
  const [t] = useTranslation("clientCardPriceList");
  const { id } = useParams();
  const client = getClient(id, clients);

  const fetchDataSource = async () => {
    try {
      setTableLoading(true);
      const url = fillTemplate(urls.priceList.clientPrice, {
        clientId: client.id,
        userProfileId: profileInfo?.id ?? "",
      });
      const response = await axios.get(url);
      setPositions(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSource();
  }, [id]);

  const handleSaveRow = useCallback(
    async (values) => {
      try {
        setTableLoading(true);
        await editPriceRow(values, client, profileInfo);
        const source = getUpdatedEntityArray(values, positions, "itemId");
        setPositions(source);
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.row.save.error"),
        });
      } finally {
        setTableLoading(false);
      }
    },
    [positions]
  );

  return (
    <Table
      columns={tab.columns}
      actions={tab.actions}
      loading={tableLoading}
      pageCount={5}
      dataSource={positions}
      onSaveRow={handleSaveRow}
      withSearch
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
  clients: state?.clients ?? [],
});

export default connect(mapStateToProps)(PriceList);
