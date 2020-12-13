import React from "react";
import {
  TextSearch,
  EntitySearch,
  DictionarySearch,
  DateSearch,
} from "../components";
import { ColumnType, ColumnProps, RecordType } from "../../../constants";

const getSearch = (columnType: ColumnType) => {
  switch (columnType) {
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
    const Search = getSearch(column.columnType);
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
