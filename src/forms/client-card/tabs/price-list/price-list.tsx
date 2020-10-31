import React, { useState, useEffect, useCallback } from "react";
import {
  urls,
  QueryProps,
  PERMISSIONS_SET,
  ProfileInfoProps,
  State,
  formConfig,
  TableProps,
} from "../../../../constants";
import { Table } from "../../../../components";
import { useParams } from "react-router";
import { connect } from "react-redux";

interface ContactsProps {
  profileInfo: ProfileInfoProps;
}

export const PriceList = ({
  profileInfo: { id: userProfileId },
}: ContactsProps) => {
  const url = urls.priceList.entity;
  const table =
    formConfig.clientCard.upper.tabs.find((o) => o.tabCode === "priceList") ||
    ({} as TableProps);
  const { id: clientId } = useParams<QueryProps>();
  const params = {
    clientId,
    userProfileId,
  };

  return (
    <Table.Client
      table={table as TableProps}
      url={url}
      idValue="itemId"
      fetchParams={params}
      actionsPermissions={PERMISSIONS_SET.CLIENT_UPDATE}
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(PriceList);
