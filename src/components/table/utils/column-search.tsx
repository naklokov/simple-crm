import React from "react";
import {
  TextSearch,
  EntitySearch,
  DictionarySearch,
  DateSearch,
  PhoneSearch,
} from "../components";
import {
  ColumnProps,
  RecordType,
  ActionProps,
  ActionType,
} from "../../../constants";

const checkColumnActionType = (column: ColumnProps, actionType: ActionType) =>
  column.columnActions?.some((o: ActionProps) => o.actionType === "call");

const getSearch = (column: ColumnProps) => {
  if (checkColumnActionType(column, "call")) {
    return PhoneSearch;
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
