import React, { useCallback, useContext } from "react";
import { Select, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
  getRangeByStatus,
  TableActionsContext,
  useActivity,
} from "../../utils";
import { SearchFooter } from ".";
import {
  COLUMN_COLORS_MAP,
  COLUMN_STATUS_MAP,
  SearchComponentProps,
} from "../../constants";
import { Dot } from "../dot";
/**
 * Компонент поиска для поля активности
 * @param setSelectedKeys Метод таблицы для сохранения ключей поиска
 * @param column Описание полей в колонке
 * @param selectedKeys Ключи поиска в таблице
 * @param confirm Submit событие поиска
 * @param clearFilters Метод очистки поисковых ключей
 * @returns JSX.Component
 */
export const ActivitySearch: React.FC<SearchComponentProps> = ({
  setSelectedKeys,
  column,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const [searchedRange] = selectedKeys;
  const [tActivity] = useTranslation("activity");
  const [t] = useTranslation("columnSearch");
  const { onSearchColumn } = useContext(TableActionsContext);
  const { status: selectedStatus } = useActivity(searchedRange?.[0]);

  const options = Object.values(COLUMN_STATUS_MAP).map((status) => ({
    value: status,
    color: COLUMN_COLORS_MAP[status],
    title: tActivity(status),
  }));

  const handleChange = useCallback(
    (value: string) => {
      const { from, to } = getRangeByStatus(value);

      setSelectedKeys([[from, to]]);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    onSearchColumn(searchedRange, confirm, column);
  }, [onSearchColumn, confirm, column, searchedRange]);

  return (
    <div style={{ padding: 8 }}>
      <Select
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.dictionary")}
        value={selectedStatus}
        onChange={handleChange}
      >
        {options.map(({ value, title, color }) => (
          <Select.Option key={value} value={value}>
            <Space align="center">
              <Dot color={color} />
              <Typography.Text>{title}</Typography.Text>
            </Space>
          </Select.Option>
        ))}
      </Select>
      <SearchFooter
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default ActivitySearch;
