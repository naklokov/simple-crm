import React, { useEffect } from "react";
import {
  showNotification,
  useActiveTasks,
  useOverdueTasksTotal,
} from "./utils";
import { TASK_TYPES_MAP } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { Active, Overdue } from "./components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { play } from "../sounds";

export const useNotificationService = () => {
  const [t] = useTranslation("notification");
  const history = useHistory();

  const activeTasks = useActiveTasks();
  const overdueTasksTotal = useOverdueTasksTotal();

  useEffect(() => {
    if (overdueTasksTotal) {
      const id = uuidv4();
      const content = (
        <Overdue id={id} total={overdueTasksTotal} history={history} />
      );
      showNotification(t("overdue.message.title"), content, id, "warning");
      play();
    }
  }, [overdueTasksTotal]);

  useEffect(() => {
    activeTasks.map((task) => {
      const id = uuidv4();
      const title = TASK_TYPES_MAP[task.taskType];
      const content = <Active id={id} task={task} history={history} />;

      showNotification(title, content, id);
      play();
    });
  }, [activeTasks]);
};
