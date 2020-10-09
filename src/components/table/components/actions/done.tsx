import React, { useCallback, useContext } from "react";
import { Button } from "antd";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";

interface DoneProps {
  id: string;
  title?: string;
  isOwner?: boolean;
}

export const Done = ({ id, title = "", isOwner = true }: DoneProps) => {
  const { onDoneRow } = useContext(TableActionsContext);
  const handleClick = useCallback(() => {
    onDoneRow(id);
  }, [id, onDoneRow]);

  if (!isOwner) {
    return null;
  }

  return (
    <Button style={{ paddingLeft: 0 }} type="link" onClick={handleClick}>
      <HighlightTextWrapper text={title} searched="" />
    </Button>
  );
};

export default Done;
