import React, { useEffect } from "react";
import {
  showNotification,
  useActiveTasks,
  useOverdueTasksTotal,
} from "./utils";
import { TASKS_TYPES_ICONS_MAP } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { ActiveContent, OverdueContent, Title } from "./components";
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
      const title = <strong>{t("overdue.message.title")}</strong>;
      const content = (
        <OverdueContent id={id} total={overdueTasksTotal} history={history} />
      );

      showNotification({ title, content, id, type: "warning" });
    }
  }, [overdueTasksTotal]);

  useEffect(() => {
    activeTasks.map((task) => {
      const {
        taskType: type,
        taskDescription: description,
        taskEndDate: date,
        clientId,
      } = task;

      const id = uuidv4();
      const icon = TASKS_TYPES_ICONS_MAP[type];
      const title = <Title id={id} clientId={clientId} history={history} />;
      const content = <ActiveContent description={description} date={date} />;

      showNotification({ title, content, id, icon });
      play();
    });
  }, [activeTasks]);
};
