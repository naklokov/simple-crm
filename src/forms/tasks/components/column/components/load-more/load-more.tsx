import { Button } from "antd";
import React from "react";

import style from "./load-more.module.scss";

interface LoadMoreProps {
  onClick: () => void;
  title: string;
  visibleCount: number;
  allCount: number;
}

export const LoadMore = ({
  title,
  onClick,
  visibleCount,
  allCount,
}: LoadMoreProps) => {
  if (visibleCount >= allCount) {
    return null;
  }

  return (
    <div className={style.container}>
      <Button type="link" onClick={onClick}>
        {title}
      </Button>
    </div>
  );
};
