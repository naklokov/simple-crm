import { Tooltip, Typography } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import style from "./column.module.scss";

import {
  SORT_ARROW_COLORS,
  TaskSortType,
  TitleTypeType,
} from "../../constants";

export interface HeaderProps {
  titleType: TitleTypeType;
  title: string;
  count: number;
  sort: TaskSortType;
  setSort: (order: TaskSortType) => void;
}

export const Header = React.memo(
  ({
    titleType = undefined,
    title = "",
    count = 0,
    sort = "asc",
    setSort = (order: TaskSortType) => order,
  }: HeaderProps) => {
    const [t] = useTranslation("tasks");

    const arrowStyle = {
      fontSize: "12px",
    };

    /**
     * Получение цвета для активной сортировки
     * @param order Тип сортировки asc или desc
     */
    const getSortArrowColor = useCallback(
      (order: TaskSortType) =>
        sort === order ? SORT_ARROW_COLORS.ACTIVE : SORT_ARROW_COLORS.DEFAULT,
      [sort]
    );

    /**
     * Событие для выставления сортировки по возрастанию
     */
    const handleSortAsc = useCallback(() => {
      setSort("asc");
    }, [setSort]);

    /**
     * Событие для выставления сортировки по убыванию
     */
    const handleSortDesc = useCallback(() => {
      setSort("desc");
    }, [setSort]);

    return (
      <Typography.Title
        type={titleType}
        level={5}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={style.title}
      >
        <div>{`${title} - ${count}`}</div>
        <div
          style={{
            display: "flex",
            marginLeft: "10px",
          }}
        >
          <Tooltip title={t("sort.tooltip.asc")}>
            <CaretUpOutlined
              style={{
                color: getSortArrowColor("asc"),
                ...arrowStyle,
              }}
              onClick={handleSortAsc}
            />
          </Tooltip>

          <Tooltip title={t("sort.tooltip.desc")}>
            <CaretDownOutlined
              style={{
                color: getSortArrowColor("desc"),
                ...arrowStyle,
              }}
              onClick={handleSortDesc}
            />
          </Tooltip>
        </div>
      </Typography.Title>
    );
  }
);
