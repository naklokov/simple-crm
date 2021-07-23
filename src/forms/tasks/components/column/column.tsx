import axios from "axios";
import { Divider, List, Empty } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { Card } from "..";

import style from "./column.module.scss";
import { TaskEntityProps, urls } from "../../../../constants";
import { defaultErrorHandler, getTasksSorted } from "../../../../utils";
import {
  ColumnTaskProps,
  INFINITY_SCROLL_STEP,
  TaskSortType,
} from "../../constants";
import { Header } from "./header";

interface ColumnProps extends ColumnTaskProps {
  onComplete: (task: TaskEntityProps) => void;
  onDelete: (task: TaskEntityProps) => void;
  onView: (task: TaskEntityProps) => void;
}

export const Column = ({
  title,
  query,
  dateFormat,
  dividerColor = "#ffffff",
  titleType,
  onComplete,
  onDelete,
  onView,
  reloadKey = "",
}: ColumnProps) => {
  const [t] = useTranslation("tasks");
  const [tasks, setTasks] = useState<TaskEntityProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState<TaskSortType>("asc");

  const fetchTasks = async ({ pageSize }: any) => {
    setLoading(true);
    try {
      const sortBy = getTasksSorted(sort);
      const response = await axios.get(urls.tasks.paging, {
        params: { query, pageSize, sortBy },
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

    fetchTasks({ pageSize: tasks.length + INFINITY_SCROLL_STEP });
  }, [tasks, count, sort]);

  useEffect(() => {
    fetchTasks({ pageSize: INFINITY_SCROLL_STEP });
  }, [reloadKey, sort]);

  const setSortOrder = useCallback((order: TaskSortType) => {
    setSort(order);
  }, []);

  return (
    <div className={style.container}>
      <Header
        titleType={titleType}
        title={title}
        count={count}
        sort={sort}
        setSort={setSortOrder}
      />
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
                onView={onView}
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
