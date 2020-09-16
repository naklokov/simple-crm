import React from "react";
import { Delete, Edit, Editor } from "./components";

export const getActions = (
  isOwner: boolean,
  isEdit: boolean,
  onEdit: (value?: string) => void,
  onDelete: () => void
) => {
  if (!isOwner || isEdit) {
    return [];
  }

  return [<Edit onEdit={onEdit} />, <Delete onDelete={onDelete} />];
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
