import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { getRsqlDateBefore, getRsqlDateBetween, getRsqlParams } from "..";
import { useCurrentTasks, useOverdueTasks } from "./utils";
import { urls } from "../../constants";

const MINUTE = 60000;

export const useNotificationService = () => {
  const [seconds, setSeconds] = useState(0);

  const fetchTasks = async (time: moment.Moment = moment()) => {
    const from = time.startOf("minute");
    const to = time.endOf("minute");
    const params = {
      query: getRsqlParams([getRsqlDateBetween("taskEndDate", from, to)]),
    };
    // const response = await axios.get(urls.tasks.entity, { params });
    // const tasks = response?.data ?? [];

    // setCurrentTasks(tasks);
  };

  const fetchOverdueTasks = async () => {
    const date = moment().endOf("minute");
    const params = {
      query: getRsqlParams([getRsqlDateBefore("taskEndDate", date)]),
    };
    const response = await axios.get(urls.tasks.entity, { params });
    // const tasks = response?.data ?? [];

    // setOverdueTasks(tasks);
  };

  const setOverdueTasks = useOverdueTasks();
  const setCurrentTasks = useCurrentTasks();

  useEffect(() => {
    fetchOverdueTasks();
  }, []);

  // таймер для ежеминутного получения задач
  useEffect(() => {
    if (seconds < 60) {
      const seconds = moment().seconds();
      setTimeout(() => setSeconds(seconds + 1), 1000);
    } else {
      fetchTasks();
      setTimeout(() => {
        fetchTasks();
      }, MINUTE);
    }
  }, [seconds]);
};
