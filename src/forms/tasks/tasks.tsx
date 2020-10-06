import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  useFormValues,
} from "../../utils";
import { getTasksColumns } from "./utils";
import {
  urls,
  formConfig,
  PERMISSIONS,
  TaskEntityProps,
  FORM_NAMES,
} from "../../constants";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";
import { AddTaskDrawer, CompletedTaskDrawer } from "../../drawers";
import { PagePermissionsChecker } from "../../wrappers";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setActiveTasks } from "../../__data__";
import { Dispatch } from "@reduxjs/toolkit";

const {
  TASKS: { drawers },
} = formConfig.tasks;

const taskDrawer = drawers.find((o) => o.code === "task");
const completedDrawer = drawers.find((o) => o.code === "taskCompleted");
const {
  TASKS: { GET, GET_OWNER, ADMIN },
} = PERMISSIONS;

interface TaskProps {
  activeTasks: TaskEntityProps[];
  setActiveTasks: (tasks: TaskEntityProps[]) => void;
}

export const Tasks = ({ activeTasks, setActiveTasks }: TaskProps) => {
  const [t] = useTranslation("tasks");
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [completedDrawerVisible, setCompletedDrawerVisible] = useState(false);

  const { update: completedFormUpdate } = useFormValues(
    FORM_NAMES.TASK_COMPLETED
  );

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
        setActiveTasks([...activeTasks, task]);
      }
    },
    [activeTasks]
  );

  const handleAddClick = useCallback(() => {
    setAddDrawerVisible(true);
  }, [addDrawerVisible]);

  const handleTaskComplete = useCallback(
    (id: string) => {
      completedFormUpdate(activeTasks.find((o) => o.id === id));
      setCompletedDrawerVisible(true);
    },
    [activeTasks]
  );

  const handleTaskDelete = useCallback(
    (id: string) => {
      fetchDelete(id);
      setActiveTasks(activeTasks.filter((task) => task.id !== id));
    },
    [activeTasks]
  );

  const handleCloseCompletedDrawer = useCallback(
    (event, task) => {
      setCompletedDrawerVisible(false);

      if (task) {
        setActiveTasks(getFiteredEntityArray(task.id, activeTasks));
      }
    },
    [activeTasks]
  );

  const dataSource = useMemo(
    () => getTasksColumns(selectedDate, activeTasks, t),
    [selectedDate, activeTasks, t]
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
          fields={completedDrawer?.fields ?? []}
          visible={completedDrawerVisible}
          onClose={handleCloseCompletedDrawer}
        />
        <Row className={style.container}>
          <Col flex="auto">
            <List
              loading={listLoading}
              grid={{ column: 3 }}
              dataSource={dataSource}
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
  activeTasks: state?.data?.activeTasks,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setActiveTasks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
