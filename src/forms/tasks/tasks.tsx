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
  getFiteredEntityArray,
} from "../../utils";
import { getTasksColumns } from "./utils";
import {
  urls,
  formConfig,
  PERMISSIONS,
  TaskEntityProps,
} from "../../constants";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";
import { AddTaskDrawer, CompletedTaskDrawer } from "../../drawers";
import { PagePermissionsChecker } from "../../wrappers";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setTasks } from "../../__data__";
import { Dispatch } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";

const {
  TASKS: { drawers },
} = formConfig.tasks;

const taskDrawer = drawers.find((o) => o.code === "task");
const completedDrawer = drawers.find((o) => o.code === "taskCompleted");
const {
  TASKS: { GET, GET_OWNER, ADMIN },
} = PERMISSIONS;

interface TaskProps {
  tasks: TaskEntityProps[];
  setTasks: (tasks: TaskEntityProps[]) => void;
}

export const Tasks = ({ tasks, setTasks }: TaskProps) => {
  const [t] = useTranslation("tasks");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");

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
    setListLoading(isEmpty(tasks));
  }, [tasks]);

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
  tasks: state?.data?.tasks,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTasks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
