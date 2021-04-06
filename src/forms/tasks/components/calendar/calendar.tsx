import React, { ReactNode, useCallback, useState } from "react";
import moment from "moment-timezone";
import { Drawer, Calendar as CalendarUI, Button, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { Cell, Header } from "./components";
import { getCellColor, useBadgeMap } from "./utils";
import { DATE_FORMATS } from "../../../../constants";

interface CalendarProps {
  title: string;
  icon: ReactNode;
  selectedDate: string;
  onChange: (date: moment.Moment) => void;
}

export const Calendar = ({
  title,
  icon,
  selectedDate,
  onChange,
}: CalendarProps) => {
  const [t] = useTranslation("tasks");
  const [visible, setVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate);
  const { map: badgeMap, loading, reload } = useBadgeMap(selectedMonth);

  let isChangePanel = false;
  const renderCell = useCallback(
    (date: moment.Moment) => {
      const color = getCellColor(
        date.toISOString(),
        selectedDate,
        selectedMonth
      );
      const count = badgeMap[date.format(DATE_FORMATS.DATE)];
      return <Cell date={date} count={count} color={color} />;
    },
    [badgeMap, selectedDate, selectedMonth]
  );

  const handlePanelChange = useCallback((date: moment.Moment) => {
    isChangePanel = true;
    setSelectedMonth(date.toISOString());
  }, []);

  const handleOpen = useCallback(() => {
    reload();
    setVisible(true);
  }, [reload]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleChange = useCallback(
    (data: moment.Moment) => {
      onChange(data);

      if (isChangePanel) {
        isChangePanel = false;
      } else {
        handleClose();
      }
    },
    [isChangePanel, onChange]
  );

  return (
    <>
      <Button onClick={handleOpen} icon={icon}>
        {title}
      </Button>
      <Drawer
        title={t("calendar.drawer.title")}
        placement="right"
        onClose={handleClose}
        visible={visible}
        width={380}
        footer={
          <Button style={{ float: "right" }} onClick={handleClose}>
            {t("tasks.drawer.button.close")}
          </Button>
        }
        closable
      >
        <Spin spinning={loading}>
          <CalendarUI
            headerRender={Header}
            dateFullCellRender={renderCell}
            fullscreen={false}
            style={{ width: "330px", borderBottom: "1px solid #f0f0f0" }}
            onChange={handleChange}
            onPanelChange={handlePanelChange}
          />
        </Spin>
      </Drawer>
    </>
  );
};

export default Calendar;
