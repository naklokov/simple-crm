import { Button, Drawer } from "antd";
import React, { useCallback, useState } from "react";
import { formConfig } from "../../constants";
import { Table } from "../table";
import { Icon } from "./components";

interface QsSearchProps {
  url: string;
}

export const QsSearch = ({ url }: QsSearchProps) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, [visible]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [visible]);

  return (
    <div>
      {/* <Icon style={{ fontSize: "16px" }} onClick={handleOpen} /> */}
      <Button type="primary" onClick={handleOpen}>
        Открыть поиск в QS
      </Button>
      <Drawer
        title="Поиск компаний в Quick Sales"
        placement="right"
        closable={false}
        onClose={handleClose}
        visible={visible}
      >
        <Table.Server url="" table={formConfig.clients.TABLES[0]} />
      </Drawer>
    </div>
  );
};

export default QsSearch;
