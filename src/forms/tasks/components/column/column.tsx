import axios from "axios";
import { Divider, List, Empty, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { Card } from "..";

import style from "./column.module.scss";
import {
  TASK_DATE_FIELD_CODE,
  TaskEntityProps,
  urls,
} from "../../../../constants";
import { defaultErrorHandler } from "../../../../utils";
import { ColumnTaskProps, INFINITY_SCROLL_STEP } from "../../constants";
import { Title } from "./title";
import { Sort } from "./sort/index";
import { SortOrderType } from "./constants";

interface ColumnProps extends ColumnTaskProps {
  onComplete: (task: TaskEntityProps) => void;
  onDelete: (task: TaskEntityProps) => void;
  onView: (task: TaskEntityProps) => void;
}

const getTasksSorted = (order: SortOrderType = "asc") =>
  `${TASK_DATE_FIELD_CODE}:${order}`;

export const Column = ({
  title,
  query,
  dateFormat,
  dividerColor = "#ffffff",
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
  const [sort, setSort] = useState<SortOrderType>();

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

  const handleSort = useCallback((order: any) => {
    setSort(order);
    setHasMore(true);
  }, []);

  return (
    <div className={style.container}>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title title={`${title} - ${count}`} />
        <Sort onSort={handleSort} />
      </Row>
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
