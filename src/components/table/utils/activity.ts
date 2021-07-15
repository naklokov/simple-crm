import { isNil } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { ACTIVITY_RANGE, COLUMN_STATUS_MAP } from "../constants";

/**
 * Метод получения границ даты по статусу
 * @param status Статус активности
 * @returns Объект значений from и to в формате ISO строки
 */
export const getRangeByStatus = (status: string) => {
  const { from, to } = ACTIVITY_RANGE[status];

  if (!isNil(from) && !isNil(to)) {
    const isoFrom = moment()
      .startOf("day")
      .subtract(from, "days")
      .toISOString();
    const isoTo = moment().endOf("day").subtract(to, "days").toISOString();
    return { from: isoFrom, to: isoTo };
  }

  return { from: "", to: "" };
};

/**
 * Метод проверки попадания даты в диапазон
 * @param date Сравниваемая дата
 * @param from Минимальное значение даты в диапазоне
 * @param to Максимальное значение даты в диапазоне
 * @returns true или false
 */
const checkDateConditions = (date: string, from: string, to: string) =>
  moment(date).isSameOrAfter(moment(from)) &&
  moment(date).isSameOrBefore(moment(to));

/**
 * Метод проверки попадания date значения в выбранный range диапазон
 * @param date Дата для сравнения
 * @param status Статус активности
 * @returns Boolean значение проверки
 */
const checkRange = (date: string, status: string) => {
  const { from, to } = getRangeByStatus(status);

  if (from && to) {
    return checkDateConditions(date, from, to);
  }

  return false;
};

/**
 * hook метод для получения статуса активности
 * @param date Дата для определения статуса активности
 * @returns значение статуса и текстовый заголовок
 */
export const useActivity = (date?: string) => {
  const [t] = useTranslation("activity");

  if (date) {
    const status = Object.values(COLUMN_STATUS_MAP).find((item) =>
      checkRange(date, item)
    );

    return {
      status,
      title: status ? t(status) : "",
    };
  }

  return {
    status: undefined,
    title: "",
  };
};
