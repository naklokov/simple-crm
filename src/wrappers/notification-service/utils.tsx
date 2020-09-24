import moment from "moment-timezone";
import { TaskEntityProps, urls } from "../../constants";
import { getDateWithTimezone } from "../../utils";

const inTime = (task: TaskEntityProps) => {
  const DIFF = 5;
  const from = moment().add(-DIFF, "seconds");
  const to = moment().add(DIFF, "seconds");
  return getDateWithTimezone(task.taskEndDate).isBetween(from, to);
};

export const getCurrentTasks = (tasks: TaskEntityProps[]) =>
  tasks.filter(inTime);
