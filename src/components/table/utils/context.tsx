import React from "react";
import { noop } from "lodash";

import { RecordType } from "../../../constants";

export const SearchedAllContext = React.createContext("");
export const SearchedColumnsContext = React.createContext<RecordType>({});
export const TableActionsContext = React.createContext({
  onSaveRow: noop,
  onDeleteRow: noop,
  onViewRow: noop,
  onDoneRow: noop,
  onSearchColumn: noop,
  onResetFilter: noop,
});
