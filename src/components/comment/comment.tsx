import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { CommentEntityProps, urls } from "../../constants";
import { Comment as CommentUI, Typography, Input } from "antd";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { setLoading } from "../../__data__";
import { defaultErrorHandler, getFullName, fillTemplate } from "../../utils";
import { useTranslation } from "react-i18next";
import { Avatar } from "../avatar";
import { connect } from "react-redux";
import { Delete, Edit, Editor } from "./components";
import { noop, isEmpty } from "lodash";
import { getActions, getContent } from "./utils";

const { Text } = Typography;

interface CommentProps {
  comment: CommentEntityProps;
  profileInfo: ProfileInfoProps;
  onDeleteComment?: (id: string) => void;
  onEditComment?: (id: string, value: string) => void;
}

export const Comment = ({
  comment,
  profileInfo,
  onDeleteComment = noop,
  onEditComment = noop,
}: CommentProps) => {
  const [commentAuthor, setCommentAuthor] = useState({} as ProfileInfoProps);
  const [isEdit, setIsEdit] = useState(false);
  const [t] = useTranslation("comment");

  const {
    id,
    isOwner,
    commentText,
    creationDate,
    userProfileId = "",
  } = comment;

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const url = fillTemplate(urls.profile.anotherProfile, {
        id: userProfileId,
      });
      const responce = await axios.get(url);
      setCommentAuthor(responce?.data ?? {});
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("comment.profile.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEmpty(commentAuthor) && userProfileId) {
      if (userProfileId === profileInfo.id) {
        setCommentAuthor(profileInfo);
        return;
      }

      fetchProfile();
    }
  }, [userProfileId, profileInfo]);

  const handleDeleteComment = useCallback(() => {
    onDeleteComment(id);
  }, [comment]);

  const handleEditComment = useCallback(
    (value) => {
      setIsEdit(!isEdit);

      if (isEdit) {
        onEditComment(id, value);
      }
    },
    [comment, isEdit]
  );

  const content = getContent(isEdit, commentText, handleEditComment);
  const actions = getActions(
    isOwner,
    isEdit,
    handleEditComment,
    handleDeleteComment
  );

  return (
    <CommentUI
      author={<Text strong>{getFullName(commentAuthor)}</Text>}
      avatar={<Avatar src={commentAuthor.avatar} />}
      content={content}
      actions={actions}
      datetime={
        <Text type="secondary">
          {moment(creationDate).format("hh:mm DD.MM.YYYY")}
        </Text>
      }
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

export default connect(mapStateToProps)(Comment);