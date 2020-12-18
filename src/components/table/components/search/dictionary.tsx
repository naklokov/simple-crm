import React, { useCallback, useContext } from "react";
import { Select } from "antd";
import { SearchFooter } from ".";
import { WithTranslation, withTranslation } from "react-i18next";
import { ColumnProps, State, DictionaryProps } from "../../../../constants";
import { flow } from "lodash";
import { connect } from "react-redux";
import { TableActionsContext } from "../../utils";

interface DictionarySearchProps extends WithTranslation {
  column: ColumnProps;
  setSelectedKeys: any;
  setRef: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
  dictionaries: { [key: string]: DictionaryProps };
}

export const DictionarySearch = ({
  t,
  setSelectedKeys,
  column,
  setRef,
  selectedKeys,
  confirm,
  clearFilters,
  dictionaries,
}: DictionarySearchProps) => {
  const { onSearchColumn } = useContext(TableActionsContext);
  const [searched] = selectedKeys;

  const handleChange = useCallback(
    (value: string) => {
      setSelectedKeys([value]);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    onSearchColumn(searched, confirm, column);
  }, [selectedKeys, confirm, column]);

  const options =
    dictionaries?.[column.columnCode]?.dictionaryValueEntities ?? [];

  return (
    <div style={{ padding: 8 }}>
      <Select
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.dictionary")}
        value={selectedKeys[0]}
        onChange={handleChange}
      >
        {options.map(({ value, valueCode }) => {
          return (
            <Select.Option key={valueCode} value={valueCode}>
              {value}
            </Select.Option>
          );
        })}
      </Select>
      <SearchFooter
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  dictionaries: state?.data?.dictionaries,
});

export default flow([
  connect(mapStateToProps),
  withTranslation(["columnSearch"]),
])(DictionarySearch);
