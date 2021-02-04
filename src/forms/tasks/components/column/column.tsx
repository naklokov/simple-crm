import axios from "axios";
import { Divider, Spin, Typography, List, Empty } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "..";

import style from "./column.module.scss";
import { TaskEntityProps, urls } from "../../../../constants";
import InfiniteScroll from "react-infinite-scroller";
import { defaultErrorHandler } from "../../../../utils";

const LOADING_STEP = 5;

interface ColumnProps {
  title: string;
  query: string;
  dateFormat: string;
  dividerColor?: string;
  onComplete: (task: TaskEntityProps) => void;
  onDelete: (task: TaskEntityProps) => void;
  reloadKey: string;
}

export const Column = ({
  title,
  query,
  dateFormat,
  dividerColor = "#ffffff",
  onComplete,
  onDelete,
  reloadKey = "",
}: ColumnProps) => {
  const [t] = useTranslation("tasks");
  const [tasks, setTasks] = useState<TaskEntityProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchTasks = async ({ pageSize }: any) => {
    setLoading(true);
    try {
      const response = await axios.get(urls.tasks.paging, {
        params: { query, pageSize },
      });

      setTasks(response?.data?.rows ?? []);
      setCount(response?.data?.totalCount ?? 0);
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (tasks.length >= count) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    fetchTasks({ pageSize: tasks.length + LOADING_STEP });
  }, [tasks, count]);

  useEffect(() => {
    fetchTasks({ pageSize: LOADING_STEP });
  }, [reloadKey]);

  return (
    <div className={style.container}>
      <Typography.Title level={5} className={style.title}>
        {`${title} - ${count}`}
      </Typography.Title>
      <Divider
        className={style.divider}
        style={{ backgroundColor: dividerColor }}
      />
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={!loading && hasMore}
      >
        <List
          dataSource={tasks}
          loading={loading}
          renderItem={(task) => (
            <List.Item
              style={{ borderBottom: "none", width: "100%" }}
              key={task.id}
            >
              <Card
                task={task}
                dateFormat={dateFormat}
                title={t("card.title")}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            </List.Item>
          )}
        >
          {!count && !loading && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t("list.empty")}
            />
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default Column;
