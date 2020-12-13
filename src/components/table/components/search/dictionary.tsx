import React from "react";
import { Select } from "antd";
import { SearchFooter } from ".";
import { WithTranslation, withTranslation } from "react-i18next";
import { ColumnProps, State, DictionaryProps } from "../../../../constants";
import { flow } from "lodash";
import { connect } from "react-redux";

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
  const options =
    dictionaries?.[column.columnCode]?.dictionaryValueEntities ?? [];
  return (
    <div style={{ padding: 8 }}>
      <Select
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.dictionary")}
        value={selectedKeys[0]}
        onChange={(value) => {
          setSelectedKeys([value]);
        }}
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
        selectedKeys={selectedKeys}
        column={column}
        confirm={confirm}
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
