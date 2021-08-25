import React, { useCallback, useState } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { BackTop, Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import { TasksHeader } from ".";
import { Calendar, Column } from "./components";

import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  useFormValues,
} from "../../utils";
import { useColumns } from "./utils";
import {
  urls,
  formConfig,
  PERMISSIONS_SET,
  FORM_NAMES,
  PERMISSIONS,
  TaskEntityProps,
} from "../../constants";

import {
  AddTaskDrawer,
  CompletedTaskDrawer,
  ViewTaskDrawer,
} from "../../drawers";
import {
  ComponentPermissionsChecker,
  FormWrapper,
  PagePermissionsChecker,
} from "../../wrappers";
import { CalendarIcon } from "../../assets/icons";

const {
  TASKS: { drawers },
} = formConfig.tasks;

const taskDrawer = drawers.find((o) => o.code === "task");
const viewDrawer = drawers.find((o) => o.code === "taskView");
const completedDrawer = drawers.find((o) => o.code === "taskCompleted");

export const Tasks = () => {
  const [t] = useTranslation("tasks");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const { columns, reload } = useColumns(selectedDate);

  const [, setCompletedTask] = useFormValues<TaskEntityProps>(
    FORM_NAMES.TASK_COMPLETED
  );

  const [viewTask, setViewTask] = useFormValues<TaskEntityProps>(
    FORM_NAMES.TASK_VIEW
  );

  const fetchDelete = useCallback(
    async (id: string, date: string) => {
      try {
        const url = getFullUrl(urls.tasks.entity, id);
        await axios.delete(url);
        reload(date);
        defaultSuccessHandler(t("message.success.delete"));
      } catch (error) {
        defaultErrorHandler({ error });
      }
    },
    [reload, t]
  );

  const handleChangeDate = useCallback((date: moment.Moment) => {
    setSelectedDate(date.toISOString());
  }, []);

  const handleCloseAddDrawer = useCallback(
    (task) => {
      setAddDrawerVisible(false);
      if (!isEmpty(task)) {
        reload(task.taskEndDate);
      }
    },
    [reload]
  );

  const handleTaskView = useCallback(
    (task) => {
      setViewTask(task);
      setViewDrawerVisible(true);
    },
    [setViewTask]
  );

  const handleCloseViewDrawer = useCallback(
    (task) => {
      if (!isEmpty(task)) {
        reload(viewTask.taskEndDate);
        reload(task.taskEndDate);
      }
      setViewDrawerVisible(false);
    },
    [reload, viewTask.taskEndDate]
  );

  const handleCloseCompleteDrawer = useCallback(
    (task) => {
      setCompletedDrawerVisible(false);
      if (!isEmpty(task)) {
        reload(task.taskEndDate);
      }
    },
    [reload]
  );

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleTaskComplete = useCallback(
    (task) => {
      setCompletedTask(task);
      setCompletedDrawerVisible(true);
    },
    [setCompletedTask]
  );

  const handleTaskDelete = useCallback(
    (task) => {
      fetchDelete(task.id, task.taskEndDate);
    },
    [fetchDelete]
  );

  const extra = (
    <>
      <Calendar
        title={t("calendar.title")}
        icon={<CalendarIcon />}
        selectedDate={selectedDate}
        onChange={handleChangeDate}
      />
      <ComponentPermissionsChecker
        availablePermissions={[PERMISSIONS.TASKS["ADD.ALL"]]}
      >
        <Button type="primary" onClick={handleAddClick}>
          {t("button.add.title")}
        </Button>
      </ComponentPermissionsChecker>
    </>
  );

  return (
    <PagePermissionsChecker availablePermissions={PERMISSIONS_SET.TASK_GET}>
      <>
        <TasksHeader extra={extra} />
        <AddTaskDrawer
          title={taskDrawer?.name ?? ""}
          fields={taskDrawer?.fields ?? []}
          onClose={handleCloseAddDrawer}
          visible={addDrawerVisible}
        />
        <ViewTaskDrawer
          title={viewDrawer?.name ?? ""}
          fields={viewDrawer?.fields ?? []}
          onClose={handleCloseViewDrawer}
          visible={viewDrawerVisible}
        />
        <CompletedTaskDrawer
          title={completedDrawer?.name ?? ""}
          fields={completedDrawer?.fields ?? []}
          onClose={handleCloseCompleteDrawer}
          visible={completedDrawerVisible}
        />
        <FormWrapper>
          <Row>
            {columns.map((column) => (
              <Col span={8} key={column.title}>
                <Column
                  {...column}
                  onView={handleTaskView}
                  onDelete={handleTaskDelete}
                  onComplete={handleTaskComplete}
                />
              </Col>
            ))}
          </Row>
        </FormWrapper>
        <BackTop />
      </>
    </PagePermissionsChecker>
  );
};

export default Tasks;
