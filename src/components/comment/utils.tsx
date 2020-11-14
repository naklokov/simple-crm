import React from "react";
import { Delete, Edit, Editor } from "./components";

interface CommentActionsProps {
  hasRightUpdate: boolean;
  hasRightDelete: boolean;
  onEdit: (value?: string) => void;
  onDelete: () => void;
}

export const getActions = ({
  hasRightUpdate,
  hasRightDelete,
  onEdit,
  onDelete,
}: CommentActionsProps) => {
  let actions = [];
  if (hasRightUpdate) {
    actions.push(<Edit onEdit={onEdit} />);
  }

  if (hasRightDelete) {
    actions.push(<Delete onDelete={onDelete} />);
  }

  return actions;
};

export const getContent = (
  isEdit: boolean,
  text: string,
  onFinishEdit: (value?: string) => void
) =>
  isEdit ? (
    <Editor initialValue={text} onFinish={onFinishEdit} />
  ) : (
    <p>{text}</p>
  );
