import { Button, Drawer, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { formConfig } from "../../constants";
import { Table } from "../table";
import { Icon } from "./components";

import style from "./qs-search.module.scss";

const title = "Поиск клиентов в Quick Sales";

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
    <div className={style.container}>
      <Tooltip title={title}>
        <Icon onClick={handleOpen} />
      </Tooltip>
      <Drawer
        title={title}
        placement="right"
        closable={false}
        onClose={handleClose}
        visible={visible}
      >
        {/* TODO ждём бек и сервис */}
        {/* <Table.Server url="" table={formConfig.clients.TABLES[0]} /> */}
      </Drawer>
    </div>
  );
};

export default QsSearch;
