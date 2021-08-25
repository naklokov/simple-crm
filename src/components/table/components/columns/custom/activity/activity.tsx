import React from "react";
import { Dot } from "../../../../../dot";
import { ColumnProps } from "../../../../../../constants";
import { COLUMN_COLORS_MAP, COLUMN_STATUS_MAP } from "../../../../constants";
import { useActivity } from "../../../../utils";

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
  const { status } = useActivity(record[column.columnCode]);

  const dotClassName = status
    ? COLUMN_COLORS_MAP[status]
    : COLUMN_COLORS_MAP[COLUMN_STATUS_MAP.ACTIVE];

  return <Dot className={dotClassName} style={{ margin: "0 auto" }} />;
};

export default Activity;
