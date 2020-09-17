import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import { Calendar, Col, List, Row } from "antd";
import { TasksHeader } from ".";
import { Column } from "./components";

import { getRsqlQuery, useFetch } from "../../utils";
import { getTasksColumns } from "./utils";
import { TaskEntityProps, urls } from "../../constants";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { connect } from "react-redux";

import style from "./tasks.module.scss";
import { useTranslation } from "react-i18next";

interface TaskProps {
  profileInfo: ProfileInfoProps;
}

export const Tasks = ({ profileInfo }: TaskProps) => {
  const [t] = useTranslation("tasks");
  const [tasks, setTasks] = useState([] as TaskEntityProps[]);
  const [listLoading, setListLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());

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
        <Col flex="auto">
          <List
            loading={listLoading}
            grid={{ column: 3 }}
            dataSource={getTasksColumns(selectedDate, tasks, t)}
            renderItem={(column) => <Column {...column} />}
          />
        </Col>
        <Col flex="310px">
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
