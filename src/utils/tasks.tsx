import moment from "moment-timezone";
import { DATE_FORMATS, TaskEntityProps } from "../constants";

export const getOverdueTasks = (
  tasks: TaskEntityProps[],
  visibleTasksId: string[] = []
) =>
  tasks
    .map((task) => ({ ...task, format: DATE_FORMATS.DATE_TIME }))
    .filter(({ id }) => !visibleTasksId.includes(id))
    .filter(({ taskEndDate }) => moment().isAfter(taskEndDate));
