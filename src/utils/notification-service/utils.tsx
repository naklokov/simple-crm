import React, { ReactNode, useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { notification } from "antd";
import {
  EntityOwnerProps,
  State,
  TaskEntityProps,
  urls,
} from "../../constants";
import { useSelector } from "react-redux";
import { getDateRsql, getOverdueRsql } from "../tasks";
import { defaultErrorHandler } from "../common";
import { PhoneTwoTone } from "@ant-design/icons";

interface ShowNotificationProps {
  title: ReactNode;
  content: ReactNode;
  id?: string;
  type?: "info" | "warning" | "error";
  button?: ReactNode;
  icon?: ReactNode;
}

export const showNotification = ({
  title,
  content,
  id = uuidv4(),
  type = "info",
  button,
  icon,
}: ShowNotificationProps) => {
  notification?.[type]?.({
    key: id,
    message: title,
    description: content,
    btn: button,
    icon,
    duration: 0,
    placement: "bottomRight",
  });
};

export const useActiveDateTime = () => {
  const [dateTime, setDateTime] = useState("");
  const [waitKey, setWaitKey] = useState("");

  // ожидание "ровной" минуты XX минут 00 секунд (погрешность 1 секунда)
  useEffect(() => {
    const currentDateTime = moment().toISOString();
    if (moment(currentDateTime).seconds() > 1) {
      setTimeout(() => {
        setWaitKey(uuidv4());
      }, 500);
      return;
    }

    setDateTime(currentDateTime);
  }, [waitKey]);

  // вызов обновления dateTime с таймаутом 1 минута
  useEffect(() => {
    if (dateTime) {
      setTimeout(() => {
        const newDateTime = moment(dateTime).add(1, "minutes").toISOString();
        setDateTime(newDateTime);
      }, 60000);
    }
  }, [dateTime]);

  return dateTime;
};

export const useOverdueTasksTotal = () => {
  const [total, setTotal] = useState(0);
  const profileInfo = useSelector(
    (state: State) => state?.data?.profileInfo ?? ({} as EntityOwnerProps)
  );

  const fetchOverdueTasks = async () => {
    try {
      const query = getOverdueRsql(moment().toISOString(), profileInfo.id);
      const response = await axios.get(urls.tasks.paging, {
        params: { query },
      });

      setTotal(response?.data?.totalCount ?? 0);
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    }
  };

  useEffect(() => {
    if (profileInfo.id) {
      fetchOverdueTasks();
    }
  }, [profileInfo]);

  return total;
};

export const useActiveTasks = () => {
  const [tasks, setTasks] = useState<TaskEntityProps[]>([]);
  const dateTime = useActiveDateTime();
  const profileInfo = useSelector(
    (state: State) => state?.data?.profileInfo ?? ({} as EntityOwnerProps)
  );

  const fetchTasks = async () => {
    try {
      const query = getDateRsql(dateTime, profileInfo.id, "minute");
      const response = await axios.get(urls.tasks.entity, {
        params: { query },
      });

      setTasks(response?.data ?? []);
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    }
  };

  useEffect(() => {
    if (profileInfo.id && dateTime) {
      fetchTasks();
    }
  }, [profileInfo, dateTime]);

  return tasks;
};
