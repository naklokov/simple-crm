import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { Col, List, Row } from "antd";
import { TasksHeader } from ".";
import { Calendar, Column } from "./components";

import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  getRsqlParams,
  getFiteredEntityArray,
  useFetch,
} from "../../utils";
import { getTasksColumns, getCompletedTasksRsql } from "./utils";
import {
  TaskEntityProps,
  urls,
  formConfig,
  PERMISSIONS,
  TASK_STATUSES,
} from "../../constants";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { connect } from "react-redux";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";
import { AddTaskDrawer, CompletedTaskDrawer } from "../../drawers";
import { PagePermissionsChecker } from "../../wrappers";

const {
  TASKS: { drawers },
} = formConfig.tasks;

const taskDrawer = drawers.find((o) => o.code === "task");
const completedDrawer = drawers.find((o) => o.code === "taskCompleted");
const {
  TASKS: { GET, GET_OWNER, ADMIN },
} = PERMISSIONS;

interface TaskProps {
  profileInfo: ProfileInfoProps;
}

export const Tasks = ({ profileInfo }: TaskProps) => {
  const [t] = useTranslation("tasks");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [tasks, setTasks] = useState([] as TaskEntityProps[]);
  const [listLoading, setListLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const query = getRsqlParams([
    { key: "userProfileId", value: profileInfo.id || "" },
    getCompletedTasksRsql(TASK_STATUSES.COMPLETED),
  ]);
  const { response, loading } = useFetch({
    url: urls.tasks.entity,
    params: { query },
  });

  const fetchDelete = async (id: string) => {
    setListLoading(true);
    try {
      const url = getFullUrl(urls.tasks.entity, id);
      await axios.delete(url);
      defaultSuccessHandler(t("message.success.delete"));
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    setTasks(response?.data ?? []);
  }, [response]);

  useEffect(() => {
    setListLoading(loading);
  }, [loading]);

  const handleChangeDate = useCallback(
    (date: moment.Moment) => {
      setSelectedDate(date.toISOString());
    },
    [selectedDate]
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

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, [addDrawerVisible]);

  const handleTaskComplete = useCallback(
    (id: string) => {
      setSelectedId(id);
      setCompletedDrawerVisible(true);
    },
    [tasks]
  );

  const handleTaskDelete = useCallback(
    (id: string) => {
      fetchDelete(id);
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  const handleCloseCompletedDrawer = useCallback(
    (event, task) => {
      setCompletedDrawerVisible(false);

      if (task) {
        setTasks(getFiteredEntityArray(task.id, tasks));
      }
    },
    [tasks]
  );

  return (
    <PagePermissionsChecker availablePermissions={[GET, GET_OWNER, ADMIN]}>
      <div>
        <div className={style.header}>
          <TasksHeader onAddClick={handleAddClick} />
        </div>
        <AddTaskDrawer
          fields={taskDrawer?.fields ?? []}
          onClose={handleCloseAddDrawer}
          visible={addDrawerVisible}
        />
        <CompletedTaskDrawer
          initialValues={tasks.find(({ id }) => selectedId === id) || {}}
          fields={completedDrawer?.fields ?? []}
          visible={completedDrawerVisible}
          onClose={handleCloseCompletedDrawer}
        />
        <Row className={style.container}>
          <Col flex="auto">
            <List
              loading={listLoading}
              grid={{ column: 3 }}
              dataSource={getTasksColumns(selectedDate, tasks, t)}
              renderItem={(column) => (
                <Column
                  onDelete={handleTaskDelete}
                  onComplete={handleTaskComplete}
                  {...column}
                />
              )}
            />
          </Col>
          <Calendar onChange={handleChangeDate} />
        </Row>
      </div>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? "",
});

export default connect(mapStateToProps)(Tasks);
