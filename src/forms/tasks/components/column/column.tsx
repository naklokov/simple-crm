import { Button, Divider, Typography } from "antd";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "..";
import { TaskEntityProps } from "../../../../constants";
import { LoadMore } from "./components";

import style from "./column.module.scss";

const VISIBLE_COUNT_STEP = 5;

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
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT_STEP);

  const handleLoadMoreClick = useCallback(() => {
    setVisibleCount(visibleCount + VISIBLE_COUNT_STEP);
  }, [cards, visibleCount]);

  return (
    <div className={style.container}>
      <Typography.Title level={5} className={style.title}>
        {title}
      </Typography.Title>
      <Divider
        className={style.divider}
        style={{ backgroundColor: dividerColor }}
      />
      {cards
        .filter((card, idx) => idx < visibleCount)
        .map((card) => (
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
      <LoadMore
        title={t("button.load.more")}
        visibleCount={visibleCount}
        allCount={cards.length}
        onClick={handleLoadMoreClick}
      />
    </div>
  );
};

export default Column;
