import moment, { Moment } from "moment-timezone";
import {
  DATE_FORMATS,
  RSQL_OPERATORS_MAP,
  TaskEntityProps,
} from "../../constants";
import { getOverdueTasks } from "../../utils";
import { isEmpty } from "lodash";
import { getDateWithTimezone } from "../../utils";

const DIVIDER_COLORS = ["#FAAD14", "#1890FF", "#B6232C"];

const getColumnTitles = (t: Function) => [
  t("today"),
  t("tommorow"),
  t("overdue"),
];

export const getCompletedTasksRsql = (value: string) => ({
  key: "entityData",
  operator: RSQL_OPERATORS_MAP.FIELD_EQUAL,
  value: `(taskStatus,"${value}")`,
});

export const getTasksByDate = (tasks: TaskEntityProps[], date: Moment) =>
  tasks.filter(({ taskEndDate }) => {
    const endDate = getDateWithTimezone(taskEndDate);
    return date.isSame(endDate, "day");
  });

export const getSortedTasksByDate = (tasks: TaskEntityProps[], date: Moment) =>
  getTasksByDate(tasks, date).sort(
    (a: TaskEntityProps, b: TaskEntityProps) =>
      moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
  );

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

    const overdueTasks = getOverdueTasks(tasks, visibleTasksId);
    return [
      ...dates,
      {
        title: `${titles[2]} - ${overdueTasks.length}`,
        cards: overdueTasks,
        dividerColor: DIVIDER_COLORS[2],
      },
    ];
  }

  return [];
};
