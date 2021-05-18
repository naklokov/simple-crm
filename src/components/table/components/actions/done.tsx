import React, { useCallback, useContext } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";
import { State } from "../../../../constants";

interface DoneProps {
  id: string;
  title?: string;
  hasRight?: boolean;
}

export const Done: React.FC<DoneProps> = ({
  id,
  title = "",
  hasRight = true,
}) => {
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const { onDoneRow } = useContext(TableActionsContext);
  const handleClick = useCallback(() => {
    onDoneRow(id);
  }, [id, onDoneRow]);

  if (!hasRight) {
    return null;
  }

  return (
    <Typography.Link style={{ marginRight: 8 }} onClick={handleClick}>
      <HighlightTextWrapper text={title} loading={tableLoading} />
    </Typography.Link>
  );
};

export default Done;
