import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { Tabs, Button } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getDateWithTimezone,
  getFullUrl,
  getRsqlParams,
  useFetch,
  useFormValues,
} from "../../../../utils";

import style from "./tasks.module.scss";
import { Table } from "../../../../components";
import {
  urls,
  formConfig,
  TaskEntityProps,
  QueryProps,
  FORM_NAMES,
  TASK_STATUSES,
  TabPaneFormProps,
  ClientEntityProps,
} from "../../../../constants";
import {
  AddTaskDrawer,
  ViewTaskDrawer,
  CompletedTaskDrawer,
} from "../../../../drawers";
import { ComponentPermissionsChecker, FormWrapper } from "../../../../wrappers";
import { setTableLoading } from "../../../../__data__";
import { PlusIcon } from "../../../../assets/icons";

const { TabPane } = Tabs;

const completedDrawer = formConfig.clientCard.lower.drawers.find(
  (drawer) => drawer.code === "taskCompleted"
);
const taskDrawer = formConfig.clientCard.lower.drawers.find(
  (drawer) => drawer.code === "task"
);

const FIELD_CODES = {
  // комментарий о выполнении
  NOTE: "note",
  // дата фактического выполнения задачи
  TASK_COMPLETED_DATE: "taskCompletedDate",
  // дата для уведомления
  TASK_END_DATE: "taskEndDate",
  // идентификатор компании
  CLIENT_ID: "clientId",
};

const OMIT_COLUMNS_ACTIVE = [FIELD_CODES.NOTE, FIELD_CODES.TASK_COMPLETED_DATE];
const OMIT_COLUMNS_COMPLETE = [FIELD_CODES.TASK_END_DATE];

const sortByDateField = (field: string, order: "asc" | "desc") => (
  a: any,
  b: any
) =>
  order === "asc"
    ? moment(a?.[field]).unix() - moment(b?.[field]).unix()
    : moment(b?.[field]).unix() - moment(a?.[field]).unix();

export const Tasks = ({ tab, formName }: TabPaneFormProps) => {
  const [t] = useTranslation("tasks");
  const dispatch = useDispatch();
  const { id: clientId } = useParams<QueryProps>();
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);

  const [client, updateClient] = useFormValues<ClientEntityProps>(
    FORM_NAMES.CLIENT_CARD
  );
  const [, setAddTask] = useFormValues<TaskEntityProps>(FORM_NAMES.TASK_ADD);
  const [, setViewTask] = useFormValues<TaskEntityProps>(FORM_NAMES.TASK_VIEW);
  const [, setCompleteTask] = useFormValues<TaskEntityProps>(
    FORM_NAMES.TASK_COMPLETED
  );

  const query = getRsqlParams([
    { key: FIELD_CODES.CLIENT_ID, value: clientId },
  ]);

  const [tasks, loading, reload] = useFetch<TaskEntityProps[]>({
    url: urls.tasks.entity,
    params: { query },
  });

  useEffect(() => {
    dispatch(setTableLoading(loading));
  }, [loading, dispatch]);

  const fetchDelete = useCallback(
    async (id: string) => {
      try {
        dispatch(setTableLoading(true));
        const url = getFullUrl(urls.tasks.entity, id);
        await axios.delete(url);
        reload();
        defaultSuccessHandler(t("message.success.delete"));
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        dispatch(setTableLoading(false));
      }
    },
    [dispatch, reload, t]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      fetchDelete(id);
    },
    [fetchDelete]
  );

  const handleAddClick = useCallback(() => {
    setAddTask({ clientId } as TaskEntityProps);
    setAddDrawerVisible(true);
  }, []);

  const handleDoneRow = useCallback(
    (id) => {
      setCompleteTask(tasks?.find((o) => o.id === id));
      setCompletedDrawerVisible(true);
    },
    [tasks, setCompleteTask]
  );

  const handleViewRow = useCallback(
    (id) => {
      setViewTask(tasks?.find((o) => o.id === id));
      setViewDrawerVisible(true);
    },
    [tasks, setViewTask]
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
        updateClient({
          ...client,
          clientActivityDate: moment().toISOString(),
        });
        reload();
      }
    },
    [client, reload, updateClient]
  );

  const activeTasks = useMemo(
    () =>
      tasks
        .sort(sortByDateField(FIELD_CODES.TASK_END_DATE, "asc"))
        .filter(({ taskStatus }) => taskStatus === TASK_STATUSES.NOT_COMPLETED),
    [tasks]
  );

  const completedTasks = useMemo(
    () =>
      tasks
        .sort(sortByDateField(FIELD_CODES.TASK_COMPLETED_DATE, "desc"))
        .filter(({ taskStatus }) => taskStatus === TASK_STATUSES.COMPLETED),
    [tasks]
  );

  const activeTasksTable = {
    ...tab,
    columns: tab.columns?.filter(
      ({ columnCode }) => !OMIT_COLUMNS_ACTIVE.includes(columnCode)
    ),
  };

  const completedTasksTable = {
    ...tab,
    columns: tab.columns?.filter(
      ({ columnCode }) => !OMIT_COLUMNS_COMPLETE.includes(columnCode)
    ),
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
      <FormWrapper name={formName}>
        <Tabs
          style={{ marginTop: "-8px" }}
          tabBarExtraContent={{
            left: (
              <ComponentPermissionsChecker hasRight={client?.isOwner?.UPDATE}>
                <Button
                  icon={<PlusIcon />}
                  onClick={handleAddClick}
                  className={style.button}
                />
              </ComponentPermissionsChecker>
            ),
          }}
        >
          <TabPane tab={t("tab.completed")} key="done">
            <Table.Client
              columns={completedTasksTable?.columns}
              actions={completedTasksTable?.actions}
              links={completedTasksTable?._links}
              dataSource={completedTasks}
            />
          </TabPane>
          <TabPane tab={t("tab.active")} key="active">
            <Table.Client
              columns={activeTasksTable?.columns}
              actions={activeTasksTable?.actions}
              links={activeTasksTable?._links}
              dataSource={activeTasks}
              onViewRow={handleViewRow}
              onDoneRow={handleDoneRow}
              onDeleteRow={handleDeleteRow}
            />
          </TabPane>
        </Tabs>
      </FormWrapper>
    </div>
  );
};

export default Tasks;
