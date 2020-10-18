import React, { useCallback } from "react";
import moment from "moment-timezone";
import { DatePicker, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { SearchFooter } from ".";
import { WithTranslation, withTranslation } from "react-i18next";
import { ColumnProps } from "../../../../constants";
import { TableActionsContext } from "../../utils";
import { flow } from "lodash";
import { connect } from "react-redux";
import { State } from "../../../../__data__/interfaces";
import { getDateWithTimezone } from "../../../../utils";

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

  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        ref={setRef}
        autoComplete="off"
        style={{ width: 200, marginBottom: 8, display: "block" }}
        format={column.format}
        placeholder={t("placeholder.date")}
        showTime={showTime}
        value={selectedKeys[0] ? moment(selectedKeys[0]) : null}
        onChange={(value) => {
          setSelectedKeys([value?.toISOString()]);
        }}
      />
      <SearchFooter
        selectedKeys={selectedKeys}
        column={column}
        confirm={confirm}
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
