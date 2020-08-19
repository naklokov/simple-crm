import React, { useCallback } from "react";
import axios from "axios";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import noop from "lodash/noop";

import { defaultErrorHandler } from "../../../../utils";
import { connect } from "react-redux";
import { setTableLoading as setTableLoadingAction } from "../../../../__data__";
import { Dispatch } from "@reduxjs/toolkit";
import { getHref } from "../../utils";

interface DeleteProps {
  title?: string;
  href?: string;
  id?: string;
  setTableLoading: (loading: boolean) => void;
}

export const Delete = ({ title, href, setTableLoading }: DeleteProps) => {
  const [t] = useTranslation("table");

  const fetchDelete = async () => {
    if (href) {
      try {
        setTableLoading(true);
        await axios.delete(href);
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        setTableLoading(false);
      }
    }
  };

  const handleDelete = useCallback(() => {
    fetchDelete();
  }, [href]);

  return (
    <Popconfirm
      title={t("actions.delete.confirm")}
      onConfirm={handleDelete}
      okText={t("actions.delete.yes")}
      cancelText={t("actions.delete.no")}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        {title}
      </Button>
    </Popconfirm>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTableLoading: (loading: boolean) => {
    dispatch(setTableLoadingAction(loading));
  },
});

export default connect(null, mapDispatchToProps)(Delete);
