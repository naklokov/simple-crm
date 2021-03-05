import React, { useState, useCallback, useMemo } from "react";
import axios from "axios";
import moment from "moment-timezone";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  getRsqlParams,
  useFetch,
  useFormValues,
} from "../../../../utils";
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
  TASK_STATUSES,
  TabPaneFormProps,
} from "../../../../constants";
import { useParams } from "react-router";
import {
  AddTaskDrawer,
  ViewTaskDrawer,
  CompletedTaskDrawer,
} from "../../../../drawers";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

const { TabPane } = Tabs;

const completedDrawer = formConfig.clientCard.lower.drawers.find(
  (drawer) => drawer.code === "taskCompleted"
);
const taskDrawer = formConfig.clientCard.lower.drawers.find(
  (drawer) => drawer.code === "task"
);

export const Tasks = ({ tab }: TabPaneFormProps) => {
  const [t] = useTranslation("tasks");
  const { id: clientId } = useParams<QueryProps>();
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);

  const { values } = useFormValues(FORM_NAMES.CLIENT_CARD);
  const { update: viewFormUpdate } = useFormValues(FORM_NAMES.TASK_VIEW);
  const { update: completedFormUpdate } = useFormValues(
    FORM_NAMES.TASK_COMPLETED
  );

  const query = getRsqlParams([{ key: "clientId", value: clientId }]);

  const { response, loading, reload } = useFetch({
    url: urls.tasks.entity,
    params: { query },
  });

  const tasks: TaskEntityProps[] = response?.data ?? [];

  const fetchDelete = async (id: string) => {
    try {
      const url = getFullUrl(urls.tasks.entity, id);
      await axios.delete(url);
      reload();
      defaultSuccessHandler(t("message.success.delete"));
    } catch (error) {
      defaultErrorHandler({ error });
    }
  };

  const handleDeleteRow = useCallback(
    (id: string) => {
      fetchDelete(id);
    },
    [reload]
  );

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
    (task) => {
      setAddDrawerVisible(false);
      if (!isEmpty(task)) {
        reload();
      }
    },
    [reload]
  );

  const handleCloseViewDrawer = useCallback(
    (task) => {
      setViewDrawerVisible(false);
      if (!isEmpty(task)) {
        reload();
      }
    },
    [reload]
  );

  const handleCloseCompleteDrawer = useCallback(
    (task) => {
      setCompletedDrawerVisible(false);
      if (!isEmpty(task)) {
        reload();
      }
    },
    [tasks]
  );

  const activeTasks = useMemo(
    () =>
      tasks
        .sort(
          (a: TaskEntityProps, b: TaskEntityProps) =>
            moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
        )
        .filter(({ taskStatus }) => taskStatus === TASK_STATUSES.NOT_COMPLETED),
    [tasks]
  );

  const completedTasks = useMemo(
    () =>
      tasks
        .sort(
          (a: TaskEntityProps, b: TaskEntityProps) =>
            moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
        )
        .filter(({ taskStatus }) => taskStatus === TASK_STATUSES.COMPLETED),
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
        title={t("drawer.add.title")}
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseAddDrawer}
        visible={addDrawerVisible}
      />
      <ViewTaskDrawer
        title={taskDrawer?.name ?? ""}
        fields={taskDrawer?.fields ?? []}
        onClose={handleCloseViewDrawer}
        visible={viewDrawerVisible}
      />
      <CompletedTaskDrawer
        title={completedDrawer?.name ?? ""}
        fields={completedDrawer?.fields ?? []}
        onClose={handleCloseCompleteDrawer}
        visible={completedDrawerVisible}
      />
      <div className={style.container}>
        <Tabs
          tabBarExtraContent={{
            left: (
              <ComponentPermissionsChecker hasRight={values?.isOwner?.UPDATE}>
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
              table={activeTasksTable as TabProps}
              loading={loading}
              dataSource={activeTasks}
              pagination={{ pageSize: 3 }}
              onViewRow={handleViewRow}
              onDoneRow={handleDoneRow}
              onDeleteRow={handleDeleteRow}
            />
          </TabPane>
          <TabPane tab="Выполненные" key="done">
            <Table.Client
              table={completedTasksTable as TabProps}
              loading={loading}
              dataSource={completedTasks}
              pagination={{ pageSize: 3 }}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;
