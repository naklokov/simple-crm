import moment, { Moment } from "moment-timezone";
import { TaskEntityProps } from "../../constants/interfaces";
import { DATE_FORMATS } from "../../constants";
import { isEmpty } from "lodash";

interface TaskColumnProps {
  title: string;
  cards: TaskEntityProps[];
  dividerColor: string;
}

const DIVIDER_COLORS = ["#FAAD14", "#1890FF", "#B6232C"];

const TITLES_MAP = ["Сегодня", "Завтра", "Послезавтра"];

const getTasksByDate = (tasks: TaskEntityProps[], date: Moment) =>
  tasks.filter(({ taskEndDate }) => date.isSame(taskEndDate, "day"));

const getTitle = (date: Moment, idx: number, isToday: boolean) =>
  isToday ? TITLES_MAP[idx] : date.format(DATE_FORMATS.DATE);

export const getTasksColumns = (
  selectedDate: string,
  tasks: TaskEntityProps[]
) => {
  if (!isEmpty(tasks)) {
    const isToday = moment(selectedDate).isSame(moment(), "day");

    return DIVIDER_COLORS.map((dividerColor, idx) => {
      const curDate = moment(selectedDate).add(idx, "days");
      return {
        title: getTitle(curDate, idx, isToday),
        cards: getTasksByDate(tasks, curDate),
        dividerColor,
      };
    });
  }

  return [];
};
