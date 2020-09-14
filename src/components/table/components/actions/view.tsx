import React, { useCallback } from "react";
import { Button } from "antd";
import noop from "lodash/noop";
import { HighlightTextWrapper } from "../../../../wrappers";

interface ViewProps {
  id: string;
  title?: string;
  onView?: (id: string) => void;
  searched: string;
}

export const View = ({
  id,
  title = "",
  onView = noop,
  searched,
}: ViewProps) => {
  const handleClick = useCallback(() => {
    onView(id);
  }, [id]);

  return (
    <Button style={{ paddingLeft: 0 }} type="link" onClick={handleClick}>
      <HighlightTextWrapper text={title} searched={searched} />
    </Button>
  );
};

export default View;
