import React, { useEffect, useState, useCallback } from "react";
import moment from "moment-timezone";
import {
  useFetch,
  getRsqlParams,
  getUpdatedEntityArray,
} from "../../../../utils";
import { useTranslation } from "react-i18next";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import style from "./tasks.module.scss";
import { Table, DrawerForm } from "../../../../components";
import {
  TabProps,
  urls,
  formConfig,
  TaskEntityProps,
  QueryProps,
} from "../../../../constants";
import { useParams } from "react-router";
import {
  AddTaskDrawer,
  ViewTaskDrawer,
  CompletedTaskDrawer,
} from "../../../../drawers";

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
  const { id: clientId } = useParams<QueryProps>();
  const [tasks, setTasks] = useState([] as TaskEntityProps[]);
  const [activeDrawerId, setActiveDrawerId] = useState("");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);
  const query = getRsqlParams([{ key: "clientId", value: clientId }]);
  const { loading, response } = useFetch({
    url: urls.tasks.entity,
    params: { query },
  });

  useEffect(() => {
    setTasks(response?.data ?? []);
  }, [response]);

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleDoneRow = useCallback(
    (id) => {
      setActiveDrawerId(id);
      setCompletedDrawerVisible(true);
    },
    [tasks]
  );

  const handleViewRow = useCallback(
    (id) => {
      setActiveDrawerId(id);
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
        const updated = getUpdatedEntityArray(task, tasks);
        setTasks(updated);
      }
      setActiveDrawerId("");
    },
    [tasks]
  );

  const handleTaskDelete = useCallback(
    (id) => {
      setViewDrawerVisible(false);
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  const handleTaskCompleted = useCallback(
    (id) => {
      setViewDrawerVisible(false);
      setCompletedDrawerVisible(true);
    },
    [tasks]
  );

  const handleCloseCompletedDrawer = useCallback(
    (event, task) => {
      setCompletedDrawerVisible(false);

      if (task) {
        setTasks(getUpdatedEntityArray(task, tasks));
      }
    },
    [tasks]
  );

  const notCompletedSortedTasks = tasks
    .filter(({ taskStatus }) => taskStatus === "NOT_COMPLETED")
    .sort(
      (a: TaskEntityProps, b: TaskEntityProps) =>
        moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
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
        initialValues={tasks.find((o) => o.id === activeDrawerId) ?? {}}
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseViewDrawer}
        visible={viewDrawerVisible}
        onDelete={handleTaskDelete}
        onCompleted={handleTaskCompleted}
      />
      <CompletedTaskDrawer
        initialValues={tasks.find((o) => o.id === activeDrawerId) ?? {}}
        fields={completedDrawer?.fields ?? []}
        visible={completedDrawerVisible}
        onClose={handleCloseCompletedDrawer}
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
              className={style.table}
              columns={tab.columns}
              actions={tab.actions}
              loading={loading}
              pagination={{ pageSize: 3 }}
              dataSource={notCompletedSortedTasks}
              onViewRow={handleViewRow}
              onDoneRow={handleDoneRow}
              withTitle={false}
            />
          </TabPane>
          <TabPane tab="Выполненные" key="done">
            <Table
              className={style.table}
              columns={tab.columns}
              loading={loading}
              pagination={{ pageSize: 3 }}
              dataSource={tasks.filter(
                ({ taskStatus }) => taskStatus === "COMPLETED"
              )}
              withTitle={false}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;
