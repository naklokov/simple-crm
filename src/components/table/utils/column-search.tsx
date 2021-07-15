import React from "react";
import {
  TextSearch,
  EntitySearch,
  DictionarySearch,
  DateSearch,
  PhoneSearch,
  ActivitySearch,
} from "../components";
import { ColumnProps, RecordType } from "../../../constants";

import { checkColumnActionType } from "./common";

/**
 * Получение компонента поиска по типу колонки и наличию кастомного кода
 * @param column Описание полей в колонке
 * @returns JSX Component поиска соответствующий типу колонки
 */
const getSearch = (column: ColumnProps) => {
  if (checkColumnActionType(column, "call")) {
    return PhoneSearch;
  }

  switch (column.customCode) {
    case "activity":
      return ActivitySearch;
  }

  switch (column.columnType) {
    case "entity":
      return EntitySearch;
    case "dictionary":
      return DictionarySearch;
    case "date":
      return DateSearch;
    default:
      return TextSearch;
  }
};

interface FilterPassedProps {
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
}

export const getColumnSearchProp = (
  column: ColumnProps,
  searchedColumns: RecordType
) => {
  if (column.filterable) {
    let searchInput: HTMLInputElement;
    const handleSaveRef = (passedRef: HTMLInputElement) => {
      searchInput = passedRef;
    };
    const Search = getSearch(column);
    return {
      filteredValue: searchedColumns?.[column.columnCode]
        ? [searchedColumns[column.columnCode]]
        : null,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterPassedProps) => (
        <Search
          column={column}
          setRef={handleSaveRef}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      ),
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInput?.select(), 100);
        }
      },
    };
  }
  return {};
};
