import React, { useCallback, useContext } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import { connect, useSelector } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setTableLoading } from "../../../../__data__";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";
import { State } from "../../../../constants";

interface DeleteProps {
  id: string;
  title?: string;
  hasRight?: boolean;
}

export const Delete: React.FC<DeleteProps> = ({
  id,
  title = "",
  hasRight = true,
}) => {
  const [t] = useTranslation("table");
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
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
        <HighlightTextWrapper loading={tableLoading} text={title} />
      </Button>
    </Popconfirm>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(null, mapDispatchToProps)(Delete);
