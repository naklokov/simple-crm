import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Footer } from "./components";
import { List } from "antd";
import { sortBy } from "lodash";
import { Comment } from "../../../../components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { connect } from "react-redux";
import {
  defaultErrorHandler,
  getFullUrl,
  getFiteredEntityArray,
  getUpdatedEntityArray,
  useFetch,
  getRsqlQuery,
} from "../../../../utils";
import { urls, CommentEntityProps } from "../../../../constants";
import { getPostData } from "./utils";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";

import style from "./comments.module.scss";

interface CommentsProps {
  profileInfo: ProfileInfoProps;
}

export const Comments = ({ profileInfo }: CommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([] as CommentEntityProps[]);
  const listRef = useRef<HTMLDivElement>(null);

  const { id: entityId } = useParams();
  const [t] = useTranslation("clientCardComments");
  // const params = getRsqlQuery({ entityType: "clients", entityId });
  const params = getRsqlQuery([
    { key: "entityType", value: "clients" },
    { key: "entityId", value: entityId },
  ]);
  console.log(params);
  const { loading: fetchLoading, response } = useFetch({
    url: urls.comments.entity,
    params,
  });

  const scrollToBottom = () => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    setLoading(fetchLoading);
  }, [fetchLoading]);

  useEffect(() => {
    if (response) {
      setComments(response?.data ?? []);
      setTimeout(scrollToBottom, 0);
    }
  }, [response]);

  const handleEditComment = useCallback(
    async (id: string, value: string) => {
      try {
        setLoading(true);
        const url = getFullUrl(urls.comments.entity, id);
        const comment: CommentEntityProps =
          comments.find((o) => o.id === id) || ({} as CommentEntityProps);
        const entity = { ...comment, commentText: value };
        await axios.put(url, entity);

        const updated = getUpdatedEntityArray(entity, comments);
        setComments(updated);
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.put.error"),
        });
      } finally {
        setLoading(false);
      }
    },
    [comments]
  );

  const handleDeleteComment = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const url = getFullUrl(urls.comments.entity, id);
        await axios.delete(url);
        const filtered = getFiteredEntityArray(id, comments);
        setComments(filtered);
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.delete.error"),
        });
      } finally {
        setLoading(false);
      }
    },
    [comments]
  );

  const handleSendComment = useCallback(
    async (text: string) => {
      try {
        const data = getPostData(text, entityId, profileInfo.id);
        const responce = await axios.post(urls.comments.entity, data);
        const entity = responce?.data ?? {};
        setComments([...comments, entity]);
        scrollToBottom();
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.add.error"),
        });
      }
    },
    [comments]
  );

  return (
    <div className={style.container}>
      <div ref={listRef} className={style.list}>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={sortBy(comments, "creationDate")}
          renderItem={(comment) => (
            <List.Item>
              <Comment
                key={comment.id}
                comment={comment}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
              />
            </List.Item>
          )}
        />
      </div>
      <Footer onSend={handleSendComment} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

export default connect(mapStateToProps)(Comments);
