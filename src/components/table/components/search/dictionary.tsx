import React, { useCallback } from "react";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { SearchFooter } from ".";
import { WithTranslation, withTranslation } from "react-i18next";
import { ColumnProps } from "../../../../constants";
import { TableActionsContext } from "../../utils";
import { flow } from "lodash";
import { connect } from "react-redux";
import { State } from "../../../../__data__/interfaces";

interface DictionarySearchProps extends WithTranslation {
  column: ColumnProps;
  setSelectedKeys: any;
  setRef: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
  dictionaries: any;
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
  const options = dictionaries?.[column.columnCode] ?? [];
  return (
    <div style={{ padding: 8 }}>
      <Select
        showSearch
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.dictionary")}
        optionFilterProp="children"
        value={selectedKeys[0]}
        onChange={(value) => {
          setSelectedKeys([value]);
        }}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((o: any) => {
          const value = o?.[column?.valueField ?? ""];
          const title = o?.[column?.titleField ?? ""];
          return (
            <Select.Option key={value} value={value}>
              {title}
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
