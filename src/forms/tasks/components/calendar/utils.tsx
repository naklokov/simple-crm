import { useCallback, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import moment from "moment-timezone";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  getRsqlParams,
  getDateFieldBetweenRsql,
  getExtraRsql,
  defaultErrorHandler,
  getDateWithTimezone,
} from "../../../../utils";
import {
  DATE_FORMATS,
  State,
  TaskEntityProps,
  TASK_DATE_FIELD_CODE,
  urls,
} from "../../../../constants";
import { CELL_COLORS } from "../../constants";

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
  const profileInfoId = useSelector(
    (state: State) => state?.persist?.profileInfo?.id
  );

  const reload = useCallback(() => {
    setReloadKey(uuidV4());
  }, []);

  const fetchTasks = useCallback(
    async (userProfileId: string) => {
      setLoading(true);
      try {
        const query = getRsqlParams([
          ...getExtraRsql(userProfileId),
          getDateFieldBetweenRsql({
            date,
            fieldCode: TASK_DATE_FIELD_CODE,
            unitOfTime: "month",
          }),
        ]);
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
    },
    [date]
  );

  useEffect(() => {
    if (profileInfoId) {
      fetchTasks(profileInfoId);
    }
  }, [fetchTasks, profileInfoId, reloadKey]);

  return { map, loading, reload };
};
