import React from "react";
import moment from "moment-timezone";

interface CellProps {
  date: moment.Moment;
  onClick: () => void;
}

export const Cell = ({ date, onClick }: CellProps) => {
  const day = date.date();

  return (
    <div
      onTouchStart={onClick}
      onClick={onClick}
      className="ant-picker-cell-inner ant-picker-calendar-date"
    >
      {day}
    </div>
  );
};

export default Cell;
