import React, { useCallback } from "react";
import { Button } from "antd";
import noop from "lodash/noop";
import { HighlightTextWrapper } from "../../../../wrappers";

interface DoneProps {
  id: string;
  title?: string;
  onDone?: (id: string) => void;
  searched: string;
  isOwner?: boolean;
}

export const Done = ({
  id,
  title = "",
  onDone = noop,
  searched,
  isOwner = true,
}: DoneProps) => {
  const handleClick = useCallback(() => {
    onDone(id);
  }, [id, onDone]);

  if (!isOwner) {
    return null;
  }

  return (
    <Button style={{ paddingLeft: 0 }} type="link" onClick={handleClick}>
      <HighlightTextWrapper text={title} searched={searched} />
    </Button>
  );
};

export default Done;
