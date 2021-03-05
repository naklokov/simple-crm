import React, { useCallback, useContext } from "react";
import axios from "axios";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import { defaultErrorHandler } from "../../../../utils";
import { connect } from "react-redux";
import { setTableLoading } from "../../../../__data__";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";

interface DeleteProps {
  id: string;
  title?: string;
  hasRight?: boolean;
}

export const Delete = ({ id, title = "", hasRight = true }: DeleteProps) => {
  const [t] = useTranslation("table");
  const { onDeleteRow } = useContext(TableActionsContext);
  const handleClick = useCallback(() => {
    onDeleteRow(id);
  }, [id, onDeleteRow]);

  if (!hasRight) {
    return null;
  }

  return (
    <Popconfirm
      title={t("actions.delete.confirm")}
      onConfirm={handleClick}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        <HighlightTextWrapper text={title} />
      </Button>
    </Popconfirm>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(null, mapDispatchToProps)(Delete);
