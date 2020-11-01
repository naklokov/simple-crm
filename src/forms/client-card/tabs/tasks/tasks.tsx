import React, { useEffect, useState, useCallback, useMemo } from "react";
import moment from "moment-timezone";
import {
  getRsqlParams,
  getUpdatedEntityArray,
  useFetch,
  useFormValues,
} from "../../../../utils";
import { useTranslation } from "react-i18next";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import style from "./tasks.module.scss";
import { Table } from "../../../../components";
import {
  TabProps,
  urls,
  formConfig,
  TaskEntityProps,
  QueryProps,
  FORM_NAMES,
  PERMISSIONS_SET,
  State,
  TableProps,
  TASK_STATUSES,
} from "../../../../constants";
import { useParams } from "react-router";
import {
  AddTaskDrawer,
  ViewTaskDrawer,
  CompletedTaskDrawer,
} from "../../../../drawers";
import { setActiveTasks } from "../../../../__data__";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { ComponentPermissionsChecker } from "../../../../wrappers";

const { TabPane } = Tabs;

const completedDrawer = formConfig.clientCard.lower.drawers.find(
  (drawer) => drawer.code === "taskCompleted"
);
const taskDrawer = formConfig.clientCard.lower.drawers.find(
  (drawer) => drawer.code === "task"
);

interface TasksProps {
  tab: TabProps;
  activeTasks: TaskEntityProps[];
  setActiveTasks: (tasks: TaskEntityProps[]) => void;
}

export const Tasks = ({ tab, setActiveTasks, activeTasks }: TasksProps) => {
  const [tasks, setTasks] = useState<TaskEntityProps[]>([]);
  const { id: clientId } = useParams<QueryProps>();
  const [loading, setLoading] = useState(false);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);

  const { values } = useFormValues(FORM_NAMES.CLIENT_CARD);
  const { update: viewFormUpdate } = useFormValues(FORM_NAMES.TASK_VIEW);
  const { update: completedFormUpdate } = useFormValues(
    FORM_NAMES.TASK_COMPLETED
  );

  const query = getRsqlParams([{ key: "clientId", value: clientId }]);

  const { response, loading: fetchLoading } = useFetch({
    url: urls.tasks.entity,
    params: { query },
  });

  useEffect(() => {
    setLoading(fetchLoading);
  }, [fetchLoading]);

  useEffect(() => {
    setTasks(response?.data ?? []);
  }, [response]);

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleDoneRow = useCallback(
    (id) => {
      completedFormUpdate(
        tasks.find((o) => o.id === id) || ({} as TaskEntityProps)
      );
      setCompletedDrawerVisible(true);
    },
    [tasks]
  );

  const handleViewRow = useCallback(
    (id) => {
      viewFormUpdate(tasks.find((o) => o.id === id) || ({} as TaskEntityProps));
      setViewDrawerVisible(true);
    },
    [tasks]
  );

  const handleCloseAddDrawer = useCallback(
    (event, task) => {
      setAddDrawerVisible(false);

      if (task) {
        setTasks([...tasks, task]);
        setActiveTasks([...activeTasks, task]);
      }
    },
    [tasks, activeTasks]
  );

  const handleCloseViewDrawer = useCallback(
    (event, task) => {
      setViewDrawerVisible(false);

      if (task) {
        setTasks(getUpdatedEntityArray(task, tasks));
        setActiveTasks(getUpdatedEntityArray(task, activeTasks));
      }
    },
    [tasks, activeTasks]
  );

  const handleTaskDelete = useCallback(
    (id) => {
      setViewDrawerVisible(false);
      setTasks(tasks.filter((task) => task.id !== id));
      setActiveTasks(activeTasks.filter((task) => task.id !== id));
    },
    [tasks, activeTasks]
  );

  const handleTaskCompleted = useCallback(
    (id) => {
      completedFormUpdate(
        tasks.find((o) => o.id === id) || ({} as TaskEntityProps)
      );
      setViewDrawerVisible(false);
      setCompletedDrawerVisible(true);
    },
    [tasks, activeTasks]
  );

  const handleCloseCompletedDrawer = useCallback(
    (event, task) => {
      setCompletedDrawerVisible(false);

      if (task) {
        setTasks(getUpdatedEntityArray(task, tasks));
        setActiveTasks(getUpdatedEntityArray(task, activeTasks));
      }
    },
    [tasks, activeTasks]
  );

  const sortedTasks = useMemo(
    () =>
      tasks.sort(
        (a: TaskEntityProps, b: TaskEntityProps) =>
          moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
      ),
    [tasks]
  );

  const activeTasksTable = {
    ...tab,
    columns:
      tab.columns?.filter(({ columnCode }) => columnCode !== "note") ?? [],
  };

  const completedTasksTable = {
    ...tab,
    actions: [],
  };

  return (
    <div>
      <AddTaskDrawer
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseAddDrawer}
        visible={addDrawerVisible}
      />
      <ViewTaskDrawer
        title={taskDrawer?.name ?? ""}
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseViewDrawer}
        visible={viewDrawerVisible}
        onDelete={handleTaskDelete}
        onCompleted={handleTaskCompleted}
      />
      <CompletedTaskDrawer
        fields={completedDrawer?.fields ?? []}
        visible={completedDrawerVisible}
        onClose={handleCloseCompletedDrawer}
      />
      <div className={style.container}>
        <Tabs
          tabBarExtraContent={{
            left: (
              <ComponentPermissionsChecker
                hasRight={values?.isOwner?.UPDATE}
                availablePermissions={PERMISSIONS_SET.CLIENT_UPDATE}
              >
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddClick}
                  className={style.button}
                />
              </ComponentPermissionsChecker>
            ),
          }}
        >
          <TabPane tab="Активные" key="active">
            <Table.Client
              className={style.table}
              table={activeTasksTable as TabProps}
              loading={loading}
              pagination={{ pageSize: 3 }}
              dataSource={sortedTasks.filter(
                ({ taskStatus }) => taskStatus === TASK_STATUSES.NOT_COMPLETED
              )}
              onViewRow={handleViewRow}
              onDoneRow={handleDoneRow}
              actionsPermissions={[]}
            />
          </TabPane>
          <TabPane tab="Выполненные" key="done">
            <Table.Client
              className={style.table}
              table={completedTasksTable as TabProps}
              loading={loading}
              pagination={{ pageSize: 3 }}
              dataSource={sortedTasks.filter(
                ({ taskStatus }) => taskStatus === TASK_STATUSES.COMPLETED
              )}
              actionsPermissions={[]}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  activeTasks: state?.data?.activeTasks,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setActiveTasks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
