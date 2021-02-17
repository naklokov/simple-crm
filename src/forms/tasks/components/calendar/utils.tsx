import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import moment from "moment-timezone";
import {
  getRsqlParams,
  getDateFieldIsBetweenRsql,
  getExtraRsql,
  defaultErrorHandler,
  getDateWithTimezone,
} from "../../../../utils";
import axios from "axios";
import {
  DATE_FORMATS,
  EntityOwnerProps,
  State,
  TaskEntityProps,
  TASK_DATE_FIELD_CODE,
  urls,
} from "../../../../constants";
import { useSelector } from "react-redux";
import { CELL_COLORS } from "../../constants";
import { memoize } from "lodash";

type BadgeMapType = { [key: string]: number };

const getBadgeMap = (tasks?: TaskEntityProps[]) =>
  tasks?.reduce((map: BadgeMapType, task) => {
    const date = getDateWithTimezone(task.taskEndDate).format(
      DATE_FORMATS.DATE
    );
    const count = map?.[date] ?? 0;
    return { ...map, [date]: count + 1 };
  }, {}) ?? {};

export const getCellColor = (
  date: string,
  selectedDate: string,
  selectedMonth: string
) => {
  if (moment(selectedDate).isSame(date, "day")) {
    return CELL_COLORS.SELECTED;
  }

  if (moment(date).isSame(selectedMonth, "month")) {
    return CELL_COLORS.VIEW;
  }

  return CELL_COLORS.NOT_VIEW;
};

export const useBadgeMap = (date: string) => {
  const [map, setMap] = useState<BadgeMapType>({});
  const [reloadKey, setReloadKey] = useState("");
  const [loading, setLoading] = useState(false);
  const profileInfo = useSelector(
    (state: State) => state?.data?.profileInfo ?? ({} as EntityOwnerProps)
  );

  const reload = useCallback(() => {
    setReloadKey(uuidV4());
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const query = getRsqlParams([
        ...getExtraRsql(profileInfo.id),
        getDateFieldIsBetweenRsql({
          date,
          fieldCode: TASK_DATE_FIELD_CODE,
          unitOfTime: "month",
        }),
      ]);
      debugger;
      const response = await axios.get(urls.tasks.entity, {
        params: { query },
      });

      const tasks = response?.data ?? [];
      setMap(getBadgeMap(tasks));
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileInfo.id) {
      fetchTasks();
    }
  }, [profileInfo, date, reloadKey]);

  return { map, loading, reload };
};
