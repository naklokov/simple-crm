import React, { useCallback, useContext } from "react";
import { Popconfirm, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HighlightTextWrapper } from "../../../../wrappers";
import { SearchedAllContext, SearchedColumnsContext } from "../../utils";
import { ColumnProps, RecordType, State } from "../../../../constants";

interface EmailProps {
  mail: string;
  column?: ColumnProps;
}

export const Email: React.FC<EmailProps> = ({ mail, column }) => {
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
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
      <Typography.Link style={{ padding: 0 }}>
        <HighlightTextWrapper
          loading={tableLoading}
          text={mail}
          searched={[
            searched,
            searchedColumns?.[column?.columnCode ?? ""] ?? "",
          ]}
        />
      </Typography.Link>
    </Popconfirm>
  );
};

export default Email;
