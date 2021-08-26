import React from "react";
import { Dot } from "../../../../../dot";
import { ColumnProps } from "../../../../../../constants";
import { useActivity } from "../../../../utils";

import style from "./activity.module.scss";
import { COLUMN_COLORS_MAP, COLUMN_STATUS_MAP } from "../../../../constants";

interface ActivityProps {
  record: any;
  column: ColumnProps;
}

/**
 * Кастомная колонка отображения статуса активности компании
 * @param record Данные по текущей колонке
 * @param column Описание полей в колонке
 * @returns JSX.Component
 */
export const Activity: React.FC<ActivityProps> = ({ record, column }) => {
  const { status = COLUMN_STATUS_MAP.ACTIVE } = useActivity(
    record[column.columnCode]
  );

  return <Dot color={COLUMN_COLORS_MAP[status]} style={{ margin: "0 auto" }} />;
};

export default Activity;
