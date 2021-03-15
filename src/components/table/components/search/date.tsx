import React, { useCallback, useContext } from "react";
import moment from "moment-timezone";
import { DatePicker } from "antd";
import { WithTranslation, withTranslation } from "react-i18next";
import { flow } from "lodash";
import { connect } from "react-redux";
import { ColumnProps, State } from "../../../../constants";
import { SearchFooter } from ".";
import { TableActionsContext } from "../../utils";

interface DateSearchProps extends WithTranslation {
  column: ColumnProps;
  setSelectedKeys: any;
  setRef: any;
  selectedKeys: any;
  confirm: string;
  clearFilters: any;
}

export const DateSearch = ({
  t,
  setSelectedKeys,
  column,
  setRef,
  selectedKeys,
  confirm,
  clearFilters,
}: DateSearchProps) => {
  const showTime = /hh:mm/gi.test(column?.format ?? "");
  const [searched] = selectedKeys;
  const { onSearchColumn } = useContext(TableActionsContext);

  const handleChange = useCallback(
    (value: moment.Moment | null) => {
      setSelectedKeys([value?.toISOString()]);
    },
    [setSelectedKeys]
  );

  const handleSearch = useCallback(() => {
    onSearchColumn(searched, confirm, column);
  }, [selectedKeys, confirm, column]);

  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        ref={setRef}
        autoComplete="off"
        style={{ width: 200, marginBottom: 8, display: "block" }}
        format={column.format}
        placeholder={t("placeholder.date")}
        showTime={showTime}
        value={searched ? moment(searched) : null}
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
  dictionaries: state?.data?.dictionaries,
});

export default flow([
  connect(mapStateToProps),
  withTranslation(["columnSearch"]),
])(DateSearch);
