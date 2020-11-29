import React, { useCallback, useState } from "react";
import moment from "moment-timezone";
import { Drawer, Calendar as CalendarUI, Avatar, Badge, Button } from "antd";
import { useTranslation } from "react-i18next";
import { CalendarOutlined } from "@ant-design/icons";
import { Cell, Header } from "./components";

interface CalendarProps {
  onChange: (date: moment.Moment) => void;
}

export const Calendar = ({ onChange }: CalendarProps) => {
  const [t] = useTranslation("tasks");
  const [visible, setVisible] = useState(false);

  const handleDateFullCellRender = useCallback(
    (date: moment.Moment) => <Cell onClick={handleClose} date={date} />,
    []
  );

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
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
        closable={true}
        onClose={handleClose}
        visible={visible}
        width={380}
        footer={
          <Button style={{ float: "right" }} onClick={handleClose}>
            {t("tasks.drawer.button.close")}
          </Button>
        }
      >
        <CalendarUI
          headerRender={Header}
          dateFullCellRender={handleDateFullCellRender}
          fullscreen={false}
          style={{ width: "330px", borderBottom: "1px solid #f0f0f0" }}
          onChange={onChange}
        />
      </Drawer>
    </div>
  );
};

export default Calendar;
