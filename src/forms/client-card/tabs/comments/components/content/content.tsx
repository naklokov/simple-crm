import React from "react";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setLoading } from "../../../../../../__data__";
import { connect } from "react-redux";

import { prepareComments } from "../../utils";

import style from "./content.module.scss";
import { Comment } from "../../../../../../components";
import { CommentEntityProps } from "../../../../../../constants";

interface ContentProps {
  comments: CommentEntityProps[];
  onDeleteComment: (id: string) => void;
  onEditComment: (id: string, value: string) => void;
}

export const Content = ({
  comments,
  onDeleteComment,
  onEditComment,
}: ContentProps) => {
  const sortedComments = prepareComments(comments);

  return (
    <div className={style.container}>
      {sortedComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDeleteComment={onDeleteComment}
          onEditComment={onEditComment}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setLoading }, dispatch);

export default connect(null, mapDispatchToProps)(Content);
