import React, { useCallback, useContext } from "react";
import { SearchFooter } from ".";

import { PHONE_PLACEHOLDER } from "../../../../constants";
import { getNormalizePhone, handlePressEnter } from "../../../../utils";
import { PhoneInput } from "../../../phone-input";
import { SearchComponentProps } from "../../constants";
import { TableActionsContext } from "../../utils";

/**
 * Компонент поиска для поля маскированного телефона
 * @param setSelectedKeys Метод таблицы для сохранения ключей поиска
 * @param column Описание полей в колонке
 * @param selectedKeys Ключи поиска в таблице
 * @param confirm Submit событие поиска
 * @param clearFilters Метод очистки поисковых ключей
 * @returns JSX.Component
 */
export const PhoneSearch: React.FC<SearchComponentProps> = ({
  setSelectedKeys,
  column,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
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
    const normalizePhone = getNormalizePhone(searched);
    onSearchColumn(normalizePhone, confirm, column);
  }, [confirm, column, searched, onSearchColumn]);

  const handleKeyDown = useCallback(
    (e) => {
      handlePressEnter(e, handleSearch);
    },
    [handleSearch]
  );

  return (
    <div style={{ padding: 8 }}>
      <PhoneInput
        style={{ width: 188, marginBottom: 8, display: "block" }}
        value={searched}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={PHONE_PLACEHOLDER}
      />

      <SearchFooter
        onSearch={handleSearch}
        column={column}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default PhoneSearch;
