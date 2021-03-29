import React, { ReactNode, useEffect, useState } from "react";
import { History } from "history";
import axios from "axios";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { notification } from "antd";
import { useSelector } from "react-redux";
import {
  EntityOwnerProps,
  NotificationProps,
  NotificationStatusType,
  State,
  TaskEntityProps,
  TASKS_TYPES_ICONS_MAP,
  TASKS_ACTIVE_DURATION,
  urls,
} from "../../constants";
import { getDateRsql, getOverdueRsql } from "../tasks";
import { defaultErrorHandler, pluralize } from "../common";
import { InfoIcon, NotificationWarning } from "../../assets/icons";
import { Title, Content, OverdueContent } from "./components";

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
  icon,
}: ShowNotificationProps) => {
  const offsetIcon = <div style={{ marginTop: "4px" }}>{icon}</div>;

  notification.open({
    key: id,
    icon: offsetIcon,
    message: title,
    description: content,
    duration: TASKS_ACTIVE_DURATION,
    placement: "bottomRight",
  });
};

export const useActiveDateTime = () => {
  const [dateTime, setDateTime] = useState("");
  const [waitKey, setWaitKey] = useState("");

  // ожидание "ровной" минуты XX минут 00 секунд (погрешность 1 секунда)
  useEffect(() => {
    const currentDateTime = moment().toISOString();
    if (!dateTime && moment(currentDateTime).seconds() > 1) {
      setTimeout(() => {
        setWaitKey(uuidv4());
      }, 10);
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

export const updateNotificationStatus = (
  id: string,
  notifications: NotificationProps[],
  status: NotificationStatusType
) =>
  notifications.map((notif) => {
    if (notif.id === id) {
      return {
        ...notif,
        status,
      };
    }

    return notif;
  });

export const getMoreActiveTasksProps = (count: number, t: Function) => {
  const id = uuidv4();
  const title = <strong>{t("info.message.title")}</strong>;
  const icon = <InfoIcon />;
  const dateTime = moment().toISOString();
  const description = pluralize(count, [
    t("active.more.content.one", { count }),
    t("active.more.content.some", { count }),
    t("active.more.content.many", { count }),
  ]);

  const content = <Content description={description} date={dateTime} />;

  return {
    id,
    title,
    icon,
    content,
  };
};

export const getOverdueTasksProps = (
  total: number,
  onClickLink: (id: string) => void,
  history: History,
  t: Function
) => {
  const id = uuidv4();
  const title = <strong>{t("warning.message.title")}</strong>;
  const icon = <NotificationWarning />;
  const content = (
    <OverdueContent
      id={id}
      onClickLink={onClickLink}
      history={history}
      total={total}
    />
  );

  return { id, title, icon, content };
};
