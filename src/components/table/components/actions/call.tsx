import React, { useCallback, useContext } from "react";
import { Popconfirm, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";
import { callTel, getConformedValue } from "../../../../utils";
import { SearchedAllContext, SearchedColumnsContext } from "../../utils";
import { ColumnProps, RecordType } from "../../../../constants";

interface CallProps {
  phone: string;
  column?: ColumnProps;
}

export const Call: React.FC<CallProps> = ({ phone, column }) => {
  const [t] = useTranslation("table");
  const searched = useContext(SearchedAllContext);
  const searchedColumns = useContext<RecordType>(SearchedColumnsContext);
  const searchedColumnValue = searchedColumns[column?.columnCode ?? ""] ?? "";

  let searchedOptions = [searchedColumnValue, searched || ""];
  const isPhone = (val: string) => /^\+7[\d]+$/.test(val);

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
      <Typography.Link style={{ padding: 0 }}>
        <HighlightTextWrapper
          text={getConformedValue(phone)}
          searched={searchedOptions}
        />
      </Typography.Link>
    </Popconfirm>
  );
};

export default Call;
