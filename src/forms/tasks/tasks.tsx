import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import { Calendar, Col, List, Row } from "antd";
import { TasksHeader } from ".";
import { Column } from "./components";

import { getDateWithTimezone, getRsqlQuery, useFetch } from "../../utils";
import { getTasksColumns } from "./utils";
import { TaskEntityProps, TASK_STATUSES, urls } from "../../constants";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { connect } from "react-redux";

import style from "./tasks.module.scss";

interface TaskProps {
  profileInfo: ProfileInfoProps;
}

export const Tasks = ({ profileInfo }: TaskProps) => {
  const [tasks, setTasks] = useState([] as TaskEntityProps[]);
  const [listLoading, setListLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());

  const layout = {
    calendar: {
      xs: { span: 24 },
      xl: { span: 9 },
    },
    columns: {
      xs: { span: 24 },
      xl: { span: 15 },
    },
  };

  const params = getRsqlQuery([
    { key: "userProfileId", value: profileInfo.id || "" },
  ]);
  const { response, loading } = useFetch({ url: urls.tasks.entity, params });

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

  return (
    <div>
      <div className={style.header}>
        <TasksHeader />
      </div>
      <Row className={style.container}>
        <Col {...layout.columns}>
          <List
            loading={listLoading}
            grid={{ column: 3 }}
            dataSource={getTasksColumns(selectedDate, tasks)}
            renderItem={(column) => <Column {...column} />}
          />
        </Col>
        <Col {...layout.calendar}>
          <Calendar
            fullscreen={false}
            className={style.calendar}
            onChange={handleChangeDate}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? "",
});

export default connect(mapStateToProps)(Tasks);
