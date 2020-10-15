import React, { useCallback, useContext } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";
import { SearchedContext } from "../../utils";

interface EmailProps {
  mail: string;
}

export const Email = ({ mail }: EmailProps) => {
  const [t] = useTranslation("table");
  const searched = useContext(SearchedContext);

  const handleCall = useCallback(() => {
    window.location.assign(`mailto:${mail}`);
  }, [mail]);

  return (
    <Popconfirm
      title={t("actions.email.confirm")}
      onConfirm={handleCall}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        <HighlightTextWrapper text={mail} searched={[searched]} />
      </Button>
    </Popconfirm>
  );
};

export default Email;
