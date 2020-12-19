import React, { useCallback, useContext } from "react";
import { Button, Space } from "antd";
import { WithTranslation, withTranslation } from "react-i18next";
import { SearchOutlined } from "@ant-design/icons";
import { TableActionsContext } from "../../utils";
import { ColumnProps } from "../../../../constants";

interface FooterProps extends WithTranslation {
  column: ColumnProps;
  clearFilters: any;
  onSearch: () => void;
}

export const Footer = ({ column, clearFilters, t, onSearch }: FooterProps) => {
  const { onResetFilter } = useContext(TableActionsContext);
  const handleResetFilter = useCallback(() => {
    onResetFilter(column, clearFilters);
  }, [column, clearFilters]);

  return (
    <Space>
      <Button
        type="primary"
        onClick={onSearch}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        {t("search")}
      </Button>
      <Button onClick={handleResetFilter} size="small" style={{ width: 90 }}>
        {t("reset")}
      </Button>
    </Space>
  );
};

export default withTranslation(["columnSearch"])(Footer);
