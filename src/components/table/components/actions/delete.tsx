import React, { useCallback } from "react";
import axios from "axios";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import noop from "lodash/noop";

import { defaultErrorHandler } from "../../../../utils";
import { connect } from "react-redux";
import { setTableLoading } from "../../../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { HighlightTextWrapper } from "../../../../wrappers";

interface DeleteProps {
  id: string;
  setTableLoading: (loading: boolean) => void;
  onDelete?: (id: string) => void;
  title?: string;
  href?: string;
  searched: string;
  isOwner?: boolean;
}

export const Delete = ({
  id,
  title = "",
  href,
  setTableLoading,
  onDelete = noop,
  searched,
  isOwner = true,
}: DeleteProps) => {
  const [t] = useTranslation("table");

  const fetchDelete = async () => {
    if (href) {
      try {
        setTableLoading(true);
        await axios.delete(href);
        onDelete(id);
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        setTableLoading(false);
      }
    }
  };

  const handleDelete = useCallback(() => {
    fetchDelete();
  }, [onDelete, id, href]);

  if (!isOwner) {
    return null;
  }

  return (
    <Popconfirm
      title={t("actions.delete.confirm")}
      onConfirm={handleDelete}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        <HighlightTextWrapper text={title} searched={searched} />
      </Button>
    </Popconfirm>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(null, mapDispatchToProps)(Delete);
