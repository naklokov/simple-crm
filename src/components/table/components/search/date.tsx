import React, { useCallback, useContext } from "react";
import moment from "moment-timezone";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { flow } from "lodash";
import { connect } from "react-redux";
import { State } from "../../../../constants";
import { SearchFooter } from ".";
import { TableActionsContext } from "../../utils";
import { SearchComponentProps } from "../../constants";

/**
 * Компонент поиска для поля даты
 * @param setSelectedKeys Метод таблицы для сохранения ключей поиска
 * @param column Описание полей в колонке
 * @param selectedKeys Ключи поиска в таблице
 * @param confirm Submit событие поиска
 * @param clearFilters Метод очистки поисковых ключей
 * @returns JSX.Component
 */
export const DateSearch: React.FC<SearchComponentProps> = ({
  setSelectedKeys,
  column,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const [t] = useTranslation("columnSearch");
  // массив значений (начало дня и конец дня)
  const [searchedRange] = selectedKeys;
  const showTime = /hh:mm/gi.test(column?.format ?? "");
  const { onSearchColumn } = useContext(TableActionsContext);

  const handleChange = useCallback(
    (value: moment.Moment | null) => {
      const from = value?.startOf("day").toISOString() ?? "";
      const to = value?.endOf("day").toISOString() ?? "";
      setSelectedKeys([[from, to]]);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    onSearchColumn(searchedRange, confirm, column);
  }, [confirm, column, onSearchColumn, searchedRange]);

  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        autoComplete="off"
        style={{ width: 200, marginBottom: 8, display: "block" }}
        format={column.format}
        placeholder={t("placeholder.date")}
        showTime={showTime}
        value={searchedRange?.[0] ? moment(searchedRange?.[0]) : null}
        onChange={handleChange}
      />
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

export default flow([connect(mapStateToProps)])(DateSearch);
