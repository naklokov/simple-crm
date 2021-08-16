import React, { useCallback, useContext } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { SearchFooter } from ".";
import { TableActionsContext } from "../../utils";
import { SearchComponentProps } from "../../constants";
import {
  getConcatenationQueryRsql,
  getInitialParams,
  useFetch,
} from "../../../../utils";

interface EntitySearchProps extends SearchComponentProps {
  dictionaries: any;
}

/**
 * Компонент поиска для поля сущности
 * @param setSelectedKeys Метод таблицы для сохранения ключей поиска
 * @param column Описание полей в колонке
 * @param selectedKeys Ключи поиска в таблице
 * @param confirm Submit событие поиска
 * @param clearFilters Метод очистки поисковых ключей
 * @param dictionaries Объект всех справочников в системе
 * @returns JSX.Component
 */
export const EntitySearch: React.FC<EntitySearchProps> = ({
  setSelectedKeys,
  column,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const { onSearchColumn } = useContext(TableActionsContext);
  const [t] = useTranslation("columnSearch");
  const [searched] = selectedKeys;
  const [url, initialSearch] = column?._links?.self?.href?.split("?") ?? [];
  const { initialQueries, initialSearchParams } = getInitialParams(
    initialSearch
  );

  const [entities, loading] = useFetch<any>({
    url,
    params: {
      query: getConcatenationQueryRsql("", initialQueries),
      ...initialSearchParams,
    },
    cache: true,
  });

  const handleChange = useCallback(
    (value: string) => {
      setSelectedKeys([value]);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    onSearchColumn(searched, confirm, column);
  }, [searched, confirm, column, onSearchColumn]);

  return (
    <div style={{ padding: 8 }}>
      <Select
        showSearch
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.entity")}
        optionFilterProp="children"
        value={selectedKeys[0]}
        loading={loading}
        onChange={handleChange}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {entities.map((o: any) => {
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
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default EntitySearch;
