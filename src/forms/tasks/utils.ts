import moment, { Moment } from "moment-timezone";
import { TaskEntityProps } from "../../constants/interfaces";
import { DATE_FORMATS } from "../../constants";
import { isEmpty } from "lodash";
import { getDateWithTimezone } from "../../utils";

const DIVIDER_COLORS = ["#FAAD14", "#1890FF", "#B6232C"];

const getColumnTitles = (t: Function) => [
  t("today"),
  t("tommorow"),
  t("without.date"),
];

export const getSortedTasksByDate = (
  tasks: TaskEntityProps[],
  date: Moment
) => {
  return tasks
    .filter(({ taskEndDate }) => {
      const endDate = getDateWithTimezone(taskEndDate).toISOString();
      return date.isSame(endDate, "day");
    })
    .sort(
      (a: TaskEntityProps, b: TaskEntityProps) =>
        moment(a.taskEndDate).unix() - moment(b.taskEndDate).unix()
    );
};

export const getTasksWithoutDate = (tasks: TaskEntityProps[]) =>
  tasks.filter(({ taskEndDate }) => !taskEndDate);

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

    const dates = [...Array(2)].map((o, idx) => {
      const curDate = moment(selectedDate).add(idx, "days");
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
        cards: getTasksWithoutDate(tasks),
        dividerColor: DIVIDER_COLORS[2],
      },
    ];
  }

  return [];
};
