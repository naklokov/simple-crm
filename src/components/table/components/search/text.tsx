import { Input } from "antd";
import React from "react";
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
}: TextSearchProps) => (
  <TableActionsContext.Consumer>
    {({ onSearchColumn }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={setRef}
          placeholder={t("placeholder.text")}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => onSearchColumn(selectedKeys, confirm, column)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <SearchFooter
          column={column}
          confirm={confirm}
          selectedKeys={selectedKeys}
          clearFilters={clearFilters}
        />
      </div>
    )}
  </TableActionsContext.Consumer>
);

export default withTranslation(["columnSearch"])(TextSearch);
