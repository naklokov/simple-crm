import React, { useCallback, useContext } from "react";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { SearchOutlined } from "@ant-design/icons";
import { TableActionsContext } from "../../utils";
import { ColumnProps } from "../../../../constants";

interface FooterProps {
  column: ColumnProps;
  clearFilters: () => void;
  onSearch: () => void;
}

/**
 * Общий компонент подвала для всех полей поиска
 * @param column Описание полей в колонке
 * @param clearFilters Метод очистки поисковых ключей
 * @param onSearch Метод для проброса значений поиска
 * @returns JSX.Component
 */
export const Footer: React.FC<FooterProps> = ({
  column,
  clearFilters,
  onSearch,
}) => {
  const [t] = useTranslation("columnSearch");
  const { onResetFilter } = useContext(TableActionsContext);

  const handleResetFilter = useCallback(() => {
    onResetFilter(column, clearFilters);
  }, [column, clearFilters, onResetFilter]);

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

export default Footer;
