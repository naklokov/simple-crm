import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { List } from "antd";
import { orderBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Comment } from "../../../../components";
import { Footer, Order } from "./components";
import {
  defaultErrorHandler,
  getFullUrl,
  getRsqlParams,
  useFetch,
} from "../../../../utils";
import {
  CommentEntityProps,
  ProfileInfoEntityProps,
  QueryProps,
  State,
  TabPaneFormProps,
  urls,
} from "../../../../constants";
import { getPostData } from "./utils";

import style from "./comments.module.scss";
import { FormWrapper } from "../../../../wrappers";

type TDirection = "asc" | "desc";

interface CommentsProps extends TabPaneFormProps {
  profileInfo: ProfileInfoEntityProps;
}

export const Comments = ({ profileInfo, formName }: CommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TDirection>("asc");
  const listRef = useRef<HTMLDivElement>(null);
  const COMMENT_DATE_FIELD_CODE = "creationDate";

  const { id: entityId } = useParams<QueryProps>();
  const [t] = useTranslation("clientCardComments");
  const query = getRsqlParams([
    { key: "entityType", value: "clients" },
    { key: "entityId", value: entityId },
  ]);

  const [comments, fetchLoading, reload] = useFetch<CommentEntityProps[]>({
    url: urls.comments.entity,
    params: { query },
    cache: true,
    cacheMaxAge: "short",
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
    setTimeout(scrollToBottom, 0);
  }, []);

  const handleEditComment = useCallback(
    async (id: string, value: string) => {
      if (!value.trim()) return;
      try {
        setLoading(true);
        const url = getFullUrl(urls.comments.entity, id);
        const comment = comments?.find((o) => o.id === id);
        const entity = { ...comment, commentText: value };
        await axios.put(url, entity);

        reload();
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.put.error"),
        });
      } finally {
        setLoading(false);
      }
    },
    [comments, reload, t]
  );

  const handleDeleteComment = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const url = getFullUrl(urls.comments.entity, id);
        await axios.delete(url);

        reload();
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.delete.error"),
        });
      } finally {
        setLoading(false);
      }
    },
    [reload, t]
  );

  const handleSendComment = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      try {
        const data = getPostData(text, entityId, profileInfo.id);
        await axios.post(urls.comments.entity, data);

        reload();
        scrollToBottom();
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.add.error"),
        });
      }
    },
    [reload, entityId, profileInfo.id, t]
  );

  return (
    <FormWrapper name={formName}>
      <div ref={listRef} className={style.list}>
        {!!comments.length && <Order onChange={setOrder} value={order} />}
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={orderBy(comments, COMMENT_DATE_FIELD_CODE, order)}
          renderItem={(comment) => (
            <List.Item style={{ padding: 0 }}>
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
    </FormWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(Comments);
