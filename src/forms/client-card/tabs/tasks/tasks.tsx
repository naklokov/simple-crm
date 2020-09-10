import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultErrorHandler, fillTemplate } from "../../../../utils";
import { useTranslation } from "react-i18next";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import style from "./tasks.module.scss";
import { Table, DrawerForm } from "../../../../components";
import { TabProps, urls } from "../../../../constants";
import { useParams } from "react-router";

const { TabPane } = Tabs;

interface TasksProps {
  tab: TabProps;
}

export const Tasks = ({ tab }: TasksProps) => {
  const [t] = useTranslation("clientCardTasks");
  const { id: clientId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setTableLoading(true);
      const url = fillTemplate(urls.tasks.clientTasks, { clientId });
      const responce = await axios.get(url);
      setTasks(responce?.data ?? {});
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("message.get.error"),
      });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={style.container}>
      <Tabs
        tabBarExtraContent={{
          left: <Button icon={<PlusOutlined />} className={style.button} />,
        }}
      >
        <TabPane tab="Активные" key="active">
          <Table
            columns={tab.columns}
            actions={tab.actions}
            loading={tableLoading}
            pageCount={5}
            dataSource={tasks}
          />
        </TabPane>
        <TabPane tab="Выполненные" key="done">
          <Table
            columns={tab.columns}
            loading={tableLoading}
            pageCount={5}
            dataSource={tasks}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Tasks;
