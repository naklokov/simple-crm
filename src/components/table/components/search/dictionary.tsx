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
    <TableActionsContext.Consumer>
      {({ onSearchColumn }) => (
        <div>
          <Select
            ref={setRef}
            showSearch
            style={{ width: 200 }}
            placeholder={t("placeholder.dictionary")}
            optionFilterProp="children"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={(confirm) => onSearchColumn(confirm, column)}
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map((o: any) => (
              <Option value={o.value}>{o.title}</Option>
            ))}
          </Select>
          <SearchFooter
            selectedKeys={selectedKeys}
            column={column}
            confirm={confirm}
            clearFilters={clearFilters}
          />
        </div>
      )}
    </TableActionsContext.Consumer>
  );
};

const mapStateToProps = (state: State) => ({
  dictionaries: state?.data?.dictionaries,
});

export default flow([
  connect(mapStateToProps),
  withTranslation(["columnSearch"]),
])(DictionarySearch);
