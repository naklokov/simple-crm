import React, { useCallback, useState } from "react";
import { Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ORDER_TYPES, SortOrderType, SortType } from "../constants";
import { Arrow } from "../../../../../components";

const Sort: React.FC<SortType> = ({ onSort }) => {
  const [t] = useTranslation("tasks");
  const [order, setOrder] = useState<SortOrderType>();

  /**
   * обработчик порядка сортировки
   */
  const handleChangeSortOrder = useCallback(() => {
    const orderNext = order ? ORDER_TYPES.indexOf(order) + 1 : 0;
    onSort(ORDER_TYPES[orderNext]);
    setOrder(ORDER_TYPES[orderNext]);
  }, [order, onSort]);

  const title = order ? t(`sort.tooltip.${order}`) : t(`sort.tooltip.default`);

  return (
    <Typography.Link
      style={{ marginLeft: "10px" }}
      onClick={handleChangeSortOrder}
    >
      <Tooltip title={title}>
        <Arrow direction="up" isActive={order === "asc"} />
        <Arrow direction="down" isActive={order === "desc"} />
      </Tooltip>
    </Typography.Link>
  );
};

export default Sort;
