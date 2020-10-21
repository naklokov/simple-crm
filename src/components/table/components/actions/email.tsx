import React, { useCallback, useContext } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";
import { SearchedAllContext, SearchedColumnsContext } from "../../utils";
import { ColumnProps, RecordType } from "../../../../constants";

interface EmailProps {
  mail: string;
  column?: ColumnProps;
}

export const Email = ({ mail, column }: EmailProps) => {
  const [t] = useTranslation("table");
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);

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
        <HighlightTextWrapper
          text={mail}
          searched={[
            searched,
            searchedColumns?.[column?.columnCode ?? ""] ?? "",
          ]}
        />
      </Button>
    </Popconfirm>
  );
};

export default Email;
