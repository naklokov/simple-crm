import React, { useCallback, useContext } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { DictionaryProps } from "../../../../constants";
import { SearchFooter } from ".";
import { TableActionsContext } from "../../utils";
import { SearchComponentProps } from "../../constants";
import { useFetch } from "../../../../utils";

interface DictionarySearchProps extends SearchComponentProps {
  dictionaries: { [key: string]: DictionaryProps };
}

/**
 * Компонент поиска для поля справочника
 * @param setSelectedKeys Метод таблицы для сохранения ключей поиска
 * @param column Описание полей в колонке
 * @param selectedKeys Ключи поиска в таблице
 * @param confirm Submit событие поиска
 * @param clearFilters Метод очистки поисковых ключей
 * @param dictionaries Объект всех справочников в системе
 * @returns JSX.Component
 */
export const DictionarySearch: React.FC<DictionarySearchProps> = ({
  setSelectedKeys,
  column,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const { onSearchColumn } = useContext(TableActionsContext);
  const [t] = useTranslation("columnSearch");
  const [searched] = selectedKeys;

  const handleChange = useCallback(
    (value: string) => {
      setSelectedKeys([value]);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    onSearchColumn(searched, confirm, column);
  }, [onSearchColumn, searched, confirm, column]);

  const [{ values: options }, loading] = useFetch<DictionaryProps>({
    url: column?._links?.self?.href ?? "",
    initial: {},
    cache: true,
  });

  return (
    <div style={{ padding: 8 }}>
      <Select
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.dictionary")}
        value={selectedKeys[0]}
        onChange={handleChange}
        loading={loading}
      >
        {options?.map(({ value, valueCode }) => (
          <Select.Option key={valueCode} value={valueCode}>
            {value}
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

export default DictionarySearch;
