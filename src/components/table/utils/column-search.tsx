import React from "react";
import { TextSearch, DictionarySearch } from "../components";
import { ColumnProps } from "../../../constants";

interface FilterPassedProps {
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
}

export const getColumnSearchProp = (column: ColumnProps) => {
  if (column.filterable) {
    let searchInput: HTMLInputElement;
    const handleSaveRef = (passedRef: HTMLInputElement) => {
      searchInput = passedRef;
    };
    const Search =
      column.columnType === "dictionary" ? DictionarySearch : TextSearch;

    return {
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
