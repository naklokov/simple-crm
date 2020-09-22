import React, { useCallback, useState } from "react";
import moment from "moment-timezone";
import { Drawer, Calendar as CalendarUI, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import { CalendarOutlined } from "@ant-design/icons";

interface CalendarProps {
  onChange: (date: moment.Moment) => void;
}

export const Calendar = ({ onChange }: CalendarProps) => {
  const [t] = useTranslation("tasks");
  const [visible, setVisible] = useState(false);

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleChange = useCallback((date: moment.Moment) => {
    onChange(date);
    setVisible(false);
  }, []);

  return (
    <div>
      {!visible && (
        <div onClick={handleOpen}>
          <Avatar
            shape="square"
            size={64}
            style={{
              cursor: "pointer",
              position: "fixed",
              right: "0",
              bottom: "5%",
              backgroundColor: "#1890ff",
            }}
            icon={<CalendarOutlined />}
          />
        </div>
      )}
      <Drawer
        title={t("calendar.title")}
        placement="right"
        closable={false}
        onClose={handleClose}
        visible={visible}
        width={380}
      >
        <CalendarUI
          fullscreen={false}
          mode="month"
          style={{ width: "330px" }}
          onChange={handleChange}
        />
      </Drawer>
    </div>
  );
};

export default Calendar;
