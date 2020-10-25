import React, { useCallback, useContext } from "react";
import { Button } from "antd";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";

interface DoneProps {
  id: string;
  title?: string;
  hasRight?: boolean;
}

export const Done = ({ id, title = "", hasRight = true }: DoneProps) => {
  const { onDoneRow } = useContext(TableActionsContext);
  const handleClick = useCallback(() => {
    onDoneRow(id);
  }, [id, onDoneRow]);

  if (!hasRight) {
    return null;
  }

  return (
    <Button style={{ paddingLeft: 0 }} type="link" onClick={handleClick}>
      <HighlightTextWrapper text={title} />
    </Button>
  );
};

export default Done;
