import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import { Calendar, Col, List, Row } from "antd";
import { TasksHeader } from ".";
import { Column } from "./components";

import { getRsqlParams, useFetch } from "../../utils";
import { getTasksColumns } from "./utils";
import {
  TaskEntityProps,
  urls,
  formConfig,
  PERMISSIONS,
} from "../../constants";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { connect } from "react-redux";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";
import { AddTaskDrawer } from "../../drawers";
import { PagePermissionsChecker } from "../../wrappers";

const {
  TASKS: { drawers },
} = formConfig.tasks;

const taskDrawer = drawers.find((o) => o.code === "task");
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

  const query = getRsqlParams([
    { key: "userProfileId", value: profileInfo.id || "" },
  ]);
  const { response, loading } = useFetch({
    url: urls.tasks.entity,
    params: { query },
  });

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
        <Row className={style.container}>
          <Col flex="auto">
            <List
              loading={listLoading}
              grid={{ column: 3 }}
              dataSource={getTasksColumns(selectedDate, tasks, t)}
              renderItem={(column) => <Column {...column} />}
            />
          </Col>
          <Col flex="320px">
            <Calendar
              fullscreen={false}
              className={style.calendar}
              onChange={handleChangeDate}
            />
          </Col>
        </Row>
      </div>
    </PagePermissionsChecker>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? "",
});

export default connect(mapStateToProps)(Tasks);
