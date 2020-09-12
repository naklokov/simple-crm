import React from "react";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading } from "../../../../../../__data__";
import { connect } from "react-redux";

import { prepareComments } from "../../utils";

import style from "./content.module.scss";
import { Comment } from "../../../../../../components";
import { CommentEntityProps } from "../../../../../../constants";
import { List } from "antd";
import { sortBy } from "lodash";

interface ContentProps {
  loading?: boolean;
  comments: CommentEntityProps[];
  onDeleteComment: (id: string) => void;
  onEditComment: (id: string, value: string) => void;
}

export const Content = ({
  loading = false,
  comments,
  onDeleteComment,
  onEditComment,
}: ContentProps) => {
  const sortedComments = prepareComments(comments);

  return (
    <div className={style.container}>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={sortBy(comments, "creationDate")}
        renderItem={(comment) => (
          <List.Item>
            <Comment
              key={comment.id}
              comment={comment}
              onDeleteComment={onDeleteComment}
              onEditComment={onEditComment}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading }, dispatch);

export default connect(null, mapDispatchToProps)(Content);
