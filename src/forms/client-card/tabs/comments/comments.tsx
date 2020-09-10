import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Footer, Content } from "./components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import {
  fillTemplate,
  defaultErrorHandler,
  getFullUrl,
  getFiteredEntityIdArray,
  getUpdatedEntityArray,
} from "../../../../utils";
import { setLoading } from "../../../../__data__";
import { urls, CommentEntityProps } from "../../../../constants";
import { getPostData } from "./utils";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";

import style from "./comments.module.scss";

interface CommentsProps {
  profileInfo: ProfileInfoProps;
  setLoading: (loading: boolean) => void;
}

export const Comments = ({ profileInfo, setLoading }: CommentsProps) => {
  const [comments, setComments] = useState([] as CommentEntityProps[]);
  const { id: clientId } = useParams();
  const [t] = useTranslation("clientCardComments");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const url = fillTemplate(urls.comments.client, { clientId });
      const responce = await axios.get(url);
      setComments(responce?.data ?? {});
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("message.get.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleEditComment = useCallback(
    async (id: string, value: string) => {
      try {
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
      }
    },
    [comments]
  );

  const handleDeleteComment = useCallback(
    async (id: string) => {
      try {
        const url = getFullUrl(urls.comments.entity, id);
        await axios.delete(url);
        const filtered = getFiteredEntityIdArray(id, comments);
        setComments(filtered);
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.delete.error"),
        });
      }
    },
    [comments]
  );

  const handleSendComment = useCallback(
    async (text: string) => {
      try {
        setLoading(true);
        const url = fillTemplate(urls.comments.entity);
        const data = getPostData(text, clientId, profileInfo.id);
        const responce = await axios.post(url, data);
        const entity = responce?.data ?? {};
        setComments([...comments, entity]);
      } catch (error) {
        defaultErrorHandler({
          error,
          defaultErrorMessage: t("message.add.error"),
        });
      } finally {
        setLoading(false);
      }
    },
    [comments]
  );

  return (
    <div className={style.container}>
      <Content
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
      />
      <Footer onSend={handleSendComment} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
