import React, { useState, useCallback } from "react";
import { Comment as CommentUI, Typography, Skeleton } from "antd";
import { noop } from "lodash";
import { Avatar } from "../avatar";
import { getFullUrl, getDateWithTimezone, useFetch } from "../../utils";
import {
  CommentEntityProps,
  urls,
  DATE_FORMATS,
  ProfileInfoEntityProps,
} from "../../constants";
import { getActions, getContent } from "./utils";

const { Text } = Typography;

interface CommentProps {
  comment: CommentEntityProps;
  onDeleteComment?: (id: string) => void;
  onEditComment?: (id: string, value: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onDeleteComment = noop,
  onEditComment = noop,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    id,
    isOwner,
    commentText,
    creationDate,
    userProfileId = "",
  } = comment;
  const date = getDateWithTimezone(creationDate).format(DATE_FORMATS.DATE_TIME);
  const url = getFullUrl(urls.userProfiles.entity, userProfileId);
  const [commentAuthor, loading] = useFetch<ProfileInfoEntityProps>({
    url,
    cache: true,
  });

  const handleDeleteComment = useCallback(() => {
    if (id) {
      onDeleteComment(id);
    }
  }, [id, onDeleteComment]);

  const handleEditComment = useCallback(
    (value) => {
      setIsEdit(!isEdit);

      if (isEdit && id) {
        onEditComment(id, value);
      }
    },
    [isEdit, id, onEditComment]
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

export default Comment;
