import React, { useEffect, useState, useCallback } from "react";
import {
  useFetch,
  getRsqlQuery,
  getUpdatedEntityArray,
} from "../../../../utils";
import { useTranslation } from "react-i18next";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import style from "./tasks.module.scss";
import { Table, DrawerForm } from "../../../../components";
import { TabProps, urls, formConfig } from "../../../../constants";
import { useParams } from "react-router";
import { AddTaskDrawer, ViewTaskDrawer } from "../../../../drawers";

const { TabPane } = Tabs;

const {
  clientCard: {
    lower: { drawers },
  },
} = formConfig;

const completedDrawer = drawers.find(
  (drawer) => drawer.code === "taskCompleted"
);
const taskDrawer = drawers.find((drawer) => drawer.code === "task");

interface TasksProps {
  tab: TabProps;
}

export const Tasks = ({ tab }: TasksProps) => {
  const [t] = useTranslation("clientCardTasks");
  const { id: clientId } = useParams();
  const [tasks, setTasks] = useState([] as any[]);
  const [initialValues, setInitialValues] = useState({});
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const params = getRsqlQuery({ clientId });
  const { loading, response } = useFetch({ url: urls.tasks.entity, params });

  useEffect(() => {
    setTasks(response?.data ?? []);
  }, [response]);

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleViewRow = useCallback(
    (id) => {
      const initialValues = tasks.find((task) => id === task.id);
      setInitialValues(initialValues);
      setViewDrawerVisible(true);
    },
    [tasks]
  );

  const handleCloseAddDrawer = useCallback(
    (event, task) => {
      setAddDrawerVisible(false);

      if (task) {
        setTasks([...tasks, task]);
      }
    },
    [tasks]
  );

  const handleCloseViewDrawer = useCallback(
    (event, task) => {
      setViewDrawerVisible(false);

      if (task) {
        setTasks(getUpdatedEntityArray(task, tasks));
      }
    },
    [tasks]
  );

  return (
    <div>
      <AddTaskDrawer
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseAddDrawer}
        visible={addDrawerVisible}
      />
      <ViewTaskDrawer
        title={taskDrawer?.name ?? ""}
        initialValues={initialValues}
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseViewDrawer}
        visible={viewDrawerVisible}
      />
      <div className={style.container}>
        <Tabs
          tabBarExtraContent={{
            left: (
              <Button
                icon={<PlusOutlined />}
                onClick={handleAddClick}
                className={style.button}
              />
            ),
          }}
        >
          <TabPane tab="Активные" key="active">
            <Table
              columns={tab.columns}
              actions={tab.actions}
              loading={loading}
              pagination={{ pageSize: 3 }}
              dataSource={tasks}
              onViewRow={handleViewRow}
              withTitle={false}
            />
          </TabPane>
          <TabPane tab="Выполненные" key="done">
            <Table
              columns={tab.columns}
              loading={loading}
              pagination={{ pageSize: 3 }}
              dataSource={tasks}
              withTitle={false}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;
