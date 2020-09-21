import { Divider, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "..";
import { TaskEntityProps } from "../../../../constants";

import style from "./column.module.scss";

interface ColumnProps {
  title: string;
  cards: TaskEntityProps[];
  dividerColor?: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Column = ({
  title,
  cards,
  dividerColor = "#ffffff",
  onComplete,
  onDelete,
}: ColumnProps) => {
  const [t] = useTranslation("tasks");
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
            id={card.id}
            clientId={card.clientId}
            title={t("card.title")}
            taskType={card.taskType}
            date={card.taskEndDate}
            taskDescription={card.taskDescription}
            onComplete={onComplete}
            format={card.format}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default Column;
