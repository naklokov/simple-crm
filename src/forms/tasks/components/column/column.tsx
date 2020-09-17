import { Divider, Typography } from "antd";
import React from "react";
import { Card } from "..";
import { TaskEntityProps } from "../../../../constants";

import style from "./column.module.scss";

interface ColumnProps {
  title: string;
  cards: TaskEntityProps[];
  dividerColor?: string;
}

export const Column = ({
  title,
  cards,
  dividerColor = "#ffffff",
}: ColumnProps) => {
  return (
    <div className={style.container}>
      <Typography.Title level={5} className={style.title}>
        {title}
      </Typography.Title>
      <Divider
        className={style.divider}
        style={{ backgroundColor: dividerColor }}
      />
      {cards.map((card) => (
        <div className={style.card}>
          <Card
            key={card.id}
            id={"id"}
            title={"Компания"}
            taskType={card.taskType}
            date={card.taskEndDate}
            taskDescription={card.taskDescription}
          />
        </div>
      ))}
    </div>
  );
};

export default Column;
