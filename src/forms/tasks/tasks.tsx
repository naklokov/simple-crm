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
  useFetchPersonalClients,
  useFormValues,
} from "../../utils";
import { useColumns } from "./utils";
import {
  urls,
  formConfig,
  PERMISSIONS_SET,
  PERMISSIONS,
  FORM_NAMES,
  TaskEntityProps,
} from "../../constants";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";
import { AddTaskDrawer, CompletedTaskDrawer } from "../../drawers";
import {
  ComponentPermissionsChecker,
  PagePermissionsChecker,
} from "../../wrappers";
import { ClientsPersonalContext } from "../../components/table/utils";
import { CalendarOutlined } from "@ant-design/icons";

const {
  TASKS: { drawers },
} = formConfig.tasks;

const taskDrawer = drawers.find((o) => o.code === "task");
const completedDrawer = drawers.find((o) => o.code === "taskCompleted");

export const Tasks = () => {
  const [t] = useTranslation("tasks");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);
  const { columns, reload } = useColumns(selectedDate);

  const personalClients = useFetchPersonalClients();

  const { update: completedFormUpdate } = useFormValues(
    FORM_NAMES.TASK_COMPLETED
  );

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
    (event, task) => {
      setAddDrawerVisible(false);
      if (task) {
        reload(task.taskEndDate);
      }
    },
    [reload]
  );

  const handleCloseCompletedDrawer = useCallback(
    (event, task) => {
      setCompletedDrawerVisible(false);
      if (task) {
        reload(task.taskEndDate);
      }
    },
    [reload]
  );

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, []);

  const handleTaskComplete = useCallback((task: TaskEntityProps) => {
    completedFormUpdate(task);
    setCompletedDrawerVisible(true);
  }, []);

  const handleTaskDelete = useCallback(
    (task: TaskEntityProps) => {
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
          fields={taskDrawer?.fields ?? []}
          onClose={handleCloseAddDrawer}
          visible={addDrawerVisible}
        />
        <CompletedTaskDrawer
          fields={completedDrawer?.fields ?? []}
          onClose={handleCloseCompletedDrawer}
          visible={completedDrawerVisible}
        />
        <Row className={style.container}>
          {columns.map((column) => (
            <ClientsPersonalContext.Provider
              key={column.title}
              value={personalClients}
            >
              <Col span={8}>
                <Column
                  {...column}
                  onDelete={handleTaskDelete}
                  onComplete={handleTaskComplete}
                />
              </Col>
            </ClientsPersonalContext.Provider>
          ))}
        </Row>
        <BackTop />
      </React.Fragment>
    </PagePermissionsChecker>
  );
};

export default Tasks;
