import React, { useCallback, useContext } from "react";
import { Popconfirm, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HighlightTextWrapper } from "../../../../wrappers";
import { callTel, getConformedValue, isPhone } from "../../../../utils";
import { SearchedAllContext, SearchedColumnsContext } from "../../utils";
import { ColumnProps, RecordType, State } from "../../../../constants";

interface CallProps {
  phone: string;
  column?: ColumnProps;
}

export const Call: React.FC<CallProps> = ({ phone, column }) => {
  const tableLoading = useSelector((state: State) => state?.app?.tableLoading);
  const [t] = useTranslation("table");
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const searchedColumnValue = searchedColumns[column?.columnCode ?? ""] ?? "";

  let searchedOptions = [searchedColumnValue, searched || ""];

  if (isPhone(searched)) {
    searchedOptions = [...searchedOptions, getConformedValue(searched)];
  }

  if (isPhone(searchedColumnValue)) {
    searchedOptions = [
      ...searchedOptions,
      getConformedValue(searchedColumnValue),
    ];
  }

  const handleCall = useCallback(() => {
    callTel(phone);
  }, [phone]);

  return (
    <Popconfirm
      title={t("actions.call.confirm")}
      onConfirm={handleCall}
      placement="left"
    >
      <Typography.Link style={{ marginRight: 8 }}>
        <HighlightTextWrapper
          loading={tableLoading}
          text={getConformedValue(phone)}
          searched={searchedOptions}
        />
      </Typography.Link>
    </Popconfirm>
  );
};

export default Call;
