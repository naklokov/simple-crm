import React, { useCallback, useContext } from "react";
import { Button } from "antd";
import noop from "lodash/noop";
import { HighlightTextWrapper } from "../../../../wrappers";
import { TableActionsContext } from "../../utils";

interface ViewProps {
  id: string;
  title?: string;
}

export const View = ({ id, title = "" }: ViewProps) => {
  const { onViewRow } = useContext(TableActionsContext);
  const handleClick = useCallback(() => {
    onViewRow(id);
  }, [id, onViewRow]);

  return (
    <Button style={{ paddingLeft: 0 }} type="link" onClick={handleClick}>
      <HighlightTextWrapper text={title} />
    </Button>
  );
};

export default View;
