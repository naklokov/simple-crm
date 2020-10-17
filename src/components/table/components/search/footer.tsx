import React from "react";
import { Button, Space } from "antd";
import { WithTranslation, withTranslation } from "react-i18next";
import { SearchOutlined } from "@ant-design/icons";
import { TableActionsContext } from "../../utils";
import { ColumnProps } from "../../../../constants";

interface FooterProps extends WithTranslation {
  column: ColumnProps;
  selectedKeys: any;
  confirm: any;
  clearFilters: any;
}

export const Footer = ({
  column,
  selectedKeys,
  clearFilters,
  confirm,
  t,
}: FooterProps) => {
  return (
    <TableActionsContext.Consumer>
      {({ onSearchColumn, onResetFilters }) => (
        <Space>
          <Button
            type="primary"
            onClick={() => onSearchColumn(selectedKeys, confirm, column)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {t("search")}
          </Button>
          <Button
            onClick={() => onResetFilters(column, clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t("reset")}
          </Button>
        </Space>
      )}
    </TableActionsContext.Consumer>
  );
};

export default withTranslation(["columnSearch"])(Footer);
