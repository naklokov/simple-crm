import { Input } from "antd";
import React, { useCallback, useContext } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { SearchFooter } from ".";

import { ColumnProps } from "../../../../constants";
import { TableActionsContext } from "../../utils";

interface TextSearchProps extends WithTranslation {
  column: ColumnProps;
  setRef: (ref: any) => void;
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
}

export const TextSearch = ({
  t,
  setSelectedKeys,
  column,
  setRef,
  selectedKeys,
  confirm,
  clearFilters,
}: TextSearchProps) => {
  const { onSearchColumn } = useContext(TableActionsContext);
  const [searched] = selectedKeys;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSelectedKeys(value ? [value] : []);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    const trimmed = searched.trim();
    onSearchColumn(trimmed, confirm, column);
  }, [selectedKeys, confirm, column]);

  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={setRef}
        placeholder={t("placeholder.text")}
        value={searched}
        onChange={handleChange}
        onPressEnter={handleSearch}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <SearchFooter
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default withTranslation(["columnSearch"])(TextSearch);
