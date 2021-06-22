import React, { useEffect, useCallback, useMemo } from "react";
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
  PositionsEntityProps,
} from "../../../../constants";
import { Table } from "../../../../components";
import {
  defaultErrorHandler,
  useFetch,
  getFullUrl,
  defaultSuccessHandler,
} from "../../../../utils";
import { setTableLoading as setTableLoadingAction } from "../../../../__data__";
import { FormWrapper } from "../../../../wrappers";

interface ContactsProps extends TabPaneFormProps {
  profileInfo: ProfileInfoEntityProps;
  clients: ClientEntityProps[];
  setTableLoading: (loading: boolean) => void;
}

export const PriceList: React.FC<ContactsProps> = ({
  profileInfo: { id: userProfileId },
  tab,
  formName,
  setTableLoading,
}) => {
  const [t] = useTranslation("clientCardPriceList");
  const { id: clientId } = useParams<QueryProps>();
  const params = useMemo(
    () => ({
      clientId,
      userProfileId,
    }),
    [clientId, userProfileId]
  );

  const [positions, loading, reload] = useFetch<PositionsEntityProps[]>({
    url: urls.priceList.entity,
    params,
  });

  useEffect(() => {
    setTableLoading(loading);
  }, [loading, setTableLoading]);

  const handleSaveRow = useCallback(
    async (values: PositionsEntityProps) => {
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

      reload();
    },
    [reload, params, setTableLoading, t]
  );

  return (
    <FormWrapper name={formName}>
      <Table.Client
        idValue="itemId"
        columns={tab?.columns}
        actions={tab?.actions}
        links={tab?._links}
        dataSource={positions}
        onSaveRow={handleSaveRow}
        withSearch
      />
    </FormWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading: setTableLoadingAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
