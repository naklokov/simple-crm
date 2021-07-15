import { Input } from "antd";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SearchFooter } from ".";

import { SearchComponentProps } from "../../constants";
import { TableActionsContext } from "../../utils";

interface TextSearchProps extends SearchComponentProps {
  setRef: (ref: any) => void;
}

/**
 * Компонент поиска для поля текста
 * @param setSelectedKeys Метод таблицы для сохранения ключей поиска
 * @param column Описание полей в колонке
 * @param setRef Метод проброса ref текущего компонента наверх для работы с ним через DOM
 * @param selectedKeys Ключи поиска в таблице
 * @param confirm Submit событие поиска
 * @param clearFilters Метод очистки поисковых ключей
 * @returns JSX.Component
 */
export const TextSearch: React.FC<TextSearchProps> = ({
  setSelectedKeys,
  column,
  setRef,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const [t] = useTranslation("columnSearch");
  const { onSearchColumn } = useContext(TableActionsContext);
  const [searched] = selectedKeys;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSelectedKeys(value ? [value] : []);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    const trimmed = searched.trim();
    onSearchColumn(trimmed, confirm, column);
  }, [searched, confirm, column, onSearchColumn]);

  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={setRef}
        placeholder={t("placeholder.text")}
        value={searched}
        onChange={handleChange}
        onPressEnter={handleSearch}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <SearchFooter
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default TextSearch;
