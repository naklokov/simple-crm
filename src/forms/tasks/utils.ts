import moment, { Moment } from "moment-timezone";
import { TaskEntityProps } from "../../constants/interfaces";
import { DATE_FORMATS, TASK_STATUSES } from "../../constants";
import { isEmpty } from "lodash";
import { getDateWithTimezone } from "../../utils";

const DIVIDER_COLORS = ["#FAAD14", "#1890FF", "#B6232C"];

const getColumnTitles = (t: Function) => [
  t("today"),
  t("tommorow"),
  t("overdue"),
];

export const getSortedTasksByDate = (
  tasks: TaskEntityProps[],
  date: Moment
) => {
  return (
    tasks
      .filter(({ taskEndDate }) => {
        const endDate = getDateWithTimezone(taskEndDate).toISOString();
        return date.isSame(endDate, "day");
      })
      // TODO фильтровать при fetch запросе с бека
      .filter(({ taskStatus }) => taskStatus === TASK_STATUSES.NOT_COMPLETED)
      .sort(
        (a: TaskEntityProps, b: TaskEntityProps) =>
          moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
      )
  );
};

export const getOverdueTasks = (
  tasks: TaskEntityProps[],
  visibleTasksId: string[]
) =>
  tasks
    .map((task) => ({ ...task, format: DATE_FORMATS.DATE_TIME }))
    // TODO фильтровать при fetch запросе с бека
    .filter(({ taskStatus }) => taskStatus === TASK_STATUSES.NOT_COMPLETED)
    .filter(({ id }) => !visibleTasksId.includes(id))
    .filter(({ taskEndDate, id }) => moment().isAfter(taskEndDate));

export const getTitle = (
  date: Moment,
  idx: number,
  isToday: boolean,
  titles: any
) => (isToday ? titles[idx] : date.format(DATE_FORMATS.DATE));

export const getTasksColumns = (
  selectedDate: string,
  tasks: TaskEntityProps[],
  t: Function
) => {
  if (!isEmpty(tasks)) {
    const isToday = moment(selectedDate).isSame(moment(), "day");
    const titles = getColumnTitles(t);
    let visibleTasksId: string[] = [];

    const dates = [...Array(2)].map((o, idx) => {
      const curDate = moment(selectedDate).add(idx, "days");
      visibleTasksId = [
        ...visibleTasksId,
        ...getSortedTasksByDate(tasks, curDate).map(({ id }) => id),
      ];

      return {
        title: getTitle(curDate, idx, isToday, titles),
        cards: getSortedTasksByDate(tasks, curDate),
        dividerColor: DIVIDER_COLORS[idx],
      };
    });

    return [
      ...dates,
      {
        title: titles[2],
        cards: getOverdueTasks(tasks, visibleTasksId),
        dividerColor: DIVIDER_COLORS[2],
      },
    ];
  }

  return [];
};
