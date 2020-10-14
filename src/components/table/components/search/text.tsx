import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

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
    {({ onSearchColumn, onResetFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={setRef}
          placeholder={t("placeholder")}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => onSearchColumn(confirm, column)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => onSearchColumn(confirm, column)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {t("search")}
          </Button>
          <Button
            onClick={() => onResetFilters(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t("reset")}
          </Button>
        </Space>
      </div>
    )}
  </TableActionsContext.Consumer>
);

export default withTranslation(["columnSearch"])(TextSearch);
