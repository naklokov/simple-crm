import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Comment as CommentUI, Typography, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { noop, isEmpty } from "lodash";
import { Avatar } from "../avatar";
import {
  defaultErrorHandler,
  getFullUrl,
  getDateWithTimezone,
} from "../../utils";
import {
  CommentEntityProps,
  urls,
  DATE_FORMATS,
  ProfileInfoEntityProps,
  State,
} from "../../constants";
import { getActions, getContent } from "./utils";

const { Text } = Typography;

interface CommentProps {
  comment: CommentEntityProps;
  profileInfo: ProfileInfoEntityProps;
  onDeleteComment?: (id: string) => void;
  onEditComment?: (id: string, value: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  profileInfo,
  onDeleteComment = noop,
  onEditComment = noop,
}) => {
  const [loading, setLoading] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState(
    {} as ProfileInfoEntityProps
  );
  const [isEdit, setIsEdit] = useState(false);
  const [t] = useTranslation("comment");

  const {
    id,
    isOwner,
    commentText,
    creationDate,
    userProfileId = "",
  } = comment;
  const date = getDateWithTimezone(creationDate).format(DATE_FORMATS.DATE_TIME);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const url = getFullUrl(urls.userProfiles.entity, userProfileId);
      const response = await axios.get(url);
      setCommentAuthor(response?.data ?? {});
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("comment.profile.error"),
      });
    } finally {
      setLoading(false);
    }
  }, [t, userProfileId]);

  useEffect(() => {
    if (isEmpty(commentAuthor) && userProfileId) {
      if (userProfileId === profileInfo.id) {
        setCommentAuthor(profileInfo);
        return;
      }

      fetchProfile();
    }
  }, [userProfileId, profileInfo, commentAuthor, fetchProfile]);

  const handleDeleteComment = useCallback(() => {
    if (id) {
      onDeleteComment(id);
    }
  }, [comment, id, onDeleteComment]);

  const handleEditComment = useCallback(
    (value) => {
      setIsEdit(!isEdit);

      if (isEdit && id) {
        onEditComment(id, value);
      }
    },
    [comment, isEdit, id, onEditComment]
  );

  const content = getContent(isEdit, commentText, handleEditComment);
  const actions = !isEdit
    ? getActions({
        hasRightDelete: isOwner?.DELETE ?? true,
        hasRightUpdate: isOwner?.UPDATE ?? true,
        onEdit: handleEditComment,
        onDelete: handleDeleteComment,
      })
    : [];

  if (loading) {
    return <Skeleton active avatar paragraph={{ rows: 2 }} />;
  }

  return (
    <CommentUI
      style={{ width: "100%" }}
      author={<Text strong>{commentAuthor.fullName}</Text>}
      avatar={<Avatar src={commentAuthor.avatar} />}
      content={content}
      actions={actions}
      datetime={<Text type="secondary">{date}</Text>}
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(Comment);
