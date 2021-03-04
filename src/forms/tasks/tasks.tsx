import React, { useCallback, useState } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { BackTop, Button, Col, Row } from "antd";
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
} from "../../constants";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";
import {
  AddTaskDrawer,
  CompletedTaskDrawer,
  ViewTaskDrawer,
} from "../../drawers";
import {
  ComponentPermissionsChecker,
  PagePermissionsChecker,
} from "../../wrappers";
import { isEmpty } from "lodash";
import { CalendarOutlined } from "@ant-design/icons";

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

  const { update: completedFormUpdate } = useFormValues(
    FORM_NAMES.TASK_COMPLETED
  );

  const { update: viewFormUpdate } = useFormValues(FORM_NAMES.TASK_VIEW);

  const fetchDelete = async (id: string, date: string) => {
    try {
      const url = getFullUrl(urls.tasks.entity, id);
      await axios.delete(url);
      reload(date);
      defaultSuccessHandler(t("message.success.delete"));
    } catch (error) {
      defaultErrorHandler({ error });
    }
  };

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

  const handleTaskView = useCallback((task) => {
    viewFormUpdate(task);
    setViewDrawerVisible(true);
  }, []);

  const handleCloseViewDrawer = useCallback(
    (task) => {
      if (!isEmpty(task)) {
        reload(task.taskEndDate);
      }
      setViewDrawerVisible(false);
    },
    [reload]
  );

  const handleCloseCompleteDrawer = useCallback(
    (task) => {
      if (!isEmpty(task)) {
        reload(task.taskEndDate);
      }
      setViewDrawerVisible(false);
      setCompletedDrawerVisible(true);
    },
    [reload]
  );

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleTaskComplete = useCallback((task) => {
    completedFormUpdate(task);
    setCompletedDrawerVisible(true);
  }, []);

  const handleTaskDelete = useCallback(
    (task) => {
      fetchDelete(task.id, task.taskEndDate);
    },
    [reload]
  );

  const extra = (
    <>
      <Calendar
        title={t("calendar.title")}
        icon={<CalendarOutlined />}
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
      <React.Fragment>
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
        <Row className={style.container}>
          {columns.map((column) => (
            <Col span={8}>
              <Column
                {...column}
                onView={handleTaskView}
                onDelete={handleTaskDelete}
                onComplete={handleTaskComplete}
              />
            </Col>
          ))}
        </Row>
        <BackTop />
      </React.Fragment>
    </PagePermissionsChecker>
  );
};

export default Tasks;
