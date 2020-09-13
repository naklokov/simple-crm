import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { CommentEntityProps, urls, DATE_FORMATS } from "../../constants";
import { Comment as CommentUI, Typography, Skeleton } from "antd";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { defaultErrorHandler, getFullUrl, getFormattedDate } from "../../utils";
import { useTranslation } from "react-i18next";
import { Avatar } from "../avatar";
import { connect } from "react-redux";
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
  const [loading, setLoading] = useState(false);
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
      const url = getFullUrl(urls.userProfiles.entity, userProfileId);
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

  if (loading) {
    return <Skeleton active avatar paragraph={{ rows: 2 }} />;
  }

  return (
    <CommentUI
      author={<Text strong>{commentAuthor.fullName}</Text>}
      avatar={<Avatar src={commentAuthor.avatar} />}
      content={content}
      actions={actions}
      datetime={
        <Text type="secondary">
          {getFormattedDate(creationDate, DATE_FORMATS.DATE_TIME)}
        </Text>
      }
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

export default connect(mapStateToProps)(Comment);
