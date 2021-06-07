import React, { useCallback, useContext } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { SearchFooter } from ".";

import { ColumnProps, PHONE_PLACEHOLDER } from "../../../../constants";
import { getNormalizePhone, handlePressEnter } from "../../../../utils";
import { PhoneInput } from "../../../phone-input";
import { TableActionsContext } from "../../utils";

interface PhoneSearchProps extends WithTranslation {
  column: ColumnProps;
  setRef: (ref: any) => void;
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
}

export const PhoneSearch = ({
  setSelectedKeys,
  column,
  setRef,
  selectedKeys,
  confirm,
  clearFilters,
}: PhoneSearchProps) => {
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
    const normalizePhone = getNormalizePhone(searched);
    onSearchColumn(normalizePhone, confirm, column);
  }, [confirm, column, searched, onSearchColumn]);

  const handleKeyDown = useCallback(
    (e) => {
      handlePressEnter(e, handleSearch);
    },
    [handleSearch]
  );

  return (
    <div style={{ padding: 8 }}>
      <PhoneInput
        style={{ width: 188, marginBottom: 8, display: "block" }}
        value={searched}
        onKeyDown={handleKeyDown}
        // ref={setRef}
        onChange={handleChange}
        placeholder={PHONE_PLACEHOLDER}
      />

      <SearchFooter
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default withTranslation(["columnSearch"])(PhoneSearch);
