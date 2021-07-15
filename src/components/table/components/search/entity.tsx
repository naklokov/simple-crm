import React, { useCallback, useContext } from "react";
import { Select } from "antd";
import { flow } from "lodash";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { State } from "../../../../constants";
import { SearchFooter } from ".";
import { TableActionsContext } from "../../utils";
import { SearchComponentProps } from "../../constants";

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
  dictionaries,
}) => {
  const options = dictionaries?.[column.columnCode] ?? [];
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
  }, [searched, confirm, column, onSearchColumn]);

  return (
    <div style={{ padding: 8 }}>
      <Select
        showSearch
        style={{ width: 190, display: "block", marginBottom: 8 }}
        placeholder={t("placeholder.entity")}
        optionFilterProp="children"
        value={selectedKeys[0]}
        onChange={handleChange}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((o: any) => {
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

const mapStateToProps = (state: State) => ({
  dictionaries: state?.app?.dictionaries,
});

export default flow([connect(mapStateToProps)])(EntitySearch);
