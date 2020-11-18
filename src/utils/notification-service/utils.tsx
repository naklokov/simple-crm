import React, { ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { TaskEntityProps, TASK_TYPES_MAP } from "../../constants";
import { CurrentDescription, OverdueDescription } from "./components";

const showNotification = (
  title: string,
  description: ReactNode,
  key = uuidv4()
) => {
  const message = <strong>{title}</strong>;
  notification.info({
    key,
    message,
    description,
    duration: null,
  });
};

export const useOverdueTasks = () => {
  const [tasks, setTasks] = useState<TaskEntityProps[]>([]);
  const [t] = useTranslation("notification");
  const history = useHistory();

  useEffect(() => {
    if (tasks.length) {
      const title = t("overdue.message.title");
      const description = (
        <OverdueDescription tasks={tasks} history={history} />
      );
      showNotification(title, description);
      setTasks([]);
    }
  }, [tasks]);

  return setTasks;
};

export const useCurrentTasks = () => {
  const [tasks, setTasks] = useState<TaskEntityProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (tasks.length) {
      tasks.forEach((task) => {
        const key = uuidv4();
        const title = TASK_TYPES_MAP[task.taskType];
        const description = (
          <CurrentDescription
            notificationKey={key}
            task={task}
            history={history}
          />
        );
        showNotification(title, description, key);
      });

      setTasks([]);
    }
  }, [tasks]);

  return setTasks;
};
