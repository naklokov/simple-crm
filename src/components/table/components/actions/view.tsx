import React, { useCallback, useContext } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";
import { State } from "../../../../constants";

interface ViewProps {
  id: string;
  title?: string;
}

export const View: React.FC<ViewProps> = ({ id, title = "" }) => {
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const { onViewRow } = useContext(TableActionsContext);
  const handleClick = useCallback(() => {
    onViewRow(id);
  }, [id, onViewRow]);

  return (
    <Typography.Link style={{ marginRight: 8 }} onClick={handleClick}>
      <HighlightTextWrapper text={title} loading={tableLoading} />
    </Typography.Link>
  );
};

export default View;
