import moment from "moment-timezone";
import { DATE_FORMATS, TaskEntityProps, TASK_STATUSES } from "../constants";

const filterOverdueNotCompleted = (task: TaskEntityProps) =>
  moment().isAfter(task.taskEndDate) &&
  task.taskStatus !== TASK_STATUSES.COMPLETED;

export const getOverdueTasks = (
  tasks: TaskEntityProps[],
  visibleTasksId: string[] = []
) =>
  tasks
    .filter(filterOverdueNotCompleted)
    // оставляем в "просроченных" все задачи кроме тех, которые уже видны в других колонках
    .filter(({ id }) => !visibleTasksId.includes(id))
    .sort(
      (a: TaskEntityProps, b: TaskEntityProps) =>
        moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
    )
    .map((task) => ({ ...task, format: DATE_FORMATS.DATE_TIME }));
